import { PDFDocument } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fileName, rotation } = body;

    if (!fileName) throw new Error("File name is missing!");
    if (!rotation) throw new Error("Rotation angle is missing!");

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const inputPath = path.join(uploadsDir, fileName);
    
    // Read the PDF file
    const pdfBytes = await readFile(inputPath);
    
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Get all pages
    const pages = pdfDoc.getPages();
    
    // Rotate each page
    pages.forEach(page => {
      page.setRotation(page.getRotation().angle + rotation);
    });
    
    // Save the rotated PDF
    const rotatedPdfBytes = await pdfDoc.save();
    const outputFileName = `rotated_${fileName}`;
    const outputPath = path.join(uploadsDir, outputFileName);
    
    await writeFile(outputPath, rotatedPdfBytes);

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: `/uploads/${outputFileName}`,
        message: `PDF successfully rotated by ${rotation} degrees`
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}