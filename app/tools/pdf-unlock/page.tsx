'use client';
import React, { useState } from 'react';

export default function PdfUnlock() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [removeRestrictions, setRemoveRestrictions] = useState(true);
  const [outputQuality, setOutputQuality] = useState('high');
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState<boolean | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setPdfFile(file);
      setDownloadUrl(null);
      setPassword('');
      // Simulate file analysis
      setTimeout(() => {
        setIsPasswordProtected(Math.random() > 0.5); // Random for demo
      }, 1000);
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) return alert('Please upload a PDF file!');
    
    if (isPasswordProtected && !password.trim()) {
      return alert('This PDF appears to be password protected. Please enter the password.');
    }
    
    setIsConverting(true);
    setDownloadUrl(null);

    try {
      // Simulate unlock process
      setTimeout(() => {
        const dummyUrl = URL.createObjectURL(new Blob(['Unlocked PDF File'], { type: 'application/pdf' }));
        setDownloadUrl(dummyUrl);
        setIsConverting(false);
      }, 3000);
    } catch (error: any) {
      alert('Unlock failed: ' + error.message);
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
    { name: 'PDF Rotate', path: '/tools/pdf-rotate', icon: '🔄' },
  ];

  const qualityOptions = [
    { value: 'original', label: 'Original Quality', description: 'Keep original file quality' },
    { value: 'high', label: 'High Quality', description: 'Slight optimization' },
    { value: 'balanced', label: 'Balanced', description: 'Good quality with compression' }
  ];

  const getSecurityStatus = () => {
    if (isPasswordProtected === null) return 'Analyzing...';
    return isPasswordProtected ? 'Password Protected' : 'No Password';
  };

  const getStatusColor = () => {
    if (isPasswordProtected === null) return 'text-gray-600';
    return isPasswordProtected ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">Unlock PDF</h1>
          <p className="text-gray-600 mt-2">Remove passwords and restrictions from PDF files</p>
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
                    <div className="text-xs">
                      Security: <span className={`font-semibold ${getStatusColor()}`}>{getSecurityStatus()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                  
                  {/* Password Input */}
                  {isPasswordProtected && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-3">Password Required</h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PDF Password
                        </label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter PDF password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                        <p className="text-xs text-yellow-700 mt-2">
                          This PDF is password protected. Please enter the correct password to unlock.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Unlock Options */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Unlock Options</h4>
                    
                    <label className="flex items-start space-x-3 mb-4">
                      <input
                        type="checkbox"
                        checked={removeRestrictions}
                        onChange={(e) => setRemoveRestrictions(e.target.checked)}
                        className="text-red-500 focus:ring-red-500 mt-1"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">Remove All Restrictions</span>
                        <p className="text-xs text-gray-600 mt-1">
                          Remove printing, copying, and editing restrictions
                        </p>
                      </div>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Output Quality
                      </label>
                      <div className="space-y-2">
                        {qualityOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                            <input
                              type="radio"
                              name="outputQuality"
                              value={option.value}
                              checked={outputQuality === option.value}
                              onChange={(e) => setOutputQuality(e.target.value)}
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
                  </div>

                  {/* Security Analysis */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Security Analysis</h4>
                    <div className="text-sm text-green-700 space-y-2">
                      <div className="flex justify-between">
                        <span>Password Protection:</span>
                        <span className="font-semibold">
                          {isPasswordProtected ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Restrictions Removal:</span>
                        <span className="font-semibold">
                          {removeRestrictions ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Output Quality:</span>
                        <span className="font-semibold capitalize">{outputQuality}</span>
                      </div>
                    </div>
                  </div>

                  {/* Unlock Tips */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">🔓 Unlock Tips</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Only unlock PDFs you have permission to modify</li>
                      <li>• Remember the original password if needed later</li>
                      <li>• Test unlocked file before sharing</li>
                    </ul>
                  </div>

                </div>

                {/* Sticky Unlock Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleConvert}
disabled={isConverting || (isPasswordProtected === true && !password.trim())}                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                      isConverting || (isPasswordProtected && !password.trim())
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
                        Unlocking PDF...
                      </div>
                    ) : (
                      'Unlock PDF'
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
                    Remove passwords and restrictions from PDF files
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
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Unlock Successful!</h3>
                      <p className="text-green-600 mb-2">
                        PDF unlocked and restrictions removed
                      </p>
                      
                      {/* Unlock Details */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-sm text-gray-600">Password</div>
                            <div className="text-lg font-bold text-gray-900">Removed</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Restrictions</div>
                            <div className="text-lg font-bold text-green-600">
                              {removeRestrictions ? 'Removed' : 'Kept'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download="unlocked.pdf"
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Unlocked PDF
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Unlocking</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Security: <strong>{getSecurityStatus()}</strong>
                      </div>
                      <p className="text-gray-600 mt-4">
                        {isPasswordProtected 
                          ? 'Enter the password and configure unlock options' 
                          : 'Configure unlock options and click "Unlock PDF"'
                        }
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