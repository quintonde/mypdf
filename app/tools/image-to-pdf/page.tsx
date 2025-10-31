'use client';
import React, { useState } from 'react';

export default function ImageToPdf() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [pageSize, setPageSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [margin, setMargin] = useState('normal');
  const [imageQuality, setImageQuality] = useState('high');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...newFiles]);
      setDownloadUrl(null);
    }
  };

  const removeFile = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === imageFiles.length - 1)
    ) {
      return;
    }

    const newFiles = [...imageFiles];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setImageFiles(newFiles);
  };

  const handleConvert = async () => {
    if (imageFiles.length === 0) return alert('Please upload at least one image!');
    
    setIsConverting(true);
    setDownloadUrl(null);

    try {
      // Simulate conversion process
      setTimeout(() => {
        const dummyUrl = URL.createObjectURL(new Blob(['Converted PDF File'], { type: 'application/pdf' }));
        setDownloadUrl(dummyUrl);
        setIsConverting(false);
      }, 3000);
    } catch (error: any) {
      alert('Conversion failed: ' + error.message);
      setIsConverting(false);
    }
  };

  const handleExportAs = async (toolPath: string) => {
    if (imageFiles.length === 0) return alert('Please upload images first!');
    
    setIsConverting(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your files for processing`);
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
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
  ];

  const pageSizeOptions = [
    { value: 'a4', name: 'A4', description: 'Standard paper size', dimensions: '210 × 297 mm' },
    { value: 'letter', name: 'Letter', description: 'US letter size', dimensions: '216 × 279 mm' },
    { value: 'a3', name: 'A3', description: 'Large format', dimensions: '297 × 420 mm' },
    { value: 'auto', name: 'Auto Fit', description: 'Fit to image size', dimensions: 'Variable' }
  ];

  const marginOptions = [
    { value: 'none', label: 'No Margin', description: 'Images fill entire page' },
    { value: 'small', label: 'Small Margin', description: 'Minimal white space' },
    { value: 'normal', label: 'Normal Margin', description: 'Standard spacing' },
    { value: 'large', label: 'Large Margin', description: 'Generous white space' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'Smaller File', description: 'Faster processing' },
    { value: 'medium', label: 'Balanced', description: 'Good quality & size' },
    { value: 'high', label: 'Best Quality', description: 'Larger file size' }
  ];

  const getTotalSize = () => {
    return imageFiles.reduce((total, file) => total + file.size, 0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no files uploaded */}
      {imageFiles.length === 0 && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">Image to PDF</h1>
          <p className="text-gray-600 mt-2">Convert images to PDF documents</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Options Panel (Only show after files uploaded) */}
          {imageFiles.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                
                {/* Files Info Header */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Selected Images ({imageFiles.length})
                  </h3>
                  <div className="text-sm text-gray-600">
                    Total size: <strong>{formatFileSize(getTotalSize())}</strong>
                  </div>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Page Size Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Page Size
                    </label>
                    <div className="space-y-3">
                      {pageSizeOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            pageSize === option.value
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="pageSize"
                            value={option.value}
                            checked={pageSize === option.value}
                            onChange={(e) => setPageSize(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-900">{option.name}</span>
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                {option.dimensions}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Orientation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orientation
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrientation('portrait')}
                        className={`p-3 border rounded-lg transition-all flex items-center justify-center ${
                          orientation === 'portrait' 
                            ? 'bg-red-500 text-white border-red-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                        }`}
                      >
                        <span className="text-lg mr-2">📏</span>
                        Portrait
                      </button>
                      <button
                        onClick={() => setOrientation('landscape')}
                        className={`p-3 border rounded-lg transition-all flex items-center justify-center ${
                          orientation === 'landscape' 
                            ? 'bg-red-500 text-white border-red-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                        }`}
                      >
                        <span className="text-lg mr-2">🖼️</span>
                        Landscape
                      </button>
                    </div>
                  </div>

                  {/* Margin Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Margin
                    </label>
                    <div className="space-y-2">
                      {marginOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="margin"
                            value={option.value}
                            checked={margin === option.value}
                            onChange={(e) => setMargin(e.target.value)}
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

                  {/* Image Quality */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image Quality
                    </label>
                    <div className="space-y-2">
                      {qualityOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="imageQuality"
                            value={option.value}
                            checked={imageQuality === option.value}
                            onChange={(e) => setImageQuality(e.target.value)}
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

                  {/* Output Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Output Preview</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-semibold">{imageFiles.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Page Size:</span>
                        <span className="font-semibold">{pageSizeOptions.find(opt => opt.value === pageSize)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orientation:</span>
                        <span className="font-semibold capitalize">{orientation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quality:</span>
                        <span className="font-semibold capitalize">{imageQuality}</span>
                      </div>
                    </div>
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
                        Creating PDF...
                      </div>
                    ) : (
                      `Create PDF with ${imageFiles.length} Images`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area - Always Visible */}
          <div className={`${imageFiles.length > 0 ? 'lg:w-2/3' : 'w-full max-w-2xl mx-auto'}`}>
            
            {/* Upload Area - Always Center */}
            {imageFiles.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="border-2 border-dashed border-red-300 rounded-lg p-12 bg-red-50 relative">
                  
                  {/* Main Red Upload Button */}
                  <div className="mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-lg"
                    >
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Select Images
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
                    Select multiple images to convert to PDF
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported formats: JPG, PNG, WebP, GIF • Maximum 50 files
                  </p>
                </div>
              </div>
            )}

            {/* Preview/Status Area - Show after files uploaded */}
            {imageFiles.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                {downloadUrl ? (
                  <div className="text-center py-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Conversion Successful!</h3>
                      <p className="text-green-600 mb-2">
                        {imageFiles.length} images converted to PDF
                      </p>
                      
                      {/* Conversion Details */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600">Images</div>
                            <div className="text-lg font-bold text-gray-900">{imageFiles.length}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Page Size</div>
                            <div className="text-lg font-bold text-green-600">
                              {pageSizeOptions.find(opt => opt.value === pageSize)?.name}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download="converted.pdf"
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download PDF
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
                        Ready to Convert {imageFiles.length} Images
                      </h3>
                      <p className="text-blue-600 mb-4">
                        Configure PDF settings and create your document
                      </p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Total size: <strong>{formatFileSize(getTotalSize())}</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Click "Create PDF with {imageFiles.length} Images" to convert</p>
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