import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique name
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.' + file.name.split('.').pop();

  // Save to public/uploads
  const path = join(process.cwd(), 'public/uploads', filename);
  await writeFile(path, buffer);

  return NextResponse.json({ success: true, url: `/uploads/${filename}` });
}
