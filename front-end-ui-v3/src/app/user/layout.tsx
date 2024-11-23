import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ToastListener } from "@/components/toast-listen";
import { AlertComponent } from "@/components/AlertComponent";
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <AlertComponent/>
        {children}
        {/* <SidebarTrigger /> */}
        <ToastListener/>

      </main>
    </SidebarProvider>
  )
}
