'use client';
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const featuredTools = [
    {
      name: 'PDF to Word',
      description: 'Convert PDF to editable Word documents',
      path: '/tools/pdf-to-word',
      icon: '📄',
      uses: '1.2M+ uses',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Merge PDF',
      description: 'Combine multiple PDFs into one',
      path: '/tools/pdf-merge',
      icon: '🔄',
      uses: '890K+ uses',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Compress PDF',
      description: 'Reduce PDF file size',
      path: '/tools/pdf-compress',
      icon: '📦',
      uses: '680K+ uses',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'Image to PDF',
      description: 'Convert images to PDF documents',
      path: '/tools/image-to-pdf',
      icon: '📑',
      uses: '550K+ uses',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const convertFromPdfTools = [
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
    { name: 'PDF to Excel', path: '/tools/pdf-to-excel', icon: '📊' },
    { name: 'PDF to PowerPoint', path: '/tools/pdf-to-ppt', icon: '📽️' },
    { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
    { name: 'PDF to HTML', path: '/tools/pdf-to-html', icon: '🌐' },
    { name: 'PDF to Text', path: '/tools/pdf-to-text', icon: '📝' },
  ];

  const convertToPdfTools = [
    { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: '📝' },
    { name: 'Excel to PDF', path: '/tools/excel-to-pdf', icon: '📊' },
    { name: 'PowerPoint to PDF', path: '/tools/powerpoint-to-pdf', icon: '📽️' },
    { name: 'HTML to PDF', path: '/tools/html-to-pdf', icon: '🌐' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
  ];

  const editTools = [
    { name: 'Watermark PDF', path: '/tools/pdf-watermark', icon: '💧' },
    { name: 'Rotate PDF', path: '/tools/pdf-rotate', icon: '🔄' },
    { name: 'Compress PDF', path: '/tools/pdf-compress', icon: '📦' },
    { name: 'Protect PDF', path: '/tools/pdf-protect', icon: '🔒' },
    { name: 'Unlock PDF', path: '/tools/pdf-unlock', icon: '🔓' },
    { name: 'Sign PDF', path: '/tools/pdf-sign', icon: '✍️' },
    { name: 'Add Number to PDF', path: '/tools/add-number-to-pdf', icon: '🔢' },
  ];

  const organizeTools = [
    { name: 'Merge PDF', path: '/tools/pdf-merge', icon: '🔄' },
    { name: 'Split PDF', path: '/tools/pdf-split', icon: '✂️' },
    { name: 'Extract PDF', path: '/tools/pdf-extract', icon: '📑' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Hero Section - COMPACT */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Ultimate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                PDF Toolkit
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              21+ Powerful Tools • 100% Free • No Registration Required
            </p>

            {/* Quick Stats - COMPACT */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">21+</div>
                <div className="text-gray-600 text-sm">Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-gray-600 text-sm">Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">2M+</div>
                <div className="text-gray-600 text-sm">Users</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools - IMMEDIATELY AFTER HERO */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              🔥 Most Popular Tools
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most loved tools trusted by millions worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, index) => (
              <Link
                key={tool.name}
                href={tool.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:transform hover:-translate-y-1"
              >
                <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {tool.uses}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Convert From PDF */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">📤 Convert From PDF</h2>
                <p className="text-gray-600 mt-2">Transform your PDFs into other formats</p>
              </div>
              <Link href="/all-tools" className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-2">
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {convertFromPdfTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-red-50 transition-all duration-300 border border-gray-200 hover:border-red-200 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600">Convert from PDF</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-red-500 transition-colors">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Convert To PDF */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">📥 Convert To PDF</h2>
                <p className="text-gray-600 mt-2">Create PDFs from various file formats</p>
              </div>
              <Link href="/all-tools" className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-2">
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {convertToPdfTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-red-50 transition-all duration-300 border border-gray-200 hover:border-red-200 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600">Convert to PDF</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-red-500 transition-colors">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Edit & Optimize PDF */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">🎨 Edit & Enhance PDF</h2>
                <p className="text-gray-600 mt-2">Modify and improve your PDF documents</p>
              </div>
              <Link href="/all-tools" className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-2">
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-red-50 transition-all duration-300 border border-gray-200 hover:border-red-200 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600">Edit tool</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-red-500 transition-colors">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Organize PDF */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">📊 Organize PDF</h2>
                <p className="text-gray-600 mt-2">Manage and structure your PDF files</p>
              </div>
              <Link href="/all-tools" className="text-red-600 hover:text-red-700 font-semibold flex items-center space-x-2">
                <span>View All</span>
                <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizeTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className="group bg-gray-50 rounded-xl p-6 hover:bg-red-50 transition-all duration-300 border border-gray-200 hover:border-red-200 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{tool.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600">Organize tool</p>
                    </div>
                    <div className="text-gray-400 group-hover:text-red-500 transition-colors">
                      →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* All Tools CTA */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            🚀 Explore All 21+ PDF Tools
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Discover our complete suite of PDF tools designed to handle all your document needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/all-tools" 
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse All Tools
            </Link>
            <Link 
              href="/tools/pdf-merge" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              Try Merge PDF
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            🌟 Trusted by Millions Worldwide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">100% Free</h3>
              <p className="text-gray-300">No hidden costs, forever free</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
              <p className="text-gray-300">Your files are never stored</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Processing</h3>
              <p className="text-gray-300">Fast cloud-based technology</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}