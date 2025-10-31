import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Missing PDF file' }, { status: 400 });
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempInput = path.join(os.tmpdir(), file.name);
    const tempOutput = path.join(os.tmpdir(), `compressed-${file.name}`);

    fs.writeFileSync(tempInput, buffer);

    // Ghostscript command for compression
    const command = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${tempOutput}" "${tempInput}"`;

    await new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    const compressed = fs.readFileSync(tempOutput);
    fs.unlinkSync(tempInput);
    fs.unlinkSync(tempOutput);

    return new NextResponse(compressed, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=compressed-${file.name}`,
      },
    });
  } catch (error) {
    console.error('Compression Error:', error);
    return NextResponse.json({ error: 'Failed to compress PDF' }, { status: 500 });
  }
}
