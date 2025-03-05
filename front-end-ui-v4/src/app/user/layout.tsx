"use client"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/custom/sidebar-props/app-sidebar"
import { ReactNode, useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { getUserInfoForSIdeBar } from '@/app/user/getuserinfo'
import { authClient } from "@/lib/auth-client";

type User = {

  name: string;
  email: string;
  avatar: string;
};

export default function Layout({ children }: { children: ReactNode }) {
  const [userValue, userValueSet] = useState<User>({ email: "", name: "", avatar: ""  });

  useEffect(() => {
    const getInfoCall = async () => {
      const data = await getUserInfoForSIdeBar() as User;
      userValueSet(data);
    };
    getInfoCall();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar user={userValue} />
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <main>
        {children}
      </main>
    </SidebarProvider>
  );
}
