// app/providers.tsx
"use client";
import { useRouter } from "next/navigation";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import Sidebar from "@/components/sidebar-props/sidebar-main";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <HeroUIProvider navigate={router.push}>
      <ReactQueryProvider>
        <ToastProvider />
        {children}
      </ReactQueryProvider>
    </HeroUIProvider>
  );
}
