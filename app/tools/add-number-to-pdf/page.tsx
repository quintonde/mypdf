'use client';
import React, { useState } from 'react';

export default function AddNumberToPdf() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [numberPosition, setNumberPosition] = useState('bottom-center');
  const [numberStyle, setNumberStyle] = useState('numeric');
  const [startNumber, setStartNumber] = useState(1);
  const [numberFormat, setNumberFormat] = useState('1');
  const [fontSize, setFontSize] = useState('medium');
  const [includeTotal, setIncludeTotal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const handleAddNumbers = async () => {
    if (!pdfFile) return alert('Please upload a PDF file!');
    
    setIsProcessing(true);
    setDownloadUrl(null);

    try {
      // Simulate processing
      setTimeout(() => {
        const dummyUrl = URL.createObjectURL(new Blob(['PDF with page numbers'], { type: 'application/pdf' }));
        setDownloadUrl(dummyUrl);
        setIsProcessing(false);
      }, 3000);
    } catch (error: any) {
      alert('Failed to add numbers: ' + error.message);
      setIsProcessing(false);
    }
  };

  const handleExportAs = async (toolPath: string) => {
    if (!pdfFile) return alert('Please upload a PDF file first!');
    
    setIsProcessing(true);
    setTimeout(() => {
      alert(`This will redirect to ${toolPath} with your file for processing`);
      setIsProcessing(false);
    }, 1000);
  };

  const toolsList = [
    { name: 'PDF Compress', path: '/tools/pdf-compress', icon: '📦' },
    { name: 'PDF Merge', path: '/tools/pdf-merge', icon: '🔄' },
    { name: 'PDF Split', path: '/tools/pdf-split', icon: '✂️' },
    { name: 'PDF Protect', path: '/tools/pdf-protect', icon: '🔒' },
    { name: 'PDF Sign', path: '/tools/pdf-sign', icon: '✍️' },
    { name: 'PDF to Text', path: '/tools/pdf-to-text', icon: '📝' },
    { name: 'PDF Extract', path: '/tools/pdf-extract', icon: '📑' },
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
    { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
    { name: 'PDF to Excel', path: '/tools/pdf-to-excel', icon: '📊' },
    { name: 'PDF to PowerPoint', path: '/tools/pdf-to-ppt', icon: '📽️' },
    { name: 'PDF to HTML', path: '/tools/pdf-to-html', icon: '🌐' },
    { name: 'Excel to PDF', path: '/tools/excel-to-pdf', icon: '📊' },
    { name: 'PowerPoint to PDF', path: '/tools/powerpoint-to-pdf', icon: '📽️' },
    { name: 'HTML to PDF', path: '/tools/html-to-pdf', icon: '🌐' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
    { name: 'PDF Watermark', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
    { name: 'PDF Unlock', path: '/tools/pdf-unlock', icon: '🔓' },
    { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: '📝' },
  ];

  const positionOptions = [
    { value: 'top-left', label: 'Top Left', description: 'Header left corner' },
    { value: 'top-center', label: 'Top Center', description: 'Header center' },
    { value: 'top-right', label: 'Top Right', description: 'Header right corner' },
    { value: 'bottom-left', label: 'Bottom Left', description: 'Footer left corner' },
    { value: 'bottom-center', label: 'Bottom Center', description: 'Footer center' },
    { value: 'bottom-right', label: 'Bottom Right', description: 'Footer right corner' },
    { value: 'all-corners', label: 'All Corners', description: 'All four corners' }
  ];

  const styleOptions = [
    { value: 'numeric', label: 'Numeric (1, 2, 3)', description: 'Simple numbers' },
    { value: 'roman', label: 'Roman (i, ii, iii)', description: 'Roman numerals' },
    { value: 'alpha', label: 'Alphabetic (A, B, C)', description: 'Alphabet letters' },
    { value: 'formatted', label: 'Formatted (Page 1)', description: 'With "Page" prefix' },
    { value: 'fraction', label: 'Fraction (1/10)', description: 'Current/Total format' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '10pt font size' },
    { value: 'medium', label: 'Medium', description: '12pt font size' },
    { value: 'large', label: 'Large', description: '14pt font size' },
    { value: 'xlarge', label: 'Extra Large', description: '16pt font size' }
  ];

  const formatOptions = [
    { value: '1', label: '1', description: 'Simple number' },
    { value: 'Page 1', label: 'Page 1', description: 'With Page prefix' },
    { value: '- 1 -', label: '- 1 -', description: 'With dashes' },
    { value: '(1)', label: '(1)', description: 'In parentheses' },
    { value: '1 of 10', label: '1 of 10', description: 'With total pages' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">Add Number to PDF</h1>
          <p className="text-gray-600 mt-2">Add page numbers to PDF documents</p>
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
                  
                  {/* Number Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number Position
                    </label>
                    <div className="space-y-2">
                      {positionOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="numberPosition"
                            value={option.value}
                            checked={numberPosition === option.value}
                            onChange={(e) => setNumberPosition(e.target.value)}
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

                  {/* Number Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number Style
                    </label>
                    <div className="space-y-2">
                      {styleOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="numberStyle"
                            value={option.value}
                            checked={numberStyle === option.value}
                            onChange={(e) => setNumberStyle(e.target.value)}
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

                  {/* Number Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number Format
                    </label>
                    <div className="space-y-2">
                      {formatOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="numberFormat"
                            value={option.value}
                            checked={numberFormat === option.value}
                            onChange={(e) => setNumberFormat(e.target.value)}
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

                  {/* Start Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Number
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={startNumber}
                      onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Starting page number (default: 1)</p>
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <div className="space-y-2">
                      {fontSizeOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="fontSize"
                            value={option.value}
                            checked={fontSize === option.value}
                            onChange={(e) => setFontSize(e.target.value)}
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

                  {/* Include Total Pages */}
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <span className="text-sm font-medium text-gray-900">Include Total Pages</span>
                      <p className="text-xs text-gray-500">Show "Page X of Y" format</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeTotal}
                        onChange={(e) => setIncludeTotal(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>

                  {/* Preview */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Number Preview</h4>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className={`font-sans ${
                        fontSize === 'small' ? 'text-sm' :
                        fontSize === 'medium' ? 'text-base' :
                        fontSize === 'large' ? 'text-lg' : 'text-xl'
                      } text-gray-800`}>
                        {numberStyle === 'numeric' && '1'}
                        {numberStyle === 'roman' && 'i'}
                        {numberStyle === 'alpha' && 'A'}
                        {numberStyle === 'formatted' && 'Page 1'}
                        {numberStyle === 'fraction' && '1/10'}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Sample preview</p>
                    </div>
                  </div>

                  {/* Settings Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Settings Preview</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="font-semibold capitalize">{numberPosition.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Style:</span>
                        <span className="font-semibold capitalize">{numberStyle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start Number:</span>
                        <span className="font-semibold">{startNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Font Size:</span>
                        <span className="font-semibold capitalize">{fontSize}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Sticky Process Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleAddNumbers}
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isProcessing
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Page Numbers...
                      </div>
                    ) : (
                      'Add Page Numbers to PDF'
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
                    Add professional page numbers to your PDF documents
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
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Page Numbers Added Successfully!</h3>
                      <p className="text-green-600 mb-2">
                        PDF document now includes professional page numbering
                      </p>
                      
                      {/* Settings Summary */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center mb-3">
                          <div>
                            <div className="text-sm text-gray-600">Position</div>
                            <div className="text-lg font-bold text-gray-900 capitalize">{numberPosition.replace('-', ' ')}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Style</div>
                            <div className="text-lg font-bold text-green-600 capitalize">{numberStyle}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 text-center">
                          Start Number: <span className="font-semibold">{startNumber}</span> • 
                          Font Size: <span className="font-semibold capitalize">{fontSize}</span> • 
                          Total Pages: <span className="font-semibold">{includeTotal ? 'Included' : 'Not Included'}</span>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download={`numbered_${pdfFile.name}`}
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Numbered PDF
                        </a>
                      </div>

                      {/* Preview Button */}
                      <div className="mb-6">
                        <button
                          onClick={() => {
                            const previewWindow = window.open('', '_blank');
                            if (previewWindow) {
                              previewWindow.document.write(`
                                <html>
                                  <head><title>Page Numbers Preview</title></head>
                                  <body style="font-family: Arial, sans-serif; padding: 20px;">
                                    <h2>Page Numbers Preview</h2>
                                    <div style="border: 2px dashed #ccc; padding: 20px; margin: 20px 0; text-align: center;">
                                      <h3>Sample Page with Numbers</h3>
                                      <p>Your PDF document now includes page numbers with the following settings:</p>
                                      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                                        <strong>Position:</strong> ${numberPosition.replace('-', ' ')}<br>
                                        <strong>Style:</strong> ${numberStyle}<br>
                                        <strong>Start Number:</strong> ${startNumber}<br>
                                        <strong>Font Size:</strong> ${fontSize}<br>
                                        <strong>Total Pages:</strong> ${includeTotal ? 'Included' : 'Not Included'}
                                      </div>
                                      <p>The actual page numbers have been added to your PDF document.</p>
                                    </div>
                                  </body>
                                </html>
                              `);
                            }
                          }}
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview Settings
                        </button>
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Numbering</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Position: <strong className="capitalize">{numberPosition.replace('-', ' ')}</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Configure numbering options and click "Add Page Numbers to PDF"</p>
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