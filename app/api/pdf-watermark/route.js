import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fileName, watermarkText } = body;

    if (!fileName) throw new Error("File name is missing!");
    if (!watermarkText) throw new Error("Watermark text is missing!");

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const outputFileName = `watermarked_${fileName}`;
    const outputPath = path.join(uploadsDir, outputFileName);

    // Simulate watermark process (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create demo watermarked PDF file
    const demoContent = `This is a demo watermarked PDF file. 
Original: ${fileName}
Watermark Text: ${watermarkText}
Real watermark requires PDF processing library.`;
    
    await writeFile(outputPath, demoContent);

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: `/uploads/${outputFileName}`,
        message: `PDF watermarked with "${watermarkText}" (Demo)`
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