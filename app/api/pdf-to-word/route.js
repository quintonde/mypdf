import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const fileName = body.fileName;

    if (!fileName) throw new Error("File name is missing!");

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    const outputFileName = fileName.replace(/\.pdf$/i, ".docx");
    const outputPath = path.join(uploadsDir, outputFileName);

    // Simulate conversion (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create demo Word file
    const demoContent = "This is a demo Word file. For real PDF to Word conversion, you need to implement a proper conversion service.";
    await writeFile(outputPath, demoContent);

    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: `/uploads/${outputFileName}`,
        message: "Demo version - Real conversion requires advanced setup"
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