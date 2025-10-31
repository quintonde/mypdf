'use client';
import React, { useState } from 'react';

export default function PdfRotate() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [rotationType, setRotationType] = useState('all');
  const [rotationAngle, setRotationAngle] = useState('90');
  const [pageRange, setPageRange] = useState('all');
  const [customRange, setCustomRange] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPdfFile(file);
      setDownloadUrl(null);
      // Simulate getting total pages
      setTotalPages(Math.floor(Math.random() * 50) + 10); // Random 10-60 pages for demo
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) return alert('Please upload a PDF file!');
    
    if (rotationType === 'range' && !customRange.trim()) {
      return alert('Please enter page range to rotate!');
    }
    
    setIsConverting(true);
    setDownloadUrl(null);

    try {
      // Simulate rotation process
      setTimeout(() => {
        const dummyUrl = URL.createObjectURL(new Blob(['Rotated PDF File'], { type: 'application/pdf' }));
        setDownloadUrl(dummyUrl);
        setIsConverting(false);
      }, 3000);
    } catch (error: any) {
      alert('Rotation failed: ' + error.message);
      setIsConverting(false);
    }
  };

  const handleExportAs = async (toolPath: string) => {
    if (!pdfFile) return alert('Please upload a PDF file first!');
    
    setIsConverting(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your file for processing`);
      setIsConverting(false);
    }, 1000);
  };

  const toolsList = [
    { name: 'PDF Compress', path: '/tools/pdf-compress', icon: '📦' },
    { name: 'PDF Merge', path: '/tools/pdf-merge', icon: '🔄' },
    { name: 'PDF Split', path: '/tools/pdf-split', icon: '✂️' },
    { name: 'PDF Protect', path: '/tools/pdf-protect', icon: '🔒' },
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
    { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
  ];

  const rotationOptions = [
    {
      angle: '90',
      name: '90° Clockwise',
      description: 'Rotate right by 90 degrees',
      icon: '↪️'
    },
    {
      angle: '-90',
      name: '90° Counterclockwise',
      description: 'Rotate left by 90 degrees',
      icon: '↩️'
    },
    {
      angle: '180',
      name: '180° Flip',
      description: 'Upside down rotation',
      icon: '🔄'
    }
  ];

  const rotationTypeOptions = [
    {
      type: 'all',
      name: 'All Pages',
      description: 'Rotate all pages in the document',
      icon: '📄'
    },
    {
      type: 'range',
      name: 'Page Range',
      description: 'Rotate specific pages only',
      icon: '🎯'
    },
    {
      type: 'odd',
      name: 'Odd Pages',
      description: 'Rotate only odd-numbered pages',
      icon: '1️⃣'
    },
    {
      type: 'even',
      name: 'Even Pages',
      description: 'Rotate only even-numbered pages',
      icon: '2️⃣'
    }
  ];

  const getAffectedPages = () => {
    if (!totalPages) return 0;
    
    switch (rotationType) {
      case 'all':
        return totalPages;
      case 'range':
        if (!customRange.trim()) return 0;
        // Simple count - in real app, parse range properly
        return customRange.split(',').length;
      case 'odd':
        return Math.ceil(totalPages / 2);
      case 'even':
        return Math.floor(totalPages / 2);
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">Rotate PDF</h1>
          <p className="text-gray-600 mt-2">Rotate PDF pages clockwise or counterclockwise</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Options Panel (Only show after file uploaded) */}
          {pdfFile && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                
                {/* File Info Header */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected File</h3>
                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">📄</span>
                      <span className="font-medium truncate">{pdfFile.name}</span>
                    </div>
                    {totalPages && (
                      <div className="text-xs">
                        Total pages: <strong>{totalPages}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Rotation Angle Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Rotation Angle
                    </label>
                    <div className="space-y-3">
                      {rotationOptions.map((option) => (
                        <label
                          key={option.angle}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            rotationAngle === option.angle
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="rotationAngle"
                            value={option.angle}
                            checked={rotationAngle === option.angle}
                            onChange={(e) => setRotationAngle(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div className="flex-1">
                                <span className="font-medium text-gray-900">{option.name}</span>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pages to Rotate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Pages to Rotate
                    </label>
                    <div className="space-y-3">
                      {rotationTypeOptions.map((option) => (
                        <label
                          key={option.type}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            rotationType === option.type
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="rotationType"
                            value={option.type}
                            checked={rotationType === option.type}
                            onChange={(e) => setRotationType(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div className="flex-1">
                                <span className="font-medium text-gray-900">{option.name}</span>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Custom Range Input */}
                  {rotationType === 'range' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Page Range</h4>
                      <input
                        type="text"
                        value={customRange}
                        onChange={(e) => setCustomRange(e.target.value)}
                        placeholder="e.g., 1-5, 7, 9-12"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Separate ranges with commas. Example: 1-5, 8, 10-12
                      </p>
                    </div>
                  )}

                  {/* Rotation Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Rotation Preview</h4>
                    <div className="text-sm text-green-700 space-y-2">
                      <div className="flex justify-between">
                        <span>Rotation:</span>
                        <span className="font-semibold">
                          {rotationOptions.find(opt => opt.angle === rotationAngle)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-semibold">
                          {rotationTypeOptions.find(opt => opt.type === rotationType)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Affected Pages:</span>
                        <span className="font-semibold text-red-600">
                          {getAffectedPages()} pages
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rotation Tips */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Rotation Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Use <strong>90°</strong> for landscape photos</li>
                      <li>• Use <strong>180°</strong> for upside-down pages</li>
                      <li>• Use <strong>Page Range</strong> for specific pages</li>
                    </ul>
                  </div>

                </div>

                {/* Sticky Rotate Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting || getAffectedPages() === 0}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isConverting || getAffectedPages() === 0
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
                        Rotating PDF...
                      </div>
                    ) : (
                      `Rotate ${getAffectedPages()} Pages`
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
                    Rotate PDF pages clockwise or counterclockwise
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
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Rotation Successful!</h3>
                      <p className="text-green-600 mb-2">
                        {getAffectedPages()} pages rotated successfully
                      </p>
                      
                      {/* Rotation Details */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600">Rotation</div>
                            <div className="text-lg font-bold text-gray-900">
                              {rotationOptions.find(opt => opt.angle === rotationAngle)?.name}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Pages Rotated</div>
                            <div className="text-lg font-bold text-green-600">{getAffectedPages()}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download="rotated.pdf"
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Rotated PDF
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Rotation</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Total pages: <strong>{totalPages}</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Configure rotation settings and click "Rotate {getAffectedPages()} Pages"</p>
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