import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { verifySession } from './lib/dal';

export async function middleware(request: Request) {
    const allCookies = cookies();
    const sessionCookie = allCookies.get('session')

    const session = await verifySession();
    console.log('midd',session)
    if (session.isAuth == false) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next();
}

export const config = {
    matcher: '/user/:path*',
}



