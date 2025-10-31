// /app/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                At MYPDF, we are committed to protecting your privacy. We collect minimal information to provide our services:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Files you upload for processing (temporarily during processing)</li>
                <li>Basic usage statistics to improve our services</li>
                <li>Technical information like browser type and IP address</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                Your information is used solely to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Process your PDF files as requested</li>
                <li>Improve our tools and user experience</li>
                <li>Ensure the security of our services</li>
                <li>Provide customer support when needed</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. File Processing & Storage</h2>
              <p className="text-gray-600">
                We take your privacy seriously. Your uploaded files are:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li>Processed in secure, encrypted environments</li>
                <li>Automatically deleted from our servers after processing</li>
                <li>Never shared with third parties</li>
                <li>Never used for any purpose other than your requested conversion</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
                <li>SSL encryption for all data transfers</li>
                <li>Secure cloud infrastructure</li>
                <li>Regular security audits</li>
                <li>Automatic file deletion policies</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-600">
                We do not sell, trade, or transfer your personal information to third parties. 
                We may use trusted third-party services that help us operate our website, 
                but they are bound by confidentiality agreements.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access any personal information we hold about you</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of any non-essential data collection</li>
                <li>Ask questions about our privacy practices</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@mypdf.com" className="text-red-600 hover:text-red-700">
                  privacy@mypdf.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}