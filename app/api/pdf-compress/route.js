import { NextResponse } from 'next/server';

const PDFCO_API_KEY = process.env.PDFCO_API_KEY;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('🔄 Starting PDF.co compression...');

    // Step 1: Upload file to PDF.co
    console.log('📤 Step 1: Uploading file to PDF.co...');
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const uploadResponse = await fetch('https://api.pdf.co/v1/file/upload', {
      method: 'POST',
      headers: {
        'x-api-key': PDFCO_API_KEY,
      },
      body: uploadFormData
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.json();
      console.error('❌ PDF.co Upload Error:', error);
      throw new Error('File upload failed: ' + (error.message || 'Unknown error'));
    }

    const uploadData = await uploadResponse.json();
    const fileUrl = uploadData.url;
    console.log('✅ File uploaded, URL:', fileUrl);

    // Step 2: Compress the uploaded file
    console.log('⚡ Step 2: Compressing file...');
    const compressResponse = await fetch('https://api.pdf.co/v1/pdf/optimize', {
      method: 'POST',
      headers: {
        'x-api-key': PDFCO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: fileUrl,
        name: 'compressed.pdf',
        async: false,
        compressionLevel: 'medium'
      })
    });

    console.log('📥 PDF.co Compression status:', compressResponse.status);

    if (!compressResponse.ok) {
      const error = await compressResponse.json();
      console.error('❌ PDF.co Compression Error:', error);
      throw new Error('Compression failed: ' + (error.message || 'Unknown error'));
    }

    const compressData = await compressResponse.json();
    
    if (!compressData.url) {
      throw new Error('No download URL received from PDF.co');
    }

    // Step 3: Download compressed file
    console.log('📥 Step 3: Downloading compressed file...');
    const downloadResponse = await fetch(compressData.url, {
      method: 'GET'
    });

    if (!downloadResponse.ok) {
      throw new Error('Failed to download compressed file');
    }

    const compressedPDF = await downloadResponse.blob();
    console.log('✅ Compression successful, size:', compressedPDF.size);

    return new Response(compressedPDF, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compressed.pdf"'
      }
    });

  } catch (error) {
    console.error('💥 Compression error:', error);
    return NextResponse.json({ 
      error: 'Compression failed: ' + error.message 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PDF Compress API is working',
    status: 'OK'
  });
}