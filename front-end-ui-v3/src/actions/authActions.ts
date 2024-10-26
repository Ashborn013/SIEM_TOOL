'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createSession , deleteSession } from '@/lib/session'
import {fetchUsers} from '@/lib/db'
import crypto from 'crypto';

export async function handleSubmit(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('passworddata')
  
  
  if (!username || !password) {
    return { success: false, error: 'Username and password are required' }
  }

  try {
    let isIt = await validateUserNamePassword(username,password)

    if (isIt) {

      createSession(username as string)

      return { success: true }
    } else {
      return { success: false, error: 'Invalid username or password' }
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function logout() {
  deleteSession()
  redirect('/login')
}


async function validateUserNamePassword(username, password): Promise<boolean> {
  const rowsOfUsers = await fetchUsers();
  
  for (const data of rowsOfUsers) {
    const usernamef = data.name;
    const passwordf = data.password;
    
    if (usernamef === username) {
      const hashp1 = crypto.createHash('sha256').update(password).digest('hex');
      const hashp2 = crypto.createHash('sha256').update(passwordf).digest('hex');
      
      if (hashp1 === hashp2) {
        return true;
      }
    }
  }

  return false;
}