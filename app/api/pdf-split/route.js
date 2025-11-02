import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('file');
    const splitType = formData.get('splitType');
    const pageRange = formData.get('pageRange');
    const splitEvery = formData.get('splitEvery');

    console.log('📞 API Called - POST', { splitType, pageRange, splitEvery });

    if (!pdfFile) {
      return NextResponse.json({ error: 'Please upload a PDF file' }, { status: 400 });
    }

    const fileBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBuffer);
    const pageCount = pdfDoc.getPageCount();

    console.log(`📄 Processing PDF with ${pageCount} pages, Split Type: ${splitType}`);

    let pagesToExtract = [];

    // Determine which pages to extract
    if (splitType === 'single') {
      pagesToExtract = Array.from({ length: pageCount }, (_, i) => i);
      console.log(`📄 Single mode: Extracting ALL ${pageCount} pages`);
    } 
    else if (splitType === 'range' && pageRange) {
      pagesToExtract = parsePageRanges(pageRange, pageCount);
      console.log(`📄 Range mode: Extracting pages ${pageRange} -> ${pagesToExtract.length} pages`);
    } 
    else if (splitType === 'every' && splitEvery) {
      const every = parseInt(splitEvery);
      if (every < 1 || every > pageCount) {
        return NextResponse.json({ error: 'Invalid number of pages' }, { status: 400 });
      }
      
      for (let i = 0; i < pageCount; i += every) {
        pagesToExtract.push(i);
      }
      console.log(`📄 Every mode: Splitting every ${every} pages -> ${pagesToExtract.length} files`);
    } 
    else {
      return NextResponse.json({ error: 'Invalid split options' }, { status: 400 });
    }

    if (pagesToExtract.length === 0) {
      return NextResponse.json({ error: 'No pages selected for splitting' }, { status: 400 });
    }

    console.log(`🎯 Total pages to extract: ${pagesToExtract.length}`);

    // Create ZIP file
    const zip = new JSZip();

    // Pages process karo with delay - memory bachane ke liye
    for (let i = 0; i < pagesToExtract.length; i++) {
      const pageIndex = pagesToExtract[i];
      
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageIndex]);
      newPdf.addPage(copiedPage);
      
      const pdfBytes = await newPdf.save();
      zip.file(`page-${pageIndex + 1}.pdf`, pdfBytes);

      // Memory cleanup ke liye thoda wait karo
      if (i % 3 === 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // ✅ CORRECTED ZIP GENERATION
    const zipBuffer = await zip.generateAsync({ 
      type: 'nodebuffer',    // ✅ Yeh use karo
      compression: 'DEFLATE',
      streamFiles: true
    });

    console.log(`📦 ZIP created with ${pagesToExtract.length} files, size: ${zipBuffer.length} bytes`);

    // ✅ CORRECT RESPONSE
    return new Response(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="split-pages.zip"`,
        'Content-Length': zipBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('💥 Split error:', error);
    return NextResponse.json({ 
      error: 'Failed to split PDF: ' + error.message 
    }, { status: 500 });
  }
}

// Helper function same rahega
function parsePageRanges(rangeString, totalPages) {
  const pages = new Set();
  const ranges = rangeString.split(',');

  for (const range of ranges) {
    const trimmed = range.trim();
    if (!trimmed) continue;

    if (trimmed.includes('-')) {
      const [startStr, endStr] = trimmed.split('-');
      const start = parseInt(startStr) - 1;
      const end = parseInt(endStr) - 1;
      
      if (isNaN(start) || isNaN(end) || start < 0 || end >= totalPages || start > end) {
        continue;
      }
      
      for (let i = start; i <= end; i++) {
        pages.add(i);
      }
    } else {
      const pageNum = parseInt(trimmed) - 1;
      if (!isNaN(pageNum) && pageNum >= 0 && pageNum < totalPages) {
        pages.add(pageNum);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}