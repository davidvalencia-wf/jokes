import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface CloudflareEnv {
  R2: R2Bucket;
}

export async function POST(request: NextRequest) {
  const env = process.env as unknown as CloudflareEnv;
  const r2 = env.R2;

  if (!r2) {
    return NextResponse.json({ error: 'R2 storage not available' }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 });
  }

  const uploaded: { key: string; size: number; type: string }[] = [];

  for (const [fieldName, value] of formData.entries()) {
    if (!(value instanceof File)) continue;

    const file = value as File;
    const key = `${Date.now()}-${file.name}`;
    const arrayBuffer = await file.arrayBuffer();

    await r2.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type || 'application/octet-stream' },
    });

    uploaded.push({ key, size: file.size, type: file.type });
  }

  if (uploaded.length === 0) {
    return NextResponse.json({ error: 'No files found in request' }, { status: 400 });
  }

  return NextResponse.json({ success: true, uploaded }, { status: 200 });
}
