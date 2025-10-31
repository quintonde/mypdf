import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyPDFTools - All-in-One PDF Solution',
  description: 'Free PDF tools for conversion, editing, and organization. Convert PDF to Word, Merge PDF, Split PDF, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        
        {/* Footer - Now available on every page */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PDF</span>
                  </div>
                  <span className="text-2xl font-bold">MYPDF</span>
                </div>
                <p className="text-gray-400 mb-4 max-w-md">
                  Your all-in-one PDF solution with 21+ powerful tools. Free, fast, and secure document processing.
                </p>
                <div className="text-gray-500 text-sm">
                  © 2024 MYPDF. All rights reserved.
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/all-tools" className="text-gray-400 hover:text-white transition-colors">All Tools</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Popular Tools */}
              <div>
                <h3 className="font-semibold text-white mb-4">Popular Tools</h3>
                <ul className="space-y-2">
                  <li><Link href="/tools/pdf-to-word" className="text-gray-400 hover:text-white transition-colors">PDF to Word</Link></li>
                  <li><Link href="/tools/pdf-merge" className="text-gray-400 hover:text-white transition-colors">Merge PDF</Link></li>
                  <li><Link href="/tools/pdf-compress" className="text-gray-400 hover:text-white transition-colors">Compress PDF</Link></li>
                  <li><Link href="/tools/pdf-to-ppt" className="text-gray-400 hover:text-white transition-colors">PDF to PowerPoint</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}