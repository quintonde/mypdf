'use client';
import React, { useState } from 'react';

export default function PdfMerge() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setPdfFiles(prev => [...prev, ...newFiles]);
      setDownloadUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === pdfFiles.length - 1)
    ) {
      return;
    }

    const newFiles = [...pdfFiles];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setPdfFiles(newFiles);
  };

  const handleConvert = async () => {
  console.log('🚀 1. Function started');
  
  if (pdfFiles.length < 2) {
    alert('Please upload at least 2 PDF files to merge!');
    return;
  }
  
  setIsConverting(true);
  setDownloadUrl(null);

  try {
    console.log('📦 2. Creating FormData');
    
    const formData = new FormData();
    pdfFiles.forEach((file, index) => {
      formData.append('files', file);
      console.log(`📄 Added file: ${file.name}`);
    });

    console.log('🌐 3. Sending API request to /api/pdf-merge...');

    // Real API call
    const response = await fetch('/api/pdf-merge', {
      method: 'POST',
      body: formData,
    });

    console.log('✅ 4. API Response Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('❌ API Error:', errorData);
      throw new Error(errorData.error || 'Merge failed');
    }

    console.log('📥 5. Getting PDF blob...');
    const pdfBlob = await response.blob();
    const url = URL.createObjectURL(pdfBlob);
    
    setDownloadUrl(url);
    console.log('🎉 6. Merge successful! Download URL created');
    
  } catch (error: any) {
    console.error('💥 7. Merge error:', error);
    alert('Merge failed: ' + error.message);
  } finally {
    setIsConverting(false);
    console.log('🔚 8. Function completed');
  }
};

  const handleExportAs = async (toolPath: string) => {
    if (pdfFiles.length === 0) return alert('Please upload PDF files first!');
    
    setIsConverting(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your files for processing`);
      setIsConverting(false);
    }, 1000);
  };

  const toolsList = [
    { name: 'PDF Compress', path: '/tools/pdf-compress', icon: '📦' },
    { name: 'PDF Split', path: '/tools/pdf-split', icon: '✂️' },
    { name: 'PDF Protect', path: '/tools/pdf-protect', icon: '🔒' },
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
    { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no files uploaded */}
      {pdfFiles.length === 0 && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">Merge PDF</h1>
          <p className="text-gray-600 mt-2">Combine multiple PDF files into one document</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Options Panel (Only show after files uploaded) */}
          {pdfFiles.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                
                {/* Files Info Header */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Selected Files ({pdfFiles.length})
                  </h3>
                  <p className="text-sm text-gray-600">
                    Drag to reorder files for merging sequence
                  </p>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Merge Order Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Merge Order</h4>
                    <p className="text-sm text-blue-700">
                      Files will be merged in the order shown below. Use arrow buttons to rearrange.
                    </p>
                  </div>

                  {/* File List with Controls */}
                  <div className="space-y-3">
                    {pdfFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <span className="text-lg">📄</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {/* Move Up Button */}
                          <button
                            onClick={() => moveFile(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              index === 0 
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>

                          {/* Move Down Button */}
                          <button
                            onClick={() => moveFile(index, 'down')}
                            disabled={index === pdfFiles.length - 1}
                            className={`p-1 rounded ${
                              index === pdfFiles.length - 1
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 rounded text-gray-600 hover:text-red-600 hover:bg-red-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Files */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="add-more-files"
                    />
                    <label
                      htmlFor="add-more-files"
                      className="cursor-pointer block"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm text-gray-600">Add More PDF Files</span>
                      </div>
                    </label>
                  </div>

                </div>

                {/* Sticky Merge Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting || pdfFiles.length < 2}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isConverting || pdfFiles.length < 2
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
                        Merging PDF Files...
                      </div>
                    ) : (
                      `Merge ${pdfFiles.length} PDF Files`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area - Always Visible */}
          <div className={`${pdfFiles.length > 0 ? 'lg:w-2/3' : 'w-full max-w-2xl mx-auto'}`}>
            
            {/* Upload Area - Always Center */}
            {pdfFiles.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="border-2 border-dashed border-red-300 rounded-lg p-12 bg-red-50 relative">
                  
                  {/* Main Red Upload Button */}
                  <div className="mb-4">
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
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
                      Select PDF Files
                    </label>
                  </div>

                  {/* Cloud Options Dropdown */}
                  <div className="relative inline-block">
                    <button
                      onClick={() => setShowCloudOptions(!showCloudOptions)}
                      className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
                    >
                      <span>More options</span>
                      <svg className={`w-4 h-4 ml-1 transition-transform ${showCloudOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {showCloudOptions && (
                      <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-2">
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <span className="w-5 mr-3 text-blue-500">📦</span>
                            Dropbox
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <span className="w-5 mr-3 text-green-500">🚀</span>
                            Google Drive
                          </button>
                          <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <span className="w-5 mr-3 text-purple-500">☁️</span>
                            OneDrive
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-4">
                    Select multiple PDF files to merge
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum 20 files • 100MB per file
                  </p>
                </div>
              </div>
            )}

            {/* Preview/Status Area - Show after files uploaded */}
            {pdfFiles.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                {downloadUrl ? (
                  <div className="text-center py-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Merge Successful!</h3>
                      <p className="text-green-600 mb-2">
                        {pdfFiles.length} PDF files merged into one document
                      </p>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download="merged.pdf"
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Merged PDF
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        Ready to Merge {pdfFiles.length} PDF Files
                      </h3>
                      <p className="text-blue-600 mb-4">
                        Arrange files in desired order using the controls
                      </p>
                      <p className="text-gray-600">
                        Click "Merge PDF Files" to combine your documents
                      </p>
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