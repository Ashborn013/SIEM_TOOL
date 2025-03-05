'use client'
import React, { useEffect } from 'react'
import { authClient } from '@/lib/auth-client'
import { AppSidebar } from '@/components/custom/sidebar-props/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await authClient.getSession()
      // console.log(data)
    }
    fetchData()
  }, [])
  return (
    <div>
      page
    </div>
  )
}
