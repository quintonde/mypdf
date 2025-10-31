// /app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About MYPDF
          </h1>
          <p className="text-xl text-gray-600">
            Your trusted partner for all PDF solutions
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At MYPDF, we believe that working with PDFs should be simple, fast, and accessible to everyone. 
            Our mission is to provide powerful PDF tools that are 100% free, secure, and easy to use.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Efficient</h3>
            <p className="text-gray-600">Process your PDFs in seconds with our cloud-based technology</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your files are processed securely and never stored on our servers</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">💯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Free</h3>
            <p className="text-gray-600">No hidden costs, no registration required, forever free</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-3xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Accessible Worldwide</h3>
            <p className="text-gray-600">Available to users around the globe in multiple languages</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold">21+</div>
              <div className="text-red-100">PDF Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2M+</div>
              <div className="text-red-100">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5M+</div>
              <div className="text-red-100">Files Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-red-100">Free</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}