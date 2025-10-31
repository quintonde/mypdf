'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// Types define karte hain
interface Tool {
  name: string;
  path: string;
  icon: string;
}

interface ToolCategory {
  category: string;
  tools: Tool[];
}

interface CategoryDropdownProps {
  categories: ToolCategory[];
  width?: string;
}

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const convertToolsCategories: ToolCategory[] = [
    {
      category: 'Convert From PDF',
      tools: [
        { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
        { name: 'PDF to Excel', path: '/tools/pdf-to-excel', icon: '📊' },
        { name: 'PDF to PowerPoint', path: '/tools/pdf-to-ppt', icon: '📽️' },
        { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
        { name: 'PDF to HTML', path: '/tools/pdf-to-html', icon: '🌐' },
        { name: 'PDF to Text', path: '/tools/pdf-to-text', icon: '📝' },
      ]
    },
    {
      category: 'Convert To PDF',
      tools: [
        { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: '📝' },
        { name: 'Excel to PDF', path: '/tools/excel-to-pdf', icon: '📊' },
        { name: 'PowerPoint to PDF', path: '/tools/powerpoint-to-pdf', icon: '📽️' },
        { name: 'HTML to PDF', path: '/tools/html-to-pdf', icon: '🌐' },
        { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
      ]
    }
  ];

  const editToolsCategories: ToolCategory[] = [
    {
      category: 'Edit & Enhance PDF',
      tools: [
        { name: 'Watermark PDF', path: '/tools/pdf-watermark', icon: '💧' },
        { name: 'Rotate PDF', path: '/tools/pdf-rotate', icon: '🔄' },
        { name: 'Compress PDF', path: '/tools/pdf-compress', icon: '📦' },
        { name: 'Protect PDF', path: '/tools/pdf-protect', icon: '🔒' },
        { name: 'Unlock PDF', path: '/tools/pdf-unlock', icon: '🔓' },
        { name: 'Sign PDF', path: '/tools/pdf-sign', icon: '✍️' },
        { name: 'Add Number to PDF', path: '/tools/add-number-to-pdf', icon: '🔢' },
      ]
    }
  ];

  const organizeToolsCategories: ToolCategory[] = [
    {
      category: 'Organize PDF',
      tools: [
        { name: 'Merge PDF', path: '/tools/pdf-merge', icon: '🔄' },
        { name: 'Split PDF', path: '/tools/pdf-split', icon: '✂️' },
        { name: 'Extract PDF', path: '/tools/pdf-extract', icon: '📑' },
      ]
    }
  ];

  const allPdfTools: ToolCategory[] = [
    {
      category: 'Convert From PDF',
      tools: [
        { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄' },
        { name: 'PDF to Excel', path: '/tools/pdf-to-excel', icon: '📊' },
        { name: 'PDF to PowerPoint', path: '/tools/pdf-to-ppt', icon: '📽️' },
        { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️' },
        { name: 'PDF to HTML', path: '/tools/pdf-to-html', icon: '🌐' },
        { name: 'PDF to Text', path: '/tools/pdf-to-text', icon: '📝' },
      ]
    },
    {
      category: 'Convert To PDF',
      tools: [
        { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: '📝' },
        { name: 'Excel to PDF', path: '/tools/excel-to-pdf', icon: '📊' },
        { name: 'PowerPoint to PDF', path: '/tools/powerpoint-to-pdf', icon: '📽️' },
        { name: 'HTML to PDF', path: '/tools/html-to-pdf', icon: '🌐' },
        { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑' },
      ]
    },
    {
      category: 'Edit & Enhance PDF',
      tools: [
        { name: 'Watermark PDF', path: '/tools/pdf-watermark', icon: '💧' },
        { name: 'Rotate PDF', path: '/tools/pdf-rotate', icon: '🔄' },
        { name: 'Compress PDF', path: '/tools/pdf-compress', icon: '📦' },
        { name: 'Protect PDF', path: '/tools/pdf-protect', icon: '🔒' },
        { name: 'Unlock PDF', path: '/tools/pdf-unlock', icon: '🔓' },
        { name: 'Sign PDF', path: '/tools/pdf-sign', icon: '✍️' },
        { name: 'Add Number to PDF', path: '/tools/add-number-to-pdf', icon: '🔢' },
      ]
    },
    {
      category: 'Organize PDF',
      tools: [
        { name: 'Merge PDF', path: '/tools/pdf-merge', icon: '🔄' },
        { name: 'Split PDF', path: '/tools/pdf-split', icon: '✂️' },
        { name: 'Extract PDF', path: '/tools/pdf-extract', icon: '📑' },
      ]
    }
  ];

  const moreTools: Tool[] = [
    { name: 'All Tools', path: '/tools', icon: '🛠️' },
    { name: 'About Us', path: '/about', icon: 'ℹ️' },
    { name: 'Contact', path: '/contact', icon: '📞' },
  ];

  // Common dropdown style component with proper types
  const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ categories, width = 'w-96' }) => (
    <div className={`absolute left-0 mt-1 ${width} bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto`}>
      <div className="p-4">
        {categories.map((category: ToolCategory, index: number) => (
          <div key={category.category} className={index > 0 ? 'mt-4' : ''}>
            <h3 className="text-sm font-bold text-gray-800 mb-2 px-2 border-b border-gray-100 pb-1">
              {category.category}
            </h3>
            <div className="space-y-1">
              {category.tools.map((tool: Tool) => (
                <Link
                  key={tool.name}
                  href={tool.path}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg"
                  onClick={() => setActiveDropdown(null)}
                >
                  <span className="text-lg mr-3 w-6 text-center">{tool.icon}</span>
                  <span className="flex-1">{tool.name}</span>
                </Link>
              ))}
            </div>
            {index < categories.length - 1 && (
              <div className="border-t border-gray-100 mt-3"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center space-x-8">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">PDF</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">MYPDF</span>
                <div className="text-xs text-gray-500 -mt-1">Free Online Tools</div>
              </div>
            </Link>

            {/* Navigation Menu - Left Side */}
            <nav className="hidden md:flex space-x-6">
              
              {/* Convert Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('convert')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors font-medium py-2 relative group"
                >
                  <span>Convert</span>
                  <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'convert' ? 'rotate-180' : ''}`} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  
                  {/* Attaching arrow */}
                  {activeDropdown === 'convert' && (
                    <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45 z-50"></div>
                  )}
                </button>
                
                {activeDropdown === 'convert' && (
                  <>
                    <CategoryDropdown categories={convertToolsCategories} width="w-80" />
                  </>
                )}
              </div>

              {/* Edit Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('edit')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors font-medium py-2 relative group"
                >
                  <span>Edit</span>
                  <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'edit' ? 'rotate-180' : ''}`} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  
                  {/* Attaching arrow */}
                  {activeDropdown === 'edit' && (
                    <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45 z-50"></div>
                  )}
                </button>
                
                {activeDropdown === 'edit' && (
                  <>
                    <CategoryDropdown categories={editToolsCategories} width="w-72" />
                  </>
                )}
              </div>

              {/* Organize Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('organize')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors font-medium py-2 relative group"
                >
                  <span>Organize</span>
                  <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'organize' ? 'rotate-180' : ''}`} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  
                  {/* Attaching arrow */}
                  {activeDropdown === 'organize' && (
                    <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45 z-50"></div>
                  )}
                </button>
                
                {activeDropdown === 'organize' && (
                  <>
                    <CategoryDropdown categories={organizeToolsCategories} width="w-64" />
                  </>
                )}
              </div>

              {/* Merge PDF - Direct Link */}
              <Link 
                href="/tools/pdf-merge" 
                className="text-gray-700 hover:text-red-600 transition-colors font-medium py-2"
              >
                Merge PDF
              </Link>

              {/* All PDF Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('allTools')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors font-medium py-2 relative group"
                >
                  <span>All PDF Tools</span>
                  <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'allTools' ? 'rotate-180' : ''}`} 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  
                  {/* Attaching arrow */}
                  {activeDropdown === 'allTools' && (
                    <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45 z-50"></div>
                  )}
                </button>
                
                {activeDropdown === 'allTools' && (
                  <>
                    <CategoryDropdown categories={allPdfTools} />
                  </>
                )}
              </div>

            </nav>
          </div>

          {/* Right Side - Login & Signup */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Login
            </Link>
            <Link 
              href="/signup" 
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
}