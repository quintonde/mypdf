import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
process.env.PATH += ';C:\\Program Files\\LibreOffice\\program';

const execPromise = promisify(exec);

export const POST = async (req) => {
  try {
    // 🧩 File receive karo
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 🧾 Paths setup
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadPath = join(process.cwd(), 'uploads');
    const inputPath = join(uploadPath, file.name);
    const outputPath = inputPath.replace(/\.(doc|docx)$/i, '.pdf');

    // 📂 Folder banana (agar missing hai)
    await import('fs').then(fs => {
      if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    });

    // 💾 Save input Word file
    await writeFile(inputPath, buffer);

    // 🧠 Convert using LibreOffice (CLI)
    const command = `soffice --headless --convert-to pdf "${inputPath}" --outdir "${uploadPath}"`;
    await execPromise(command);

    // 📤 PDF bhejna as response
    const pdfBuffer = await import('fs/promises').then(fs => fs.readFile(outputPath));
    const response = new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${file.name.replace(/\.(doc|docx)$/i, '.pdf')}"`,
      },
    });

    // 🧹 Cleanup (delete temp files)
    await unlink(inputPath);
    await unlink(outputPath);

    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
};
