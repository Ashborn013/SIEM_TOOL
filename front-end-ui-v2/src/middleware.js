import { NextResponse } from 'next/server'

export function middleware(request) {
    const {cookies} = request;
    const userLogin = cookies.get("user");
    if (!userLogin){
        return NextResponse.redirect(new URL('/login',request.url))
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/user/:path*',
}