'use client';
import React, { useState } from 'react';

export default function PdfWatermark() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [fontSize, setFontSize] = useState('48');
  const [opacity, setOpacity] = useState('50');
  const [position, setPosition] = useState('center');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [watermarkType, setWatermarkType] = useState('text');
  const [pageRange, setPageRange] = useState('all');
  const [customRange, setCustomRange] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) return alert('Please upload a PDF file!');
    if (!watermarkText.trim()) return alert('Please enter watermark text!');
    
    setIsConverting(true);
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append('file', pdfFile);
      
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const uploadResult = await uploadResponse.json();
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }

      const watermarkResponse = await fetch('/api/pdf-watermark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: uploadResult.fileName,
          watermarkText: watermarkText,
          fontSize: fontSize,
          opacity: opacity,
          position: position,
          watermarkType: watermarkType,
          pageRange: pageRange,
          customRange: customRange
        }),
      });

      const watermarkResult = await watermarkResponse.json();

      if (watermarkResult.success) {
        setDownloadUrl(watermarkResult.downloadUrl);
      } else {
        throw new Error(watermarkResult.error);
      }
    } catch (error: any) {
      alert('Watermark failed: ' + error.message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleExportAs = async (toolPath: string) => {
    if (!pdfFile) return alert('Please upload a PDF file first!');
    
    // Simulate processing for other tools
    setIsConverting(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your file for processing`);
      setIsConverting(false);
      // In real implementation, redirect to the tool with file data
      // window.location.href = toolPath + '?file=' + encodeURIComponent(pdfFile.name);
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
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
  ];

  const opacityOptions = [
    { value: '25', label: '25% - Light' },
    { value: '50', label: '50% - Medium' },
    { value: '75', label: '75% - Dark' },
    { value: '100', label: '100% - Solid' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">PDF Watermark</h1>
          <p className="text-gray-600 mt-2">Add text watermarks to your PDF files</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Options Panel (Only show after file upload) */}
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
                  
                  {/* Watermark Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Watermark Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setWatermarkType('text')}
                        className={`p-3 border rounded-lg transition-all flex items-center justify-center ${
                          watermarkType === 'text' 
                            ? 'bg-red-500 text-white border-red-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                        }`}
                      >
                        <span className="text-lg mr-2">📝</span>
                        Text
                      </button>
                      <button
                        onClick={() => setWatermarkType('image')}
                        className={`p-3 border rounded-lg transition-all flex items-center justify-center ${
                          watermarkType === 'image' 
                            ? 'bg-red-500 text-white border-red-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                        }`}
                      >
                        <span className="text-lg mr-2">🖼️</span>
                        Image
                      </button>
                    </div>
                  </div>

                  {/* Watermark Text/Image Input */}
                  {watermarkType === 'text' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Watermark Text
                      </label>
                      <input
                        type="text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Watermark Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer block"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-2xl mb-2">🖼️</span>
                            <span className="text-sm text-gray-600">Click to upload image</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size: {fontSize}px
                    </label>
                    <input
                      type="range"
                      min="24"
                      max="72"
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>

                  {/* Opacity Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transparency
                    </label>
                    <div className="space-y-2">
                      {opacityOptions.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            name="opacity"
                            value={option.value}
                            checked={opacity === option.value}
                            onChange={(e) => setOpacity(e.target.value)}
                            className="text-red-500 focus:ring-red-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'].map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setPosition(pos)}
                          className={`p-2 text-xs border rounded-lg transition-all ${
                            position === pos 
                              ? 'bg-red-500 text-white border-red-500' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                          }`}
                        >
                          {pos.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Page Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pages to Watermark
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pageRange"
                          value="all"
                          checked={pageRange === 'all'}
                          onChange={(e) => setPageRange(e.target.value)}
                          className="text-red-500 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">All pages</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="pageRange"
                          value="custom"
                          checked={pageRange === 'custom'}
                          onChange={(e) => setPageRange(e.target.value)}
                          className="text-red-500 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Custom range</span>
                      </label>
                      {pageRange === 'custom' && (
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
                </div>

                {/* Sticky Convert Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleConvert}
                    disabled={isConverting || !watermarkText.trim()}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isConverting || !watermarkText.trim()
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
                        Adding Watermark...
                      </div>
                    ) : (
                      'Add Watermark to PDF'
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
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Maximum file size: 50MB
                  </p>
                </div>
              </div>
            )}

            {/* Preview/Status Area - Show after file upload */}
            {pdfFile && (
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                {downloadUrl ? (
                  <div className="text-center py-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Success!</h3>
                      <p className="text-green-600 mb-2">Your PDF has been watermarked with:</p>
                      <p className="text-green-700 font-semibold mb-6">"{watermarkText}"</p>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download="watermarked.pdf"
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Watermarked PDF
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Watermarking</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <p className="text-gray-600">Use the settings panel to customize your watermark</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}