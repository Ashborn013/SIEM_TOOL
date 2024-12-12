// src/app/lib/session.js
// this code is used to create and delete session cookies using jwt 
import 'server-only'
import { SignJWT , jwtVerify } from 'jose'
import { cookies } from 'next/headers'
const secKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secKey)







export async function encrypt(payload) {
    
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey)
}

  
export async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return { userId: payload.userId, isAuth: true };
  } catch (error) {
    console.error("Invalid or expired token:", error.message);
    return { isAuth: false };
  }
}

export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId : userId, expiresAt })
   
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
}

export function deleteSession() {
    cookies().delete('session')
}
