'use client';
import React, { useState } from 'react';

export default function HtmlToPdf() {
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [htmlUrl, setHtmlUrl] = useState('');
  const [inputType, setInputType] = useState('file');
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [pageSize, setPageSize] = useState('a4');
  const [pageOrientation, setPageOrientation] = useState('portrait');
  const [includeBackground, setIncludeBackground] = useState(true);
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setHtmlFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHtmlUrl(e.target.value);
    setDownloadUrl(null);
  };

  const handleConvert = async () => {
    if (inputType === 'file' && !htmlFile) return alert('Please upload an HTML file!');
    if (inputType === 'url' && !htmlUrl) return alert('Please enter a website URL!');
    
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
    if ((inputType === 'file' && !htmlFile) || (inputType === 'url' && !htmlUrl)) {
      return alert('Please provide HTML content first!');
    }
    
    setIsConverting(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your content for processing`);
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
    { name: 'PDF to Excel', path: '/tools/pdf-to-excel', icon: '📊' },
    { name: 'PDF to PowerPoint', path: '/tools/pdf-to-ppt', icon: '📽️' },
    { name: 'Excel to PDF', path: '/tools/excel-to-pdf', icon: '📊' },
    { name: 'PowerPoint to PDF', path: '/tools/powerpoint-to-pdf', icon: '📽️' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
    { name: 'PDF Unlock', path: '/tools/pdf-unlock', icon: '🔓' },
    { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: '📝' },
  ];

  const formatOptions = [
    {
      format: 'pdf',
      name: 'PDF Document',
      description: 'Standard PDF format',
      compatibility: 'All devices & readers',
      icon: '📄'
    }
  ];

  const inputTypeOptions = [
    { value: 'file', label: 'HTML File', description: 'Upload HTML file' },
    { value: 'url', label: 'Website URL', description: 'Convert webpage to PDF' }
  ];

  const pageSizeOptions = [
    { value: 'a4', label: 'A4', description: 'Standard paper size' },
    { value: 'letter', label: 'Letter', description: 'US letter size' },
    { value: 'a3', label: 'A3', description: 'Larger format' },
    { value: 'legal', label: 'Legal', description: 'Legal document size' }
  ];

  const orientationOptions = [
    { value: 'portrait', label: 'Portrait', description: 'Vertical layout' },
    { value: 'landscape', label: 'Landscape', description: 'Horizontal layout' }
  ];

  const backgroundOptions = [
    { value: true, label: 'Include Background', description: 'Keep colors and images' },
    { value: false, label: 'Remove Background', description: 'Clean white background' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no content uploaded */}
      {!htmlFile && !htmlUrl && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">HTML to PDF</h1>
          <p className="text-gray-600 mt-2">Convert HTML files or webpages to PDF documents</p>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side - Options Panel (Only show after content provided) */}
          {(htmlFile || htmlUrl) && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg p-6">
                
                {/* File/URL Info Header */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {inputType === 'file' ? 'Selected File' : 'Website URL'}
                  </h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {inputType === 'file' ? `📄 ${htmlFile?.name}` : `🌐 ${htmlUrl}`}
                  </p>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Output Format Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Output Format
                    </label>
                    <div className="space-y-3">
                      {formatOptions.map((option) => (
                        <label
                          key={option.format}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            outputFormat === option.format
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="outputFormat"
                            value={option.format}
                            checked={outputFormat === option.format}
                            onChange={(e) => setOutputFormat(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-gray-900">{option.name}</span>
                                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                    .{option.format}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Compatible with: {option.compatibility}
                                </p>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Page Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Size
                    </label>
                    <div className="space-y-2">
                      {pageSizeOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="pageSize"
                            value={option.value}
                            checked={pageSize === option.value}
                            onChange={(e) => setPageSize(e.target.value)}
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

                  {/* Page Orientation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Orientation
                    </label>
                    <div className="space-y-2">
                      {orientationOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="pageOrientation"
                            value={option.value}
                            checked={pageOrientation === option.value}
                            onChange={(e) => setPageOrientation(e.target.value)}
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

                  {/* Background Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background
                    </label>
                    <div className="space-y-2">
                      {backgroundOptions.map((option) => (
                        <label key={option.value.toString()} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="includeBackground"
                            value={option.value.toString()}
                            checked={includeBackground === option.value}
                            onChange={(e) => setIncludeBackground(e.target.value === 'true')}
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

                  {/* Conversion Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Conversion Preview</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Output Format:</span>
                        <span className="font-semibold">{outputFormat.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Page Size:</span>
                        <span className="font-semibold uppercase">{pageSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orientation:</span>
                        <span className="font-semibold capitalize">{pageOrientation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Background:</span>
                        <span className="font-semibold">{includeBackground ? 'Included' : 'Removed'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Tips */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">💡 Conversion Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Use <strong>Landscape</strong> for wide webpages</li>
                      <li>• <strong>Include Background</strong> for original appearance</li>
                      <li>• Use <strong>A4</strong> for standard document size</li>
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
                        Converting to {outputFormat.toUpperCase()}...
                      </div>
                    ) : (
                      `Convert to ${outputFormat.toUpperCase()}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area - Always Visible */}
          <div className={`${(htmlFile || htmlUrl) ? 'lg:w-2/3' : 'w-full max-w-2xl mx-auto'}`}>
            
            {/* Upload Area - Always Center */}
            {!htmlFile && !htmlUrl && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="border-2 border-dashed border-red-300 rounded-lg p-12 bg-red-50 relative">
                  
                  {/* Input Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Input Type
                    </label>
                    <div className="flex space-x-4 justify-center">
                      {inputTypeOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                            inputType === option.value
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="inputType"
                            value={option.value}
                            checked={inputType === option.value}
                            onChange={(e) => setInputType(e.target.value)}
                            className="text-red-500 focus:ring-red-500"
                          />
                          <div className="ml-3">
                            <span className="font-medium text-gray-900">{option.label}</span>
                            <p className="text-xs text-gray-500">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* File Upload Section */}
                  {inputType === 'file' && (
                    <div className="mb-4">
                      <input
                        type="file"
                        accept=".html,.htm"
                        onChange={handleFileChange}
                        className="hidden"
                        id="html-upload"
                      />
                      <label
                        htmlFor="html-upload"
                        className="cursor-pointer inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg text-lg"
                      >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Select HTML File
                      </label>
                    </div>
                  )}

                  {/* URL Input Section */}
                  {inputType === 'url' && (
                    <div className="mb-4">
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={htmlUrl}
                        onChange={handleUrlChange}
                        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <p className="text-sm text-gray-500 mt-2">Enter website URL to convert</p>
                    </div>
                  )}

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
                    Convert HTML files or webpages to PDF documents
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {inputType === 'file' ? 'Supports: HTML, HTM • Maximum file size: 50MB' : 'Supports: All public websites'}
                  </p>
                </div>
              </div>
            )}

            {/* Preview/Status Area - Show after content provided */}
            {(htmlFile || htmlUrl) && (
              <div className="bg-white rounded-xl shadow-lg p-6 h-full">
                {downloadUrl ? (
                  <div className="text-center py-8">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                      <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Conversion Successful!</h3>
                      <p className="text-green-600 mb-2">
                        HTML converted to {outputFormat.toUpperCase()} document
                      </p>
                      
                      {/* Conversion Details */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600">Input Type</div>
                            <div className="text-lg font-bold text-gray-900 capitalize">{inputType}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Output Format</div>
                            <div className="text-lg font-bold text-green-600">{outputFormat.toUpperCase()}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download={`converted.${outputFormat}`}
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">Content Ready for Conversion</h3>
                      <p className="text-blue-600 mb-4">
                        {inputType === 'file' ? htmlFile?.name : htmlUrl}
                      </p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Output: <strong>{outputFormat.toUpperCase()} document</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Configure conversion options and click "Convert to {outputFormat.toUpperCase()}"</p>
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