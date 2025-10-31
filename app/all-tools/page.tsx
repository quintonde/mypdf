// /app/tools/page.tsx
export default function AllToolsPage() {
  const allTools = [
    // Convert From PDF
    { name: 'PDF to Word', path: '/tools/pdf-to-word', icon: '📄', category: 'Convert From PDF' },
    { name: 'PDF to Excel', path: '/tools/pdf-to-excel', icon: '📊', category: 'Convert From PDF' },
    { name: 'PDF to PowerPoint', path: '/tools/pdf-to-ppt', icon: '📽️', category: 'Convert From PDF' },
    { name: 'PDF to Image', path: '/tools/pdf-to-image', icon: '🖼️', category: 'Convert From PDF' },
    { name: 'PDF to HTML', path: '/tools/pdf-to-html', icon: '🌐', category: 'Convert From PDF' },
    { name: 'PDF to Text', path: '/tools/pdf-to-text', icon: '📝', category: 'Convert From PDF' },
    
    // Convert To PDF
    { name: 'Word to PDF', path: '/tools/word-to-pdf', icon: '📝', category: 'Convert To PDF' },
    { name: 'Excel to PDF', path: '/tools/excel-to-pdf', icon: '📊', category: 'Convert To PDF' },
    { name: 'PowerPoint to PDF', path: '/tools/powerpoint-to-pdf', icon: '📽️', category: 'Convert To PDF' },
    { name: 'HTML to PDF', path: '/tools/html-to-pdf', icon: '🌐', category: 'Convert To PDF' },
    { name: 'Image to PDF', path: '/tools/image-to-pdf', icon: '📑', category: 'Convert To PDF' },
    
    // Edit & Enhance
    { name: 'Watermark PDF', path: '/tools/pdf-watermark', icon: '💧', category: 'Edit & Enhance' },
    { name: 'Rotate PDF', path: '/tools/pdf-rotate', icon: '🔄', category: 'Edit & Enhance' },
    { name: 'Compress PDF', path: '/tools/pdf-compress', icon: '📦', category: 'Edit & Enhance' },
    { name: 'Protect PDF', path: '/tools/pdf-protect', icon: '🔒', category: 'Edit & Enhance' },
    { name: 'Unlock PDF', path: '/tools/pdf-unlock', icon: '🔓', category: 'Edit & Enhance' },
    { name: 'Sign PDF', path: '/tools/pdf-sign', icon: '✍️', category: 'Edit & Enhance' },
    { name: 'Add Number to PDF', path: '/tools/add-number-to-pdf', icon: '🔢', category: 'Edit & Enhance' },
    
    // Organize
    { name: 'Merge PDF', path: '/tools/pdf-merge', icon: '🔄', category: 'Organize' },
    { name: 'Split PDF', path: '/tools/pdf-split', icon: '✂️', category: 'Organize' },
    { name: 'Extract PDF', path: '/tools/pdf-extract', icon: '📑', category: 'Organize' },
  ];

  const categories = ['Convert From PDF', 'Convert To PDF', 'Edit & Enhance', 'Organize'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All PDF Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our complete suite of 21+ powerful PDF tools
          </p>
        </div>

        {/* Tools Grid by Category */}
        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTools
                  .filter(tool => tool.category === category)
                  .map((tool) => (
                    <a
                      key={tool.name}
                      href={tool.path}
                      className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-red-200 hover:transform hover:-translate-y-1"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{tool.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors text-lg">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">Click to use tool</p>
                        </div>
                        <div className="text-gray-400 group-hover:text-red-500 transition-colors text-xl">
                          →
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose MYPDF?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">21+</div>
              <div className="text-gray-600">PDF Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-gray-600">Free Forever</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">2M+</div>
              <div className="text-gray-600">Users Trusted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}