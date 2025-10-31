import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');
    const password = data.get('password');

    if (!file || !password) {
      return NextResponse.json({ error: 'Missing file or password' }, { status: 400 });
    }

    // Save uploaded file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempInput = path.join(os.tmpdir(), file.name);
    const tempOutput = path.join(os.tmpdir(), `protected-${file.name}`);

    fs.writeFileSync(tempInput, buffer);

    // Run qpdf command
    const command = `qpdf --encrypt ${password} ${password} 256 -- "${tempInput}" "${tempOutput}"`;
    console.log("Running command:", command);

    await new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("QPDF error:", stderr);
          reject(error);
        } else {
          console.log("QPDF success:", stdout);
          resolve();
        }
      });
    });

    const protectedBuffer = fs.readFileSync(tempOutput);

    // Clean up temp files
    fs.unlinkSync(tempInput);
    fs.unlinkSync(tempOutput);

    return new NextResponse(protectedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=protected-${file.name}`,
      },
    });

  } catch (error) {
    console.error("Error protecting PDF:", error);
    return NextResponse.json({ error: 'Failed to protect PDF' }, { status: 500 });
  }
}
