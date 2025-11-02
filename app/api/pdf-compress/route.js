import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('file');
    const quality = formData.get('compressionLevel') || 'medium';

    console.log('📦 Starting Ghostscript compression');

    if (!pdfFile) {
      return NextResponse.json({ error: 'Please upload a PDF file' }, { status: 400 });
    }

    // Ghostscript compression settings
    const gsSettings = {
      low: '/printer',      // High quality (300 DPI)
      medium: '/ebook',     // Good quality (150 DPI)  
      high: '/screen',      // Medium quality (72 DPI)
      extreme: '/screen'    // Low quality (72 DPI)
    };

    const setting = gsSettings[quality] || '/ebook';

    // Temporary files
    const tempInput = join(tmpdir(), `input-${Date.now()}.pdf`);
    const tempOutput = join(tmpdir(), `output-${Date.now()}.pdf`);

    // Save uploaded file
    const buffer = await pdfFile.arrayBuffer();
    writeFileSync(tempInput, Buffer.from(buffer));

    // Ghostscript command
    const gsCommand = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${setting} -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${tempOutput}" "${tempInput}"`;

    return new Promise((resolve) => {
      exec(gsCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Ghostscript error:', error);
          // Fallback to basic optimization
          const { PDFDocument } = require('pdf-lib');
          PDFDocument.load(buffer).then(pdfDoc => {
            pdfDoc.save().then(optimizedBytes => {
              resolve(new Response(optimizedBytes, {
                headers: { 
                  'Content-Type': 'application/pdf',
                  'Content-Disposition': 'attachment; filename="optimized.pdf"'
                },
              }));
            });
          });
        } else {
          try {
            const compressedPDF = readFileSync(tempOutput);
            console.log('✅ Ghostscript compression successful');
            
            resolve(new Response(compressedPDF, {
              headers: { 
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="compressed.pdf"'
              },
            }));
          } catch (readError) {
            resolve(NextResponse.json({ error: 'Compression failed' }, { status: 500 }));
          }
        }

        // Cleanup temporary files
        try { 
          unlinkSync(tempInput); 
          unlinkSync(tempOutput); 
        } catch(cleanError) {}
      });
    });

  } catch (error) {
    console.error('💥 Compression error:', error);
    return NextResponse.json({ error: 'Compression failed' }, { status: 500 });
  }
}