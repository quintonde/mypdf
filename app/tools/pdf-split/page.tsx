'use client';
import React, { useState } from 'react';

export default function PdfSplit() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [splitMode, setSplitMode] = useState('range');
  const [pageRanges, setPageRanges] = useState('');
  const [splitEvery, setSplitEvery] = useState('1');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // File validation
      if (file.type !== 'application/pdf') {
        alert('Please upload a PDF file only.');
        return;
      }
      
      if (file.size > 50 * 1024 * 1024) {
        alert('File size too large. Maximum 50MB allowed.');
        return;
      }

      setPdfFile(file);
      setDownloadUrl(null);
      
      // Get REAL page count using pdf-lib
      try {
        // Dynamically import pdf-lib
        const { PDFDocument } = await import('pdf-lib');
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const realPageCount = pdfDoc.getPageCount();
        
        setTotalPages(realPageCount);
        console.log(`📄 Real page count: ${realPageCount}`);
      } catch (error) {
        console.error('Error getting real page count:', error);
        // Fallback to file size estimate
        const estimatedPages = Math.max(1, Math.floor(file.size / 50000));
        setTotalPages(Math.min(estimatedPages, 200));
        console.log(`📄 Estimated page count: ${estimatedPages}`);
      }
    }
  };

  const handleChangeFile = () => {
    // Clear current file
    setPdfFile(null);
    setDownloadUrl(null);
    setTotalPages(null);
    
    // Trigger file input click
    const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleConvert = async () => {
    if (!pdfFile) {
      alert('Please upload a PDF file!');
      return;
    }
    
    if (splitMode === 'range' && !pageRanges.trim()) {
      alert('Please enter page ranges to split!');
      return;
    }

    if (splitMode === 'every' && (!splitEvery || parseInt(splitEvery) < 1)) {
      alert('Please enter a valid number of pages!');
      return;
    }
    
    setIsConverting(true);
    setDownloadUrl(null);

    try {
      console.log('📦 Creating FormData for split');
      
      const formData = new FormData();
      formData.append('file', pdfFile);
      formData.append('splitType', splitMode);
      
      if (splitMode === 'range') {
        formData.append('pageRange', pageRanges);
      } else if (splitMode === 'every') {
        formData.append('splitEvery', splitEvery);
      }

      console.log('🌐 Sending API request to /api/pdf-split...');

      // Real API call
      const response = await fetch('/api/pdf-split', {
        method: 'POST',
        body: formData,
      });

      console.log('✅ API Response Status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.log('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Split failed');
      }

      console.log('📥 Getting response blob...');

      let responseBlob;
      try {
        responseBlob = await response.blob();
        console.log('✅ Blob received successfully, size:', responseBlob.size);
      } catch (blobError: any) {
        console.error('💥 Blob creation failed:', blobError);
        throw new Error('Failed to create file');
      }

      // Check if it's ZIP or PDF
      const contentType = response.headers.get('content-type');
      console.log('📄 Content-Type:', contentType);

      if (contentType === 'application/zip') {
        console.log('📦 ZIP file received');
        const url = URL.createObjectURL(responseBlob);
        setDownloadUrl(url);
        console.log('🎉 ZIP file created! Download URL ready');
      } else {
        console.log('📄 Other file type received');
        const url = URL.createObjectURL(responseBlob);
        setDownloadUrl(url);
        console.log('🎉 File created! Download URL ready');
      }
      
    } catch (error: any) {
      console.error('💥 Split error:', error);
      alert('Split failed: ' + error.message);
    } finally {
      setIsConverting(false);
      console.log('🔚 Split function completed');
    }
  };

  const handleExportAs = async (toolPath: string) => {
    if (!pdfFile) {
      alert('Please upload a PDF file first!');
      return;
    }
    
    setIsConverting(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your file for processing`);
      setIsConverting(false);
    }, 1000);
  };

  const toolsList = [
    { name: 'PDF Compress', path: '/tools/pdf-compress', icon: '📦' },
    { name: 'PDF Merge', path: '/tools/pdf-merge', icon: '🔄' },
    { name: 'PDF Protect', path: '/tools/pdf-protect', icon: '🔒' },
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
    { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
  ];

  const splitModeOptions = [
    {
      mode: 'range',
      name: 'Page Ranges',
      description: 'Split by specific page ranges',
      icon: '🎯',
      example: 'e.g., 1-3, 5, 7-9'
    },
    {
      mode: 'every',
      name: 'Every N Pages',
      description: 'Split after every N pages',
      icon: '📊',
      example: 'e.g., 2 = split every 2 pages'
    },
    {
      mode: 'single',
      name: 'Single Pages',
      description: 'Extract each page as separate PDF',
      icon: '📄',
      example: `${totalPages} separate files`
    }
  ];

  const getOutputFilesCount = () => {
    if (!totalPages) return 0;
    
    switch (splitMode) {
      case 'range':
        if (!pageRanges.trim()) return 0;
        // Simple count - in real app, parse ranges properly
        return pageRanges.split(',').length;
      case 'every':
        const every = parseInt(splitEvery) || 1;
        return Math.ceil(totalPages / every);
      case 'single':
        return totalPages;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">Split PDF</h1>
          <p className="text-gray-600 mt-2">Split PDF into multiple files by pages or ranges</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Options Panel (Only show after file uploaded) */}
          {pdfFile && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                
                {/* File Info Header with Change Button */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Selected File</h3>
                    <button
                      onClick={handleChangeFile}
                      className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Change File
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">📄</span>
                      <span className="font-medium truncate">{pdfFile.name}</span>
                    </div>
                    {totalPages && (
                      <div className="text-xs">
                        Total pages: <strong>{totalPages}</strong> • Size: <strong>{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Split Mode Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Split Mode
                    </label>
                    <div className="space-y-3">
                      {splitModeOptions.map((option) => (
                        <label
                          key={option.mode}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            splitMode === option.mode
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="splitMode"
                            value={option.mode}
                            checked={splitMode === option.mode}
                            onChange={(e) => setSplitMode(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-gray-900">{option.name}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {option.example}
                                </p>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Split Configuration */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Split Configuration</h4>
                    
                    {splitMode === 'range' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Ranges
                        </label>
                        <input
                          type="text"
                          value={pageRanges}
                          onChange={(e) => setPageRanges(e.target.value)}
                          placeholder="e.g., 1-3, 5, 7-9, 12-15"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Separate ranges with commas. Example: 1-5, 8, 10-12
                        </p>
                      </div>
                    )}

                    {splitMode === 'every' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Split Every
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="number"
                            min="1"
                            max={totalPages || 100}
                            value={splitEvery}
                            onChange={(e) => setSplitEvery(e.target.value)}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                          />
                          <span className="text-sm text-gray-600">pages</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          PDF will be split after every {splitEvery} pages
                        </p>
                      </div>
                    )}

                    {splitMode === 'single' && (
                      <div className="text-center py-2">
                        <span className="text-lg">📄</span>
                        <p className="text-sm text-gray-700 mt-2">
                          Each of the {totalPages} pages will be extracted as separate PDF files
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Output Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Output Preview</h4>
                    <div className="text-sm text-green-700 space-y-2">
                      <div className="flex justify-between">
                        <span>Split Mode:</span>
                        <span className="font-semibold capitalize">
                          {splitModeOptions.find(opt => opt.mode === splitMode)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Pages:</span>
                        <span className="font-semibold">{totalPages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Output Files:</span>
                        <span className="font-semibold text-red-600">
                          {getOutputFilesCount()} files
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Split Tips */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Split Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Use <strong>Page Ranges</strong> for specific sections</li>
                      <li>• Use <strong>Every N Pages</strong> for equal splits</li>
                      <li>• Use <strong>Single Pages</strong> to extract all pages</li>
                    </ul>
                  </div>

                </div>

                {/* Sticky Split Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting || getOutputFilesCount() === 0}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isConverting || getOutputFilesCount() === 0
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isConverting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Splitting PDF...
                      </div>
                    ) : (
                      `Split into ${getOutputFilesCount()} Files`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area - Always Visible */}
          <div className={`${pdfFile ? 'lg:w-2/3' : 'w-full max-w-2xl mx-auto'}`}>
            
            {/* Upload Area - Always Center */}
            {!pdfFile && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="border-2 border-dashed border-red-300 rounded-lg p-12 bg-red-50 relative">
                  
                  {/* Main Red Upload Button */}
                  <div className="mb-4">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="pdf-upload"
                    />
                    <label
                      htmlFor="pdf-upload"
                      className="cursor-pointer inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-lg"
                    >
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Select PDF File
                    </label>
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    Split PDF by page ranges or extract specific pages
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum file size: 50MB
                  </p>
                </div>
              </div>
            )}

            {/* Preview/Status Area - Show after file uploaded */}
            {pdfFile && (
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                {downloadUrl ? (
                  <div className="text-center py-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Split Successful!</h3>
                      <p className="text-green-600 mb-2">
                        All {getOutputFilesCount()} pages extracted successfully! Download ZIP file.
                      </p>
                      
                      {/* Split Details */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600">Original Pages</div>
                            <div className="text-lg font-bold text-gray-900">{totalPages}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Output Files</div>
                            <div className="text-lg font-bold text-green-600">{getOutputFilesCount()}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download="split-pages.zip"
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download ZIP File ({getOutputFilesCount()} Pages)
                        </a>
                      </div>

                      {/* Export As Button */}
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowExportOptions(!showExportOptions)}
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                          Export As
                          <svg className={`w-4 h-4 ml-2 transition-transform ${showExportOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {showExportOptions && (
                          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                            <div className="py-2">
                              <div className="px-4 py-2 text-xs font-semibold text-gray-500 border-b">CONVERT TO</div>
                              {toolsList.map((tool) => (
                                <button
                                  key={tool.name}
                                  onClick={() => handleExportAs(tool.path)}
                                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors border-b border-gray-100 last:border-b-0"
                                >
                                  <span className="text-lg mr-3">{tool.icon}</span>
                                  {tool.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 bg-blue-50">
                      <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Splitting</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Total pages: <strong>{totalPages}</strong> • Size: <strong>{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Configure split options and click "Split into {getOutputFilesCount()} Files"</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}