import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const user: any = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })

    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin') && !user?.token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    if (pathname === '/admin') {
        return NextResponse.rewrite(new URL('/admin/dashboard', request.url))
    }

    if (pathname === '/auth' && !!user?.token) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/auth/:path*', '/admin/:path*'],
}