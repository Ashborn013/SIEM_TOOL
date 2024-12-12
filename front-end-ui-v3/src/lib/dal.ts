// src/app/lib/dal.js 
// this code is used to verify the session cookie and redirect the user to the login page if the session is invalid
import 'server-only' 
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'

 
 
export async function verifySession() {
  try {
    const cookie = (await cookies()).get('session')?.value;

    if (!cookie) {
      console.warn("Session cookie not found.");
      return { isAuth: false, userId: null };
    }

    const session = await decrypt(cookie);
    console.log(session,session.userId)


    if (!session || !session.userId) {
      console.warn("Invalid or expired session.");
      return { isAuth: false, userId: null };
    }

    return { isAuth: true, userId: session.userId };
  } catch (error) {
    console.error("Error during session verification:", error.message);
    return { isAuth: false, userId: null };
  }
}