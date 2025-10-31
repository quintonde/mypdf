'use client';
import React, { useState } from 'react';

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFormat, setImageFormat] = useState('jpg');
  const [quality, setQuality] = useState('high');
  const [pagesToConvert, setPagesToConvert] = useState('all');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [customRange, setCustomRange] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) return alert('Please upload a PDF file!');
    
    setIsConverting(true);
    setDownloadUrl(null);

    try {
      // Simulate conversion process
      setTimeout(() => {
        const dummyUrl = URL.createObjectURL(new Blob(['Converted Images'], { type: 'application/zip' }));
        setDownloadUrl(dummyUrl);
        setIsConverting(false);
      }, 3000);
    } catch (error: any) {
      alert('Conversion failed: ' + error.message);
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
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
  ];

  const formatOptions = [
    {
      format: 'jpg',
      name: 'JPG',
      description: 'Best for photos and complex images',
      quality: 'Good compression',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      format: 'png',
      name: 'PNG',
      description: 'Best for graphics and transparency',
      quality: 'Lossless quality',
      color: 'from-blue-500 to-blue-600'
    },
    {
      format: 'webp',
      name: 'WebP',
      description: 'Modern format, smaller file size',
      quality: 'Excellent compression',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Low (Smaller files)', description: 'Fastest processing' },
    { value: 'medium', label: 'Medium (Balanced)', description: 'Good quality & size' },
    { value: 'high', label: 'High (Best quality)', description: 'Larger files' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">PDF to Image</h1>
          <p className="text-gray-600 mt-2">Convert PDF pages to high-quality images</p>
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
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    📄 {pdfFile.name}
                  </p>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Image Format Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Image Format
                    </label>
                    <div className="space-y-3">
                      {formatOptions.map((option) => (
                        <label
                          key={option.format}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            imageFormat === option.format
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="imageFormat"
                            value={option.format}
                            checked={imageFormat === option.format}
                            onChange={(e) => setImageFormat(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-900">{option.name}</span>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r ${option.color}`}>
                                .{option.format}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {option.quality}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quality Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Image Quality
                    </label>
                    <div className="space-y-2">
                      {qualityOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="quality"
                            value={option.value}
                            checked={quality === option.value}
                            onChange={(e) => setQuality(e.target.value)}
                            className="text-red-500 focus:ring-red-500"
                          />
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-900">{option.label}</span>
                            <p className="text-xs text-gray-500">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pages to Convert */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pages to Convert
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pagesToConvert"
                          value="all"
                          checked={pagesToConvert === 'all'}
                          onChange={(e) => setPagesToConvert(e.target.value)}
                          className="text-red-500 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">All pages</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pagesToConvert"
                          value="first"
                          checked={pagesToConvert === 'first'}
                          onChange={(e) => setPagesToConvert(e.target.value)}
                          className="text-red-500 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">First page only</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pagesToConvert"
                          value="custom"
                          checked={pagesToConvert === 'custom'}
                          onChange={(e) => setPagesToConvert(e.target.value)}
                          className="text-red-500 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Custom range</span>
                      </label>
                      {pagesToConvert === 'custom' && (
                        <input
                          type="text"
                          value={customRange}
                          onChange={(e) => setCustomRange(e.target.value)}
                          placeholder="e.g., 1-5, 7, 9-12"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                      )}
                    </div>
                  </div>

                  {/* Output Preview */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Output Preview</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span className="font-semibold">{imageFormat.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality:</span>
                        <span className="font-semibold capitalize">{quality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-semibold">
                          {pagesToConvert === 'all' ? 'All pages' : 
                           pagesToConvert === 'first' ? 'First page' : 
                           'Custom range'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Format Tips */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Format Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• <strong>JPG</strong> - Best for photos, documents</li>
                      <li>• <strong>PNG</strong> - Best for graphics, screenshots</li>
                      <li>• <strong>WebP</strong> - Best for web use</li>
                    </ul>
                  </div>

                </div>

                {/* Sticky Convert Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isConverting
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
                        Converting to {imageFormat.toUpperCase()}...
                      </div>
                    ) : (
                      `Convert to ${imageFormat.toUpperCase()}`
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
                    Convert PDF pages to JPG, PNG, or WebP images
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
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Conversion Successful!</h3>
                      <p className="text-green-600 mb-2">
                        PDF converted to {imageFormat.toUpperCase()} images
                      </p>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download={`converted.${pagesToConvert === 'first' ? imageFormat : 'zip'}`}
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {pagesToConvert === 'first' ? 'Download Image' : 'Download ZIP'}
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Conversion</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Output: <strong>{imageFormat.toUpperCase()} images</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Select conversion options and click "Convert to {imageFormat.toUpperCase()}"</p>
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