import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';

// Configuration
const MAX_FILES = 20;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_TOTAL_SIZE = 500 * 1024 * 1024; // 500MB total

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    
    // Validate file count
    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: 'Please upload at least 2 PDF files' },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed. You uploaded ${files.length} files.` },
        { status: 400 }
      );
    }

    let totalSize = 0;
    const validatedFiles = [];

    // Validate each file
    for (const file of files) {
      // Check if it's a File object
      if (!(file instanceof File)) {
        return NextResponse.json(
          { error: 'Invalid file format' },
          { status: 400 }
        );
      }

      // Check file type
      if (file.type !== 'application/pdf') {
        return NextResponse.json(
          { error: `File "${file.name}" is not a PDF. Please upload PDF files only.` },
          { status: 400 }
        );
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" is too large. Maximum file size is 100MB.` },
          { status: 400 }
        );
      }

      // Check total size
      totalSize += file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        return NextResponse.json(
          { error: 'Total files size exceeds maximum limit of 500MB. Please upload smaller files.' },
          { status: 400 }
        );
      }

      validatedFiles.push(file);
    }

    console.log(`📊 Merging ${validatedFiles.length} files, total size: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);

    // Merge PDFs
    const mergedPdf = await PDFDocument.create();
    
    for (const file of validatedFiles) {
      try {
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        pages.forEach(page => mergedPdf.addPage(page));
        
        console.log(`✅ Added file: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
      } catch (error) {
        console.error(`❌ Error processing file ${file.name}:`, error);
        return NextResponse.json(
          { error: `Invalid or corrupted PDF file: ${file.name}` },
          { status: 400 }
        );
      }
    }

    const mergedPdfBytes = await mergedPdf.save();
    console.log(`🎉 Merge successful! Final PDF size: ${(mergedPdfBytes.length / (1024 * 1024)).toFixed(2)}MB`);
    
    return new Response(mergedPdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged-document.pdf"',
      },
    });
    
  } catch (error) {
    console.error('💥 Merge error:', error);
    return NextResponse.json(
      { error: 'Failed to merge PDF files: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PDF Merge API is working',
    limits: {
      maxFiles: MAX_FILES,
      maxFileSize: `${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      maxTotalSize: `${MAX_TOTAL_SIZE / (1024 * 1024)}MB`
    }
  });
}