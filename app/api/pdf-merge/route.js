import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    
    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: 'Please upload at least 2 PDF files' },
        { status: 400 }
      );
    }

    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      try {
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
      } catch (error) {
        return NextResponse.json(
          { error: `Invalid PDF file: ${file.name}` },
          { status: 400 }
        );
      }
    }

    const mergedPdfBytes = await mergedPdf.save();
    
    return new Response(mergedPdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged-document.pdf"',
      },
    });
    
  } catch (error) {
    console.error('Merge error:', error);
    return NextResponse.json(
      { error: 'Failed to merge PDF files: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'PDF Merge API is working' });
}