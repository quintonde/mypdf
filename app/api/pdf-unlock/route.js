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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempInput = path.join(os.tmpdir(), file.name);
    const tempOutput = path.join(os.tmpdir(), `unlocked-${file.name}`);

    fs.writeFileSync(tempInput, buffer);

    const command = `qpdf --password=${password} --decrypt "${tempInput}" "${tempOutput}"`;

    await new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(new Error("Incorrect password or decryption failed"));
        } else {
          resolve();
        }
      });
    });

    const unlockedBuffer = fs.readFileSync(tempOutput);
    fs.unlinkSync(tempInput);
    fs.unlinkSync(tempOutput);

    return new NextResponse(unlockedBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="unlocked-${file.name}"`,
      },
    });
  } catch (error) {
    console.error("QPDF Error:", error);
    return NextResponse.json({ error: 'Wrong password! Please try again.' }, { status: 500 });
  }
}
