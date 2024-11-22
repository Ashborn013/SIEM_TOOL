import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ToastListener } from "@/components/toast-listen";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {children}
        {/* <SidebarTrigger /> */}
        <ToastListener/>

      </main>
    </SidebarProvider>
  )
}
