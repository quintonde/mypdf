import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const fileName = `pdf_${Date.now()}.pdf`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create uploads directory if it doesn't exist
    try {
      await writeFile(path.join(uploadsDir, fileName), Buffer.from(buffer));
    } catch (error) {
      return Response.json({ error: 'Failed to save file' }, { status: 500 });
    }

    return Response.json({ 
      success: true, 
      fileName: fileName 
    });
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}