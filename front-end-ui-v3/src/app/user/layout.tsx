import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {children}
        {/* <SidebarTrigger /> */}

      </main>
    </SidebarProvider>
  )
}
