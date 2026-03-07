import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Force cache invalidation on Vercel - next.js bug with deleted exports
export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    // Server-side check - Not visible to client
    if (password === 'deniz2024') {
        // Set HTTP-only cookie
        cookies().set('admin_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
}


