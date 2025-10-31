'use client';
import React, { useState } from 'react';

export default function PdfSign() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signatureType, setSignatureType] = useState('digital');
  const [signaturePosition, setSignaturePosition] = useState('bottom-right');
  const [signatureStyle, setSignatureStyle] = useState('text');
  const [certificateType, setCertificateType] = useState('self-signed');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [customText, setCustomText] = useState('Approved');
  const [signatureImage, setSignatureImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
      setDownloadUrl(null);
    }
  };

  const handleSignatureImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSignatureImage(e.target.files[0]);
    }
  };

  const handleSign = async () => {
    if (!pdfFile) return alert('Please upload a PDF file!');
    
    setIsProcessing(true);
    setDownloadUrl(null);

    try {
      // Simulate signing process
      setTimeout(() => {
        const dummyUrl = URL.createObjectURL(new Blob(['Signed PDF File'], { type: 'application/pdf' }));
        setDownloadUrl(dummyUrl);
        setIsProcessing(false);
      }, 3000);
    } catch (error: any) {
      alert('Signing failed: ' + error.message);
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

  const signatureTypeOptions = [
    { value: 'digital', label: 'Digital Signature', description: 'Secure cryptographic signature', icon: '🔐' },
    { value: 'text', label: 'Text Signature', description: 'Add text-based signature', icon: '📝' },
    { value: 'image', label: 'Image Signature', description: 'Upload signature image', icon: '🖼️' },
    { value: 'draw', label: 'Draw Signature', description: 'Draw your signature', icon: '✏️' }
  ];

  const positionOptions = [
    { value: 'bottom-right', label: 'Bottom Right', description: 'Standard signature position' },
    { value: 'bottom-left', label: 'Bottom Left', description: 'Alternative position' },
    { value: 'top-right', label: 'Top Right', description: 'Header position' },
    { value: 'top-left', label: 'Top Left', description: 'Header alternative' },
    { value: 'center', label: 'Center', description: 'Middle of page' },
    { value: 'custom', label: 'Custom Position', description: 'Select specific location' }
  ];

  const styleOptions = [
    { value: 'text', label: 'Text Signature', description: 'Simple text approval' },
    { value: 'stamp', label: 'Digital Stamp', description: 'Official stamp style' },
    { value: 'handwritten', label: 'Handwritten', description: 'Simulated handwriting' },
    { value: 'official', label: 'Official Seal', description: 'Formal document seal' }
  ];

  const certificateOptions = [
    { value: 'self-signed', label: 'Self-Signed', description: 'Quick personal signature' },
    { value: 'verified', label: 'Verified Certificate', description: 'Trusted CA certificate' },
    { value: 'timestamp', label: 'Timestamp', description: 'Add timestamp authority' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4">
      
      {/* Tool Name Header - Only show when no file uploaded */}
      {!pdfFile && (
        <div className="text-center mb-8 pt-4">
          <h1 className="text-4xl font-bold text-gray-900">PDF Sign</h1>
          <p className="text-gray-600 mt-2">Add digital signatures to PDF documents</p>
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
                  
                  {/* Signature Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Signature Type
                    </label>
                    <div className="space-y-3">
                      {signatureTypeOptions.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                            signatureType === option.value
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="signatureType"
                            value={option.value}
                            checked={signatureType === option.value}
                            onChange={(e) => setSignatureType(e.target.value)}
                            className="text-red-500 focus:ring-red-500 mt-1"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{option.icon}</span>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium text-gray-900">{option.label}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Custom Text Input for Text Signature */}
                  {signatureType === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Signature Text
                      </label>
                      <input
                        type="text"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter signature text"
                      />
                    </div>
                  )}

                  {/* Image Upload for Image Signature */}
                  {signatureType === 'image' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Signature Image
                      </label>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={handleSignatureImageChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG, SVG (Max: 5MB)</p>
                    </div>
                  )}

                  {/* Signature Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Signature Style
                    </label>
                    <div className="space-y-2">
                      {styleOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="signatureStyle"
                            value={option.value}
                            checked={signatureStyle === option.value}
                            onChange={(e) => setSignatureStyle(e.target.value)}
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

                  {/* Signature Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Signature Position
                    </label>
                    <div className="space-y-2">
                      {positionOptions.map((option) => (
                        <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                          <input
                            type="radio"
                            name="signaturePosition"
                            value={option.value}
                            checked={signaturePosition === option.value}
                            onChange={(e) => setSignaturePosition(e.target.value)}
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

                  {/* Certificate Type (for Digital Signature) */}
                  {signatureType === 'digital' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Certificate Type
                      </label>
                      <div className="space-y-2">
                        {certificateOptions.map((option) => (
                          <label key={option.value} className="flex items-center p-2 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                            <input
                              type="radio"
                              name="certificateType"
                              value={option.value}
                              checked={certificateType === option.value}
                              onChange={(e) => setCertificateType(e.target.value)}
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
                  )}

                  {/* Security Preview */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Security Preview</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div className="flex justify-between">
                        <span>Signature Type:</span>
                        <span className="font-semibold capitalize">{signatureType.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Position:</span>
                        <span className="font-semibold capitalize">{signaturePosition.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Style:</span>
                        <span className="font-semibold capitalize">{signatureStyle}</span>
                      </div>
                      {signatureType === 'digital' && (
                        <div className="flex justify-between">
                          <span>Certificate:</span>
                          <span className="font-semibold capitalize">{certificateType.replace('-', ' ')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Security Tips */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">🔐 Security Tips</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Use <strong>Digital Signature</strong> for legal documents</li>
                      <li>• <strong>Verified Certificates</strong> provide highest security</li>
                      <li>• Keep your private keys secure</li>
                      <li>• Verify signature after application</li>
                    </ul>
                  </div>

                </div>

                {/* Sticky Sign Button */}
                <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t">
                  <button
                    onClick={handleSign}
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
                        Applying Signature...
                      </div>
                    ) : (
                      `Sign PDF Document`
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
                    Add digital signatures to PDF documents securely
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
                      <h3 className="text-2xl font-semibold text-green-800 mb-2">Document Signed Successfully!</h3>
                      <p className="text-green-600 mb-2">
                        PDF document has been securely signed
                      </p>
                      
                      {/* Signature Details */}
                      <div className="bg-white rounded-lg p-4 mb-6 border border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-center mb-3">
                          <div>
                            <div className="text-sm text-gray-600">Signature Type</div>
                            <div className="text-lg font-bold text-gray-900 capitalize">{signatureType.replace('-', ' ')}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Security Level</div>
                            <div className="text-lg font-bold text-green-600">
                              {signatureType === 'digital' ? 'High' : 'Standard'}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 text-center">
                          Position: <span className="font-semibold capitalize">{signaturePosition.replace('-', ' ')}</span> • 
                          Style: <span className="font-semibold capitalize">{signatureStyle}</span>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="mb-6">
                        <a
                          href={downloadUrl}
                          download={`signed_document.pdf`}
                          className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg text-lg"
                        >
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Signed PDF
                        </a>
                      </div>

                      {/* Verify Signature Button */}
                      <div className="mb-6">
                        <button
                          onClick={() => alert('Signature verification feature would check the digital signature validity')}
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Verify Signature
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
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">File Ready for Signing</h3>
                      <p className="text-blue-600 mb-4">{pdfFile.name}</p>
                      <div className="text-sm text-gray-600 bg-white rounded-lg p-3 inline-block">
                        Signature Type: <strong className="capitalize">{signatureType.replace('-', ' ')}</strong>
                      </div>
                      <p className="text-gray-600 mt-4">Configure signature options and click "Sign PDF Document"</p>
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