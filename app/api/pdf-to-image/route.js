import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import JSZip from 'jszip';

export const POST = async (req) => {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // PDF file ka temp path
    const pdfPath = join(process.cwd(), 'input.pdf');
    await writeFile(pdfPath, buffer);

    // Output folder path
    const outputDir = join(process.cwd(), 'output_images');

    // Full Poppler executable path (apna path confirm kar lena)
    const popplerPath = `"C:\\\\poppler-24.08.0\\\\Library\\\\bin\\\\pdftoppm.exe"`;

    // Convert PDF pages to JPG images
    await new Promise((resolve, reject) => {
      exec(`${popplerPath} -jpeg "${pdfPath}" "${join(outputDir, 'page')}"`, (error) => {
        if (error) {
          console.error('Error during conversion:', error);
          reject(error);
        } else {
          resolve();
        }
      });
    });

    // ZIP file create karna
    const zip = new JSZip();
    const fs = await import('fs/promises');
    const files = await fs.readdir(outputDir);

    for (const fileName of files) {
      const fileData = await fs.readFile(join(outputDir, fileName));
      zip.file(fileName, fileData);
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=images.zip',
      },
    });

  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 });
  }
};
