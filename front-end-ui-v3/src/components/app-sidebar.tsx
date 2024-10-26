"use client";
import {
  Calendar,
  Inbox,
  Search,
  Settings,
  User,
  ClipboardPlus,
  CreditCard,
  LogOut,
  MoreHorizontal,
  Tags,
  Trash,
  SunMoon,
  Sun,
  Moon,
} from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes"
import {logout} from "@/actions/authActions"
// Menu items.
const items = [
  {
    title: "Report",
    url: "/user/report",
    icon: ClipboardPlus,
  },
  {
    title: "Risk",
    url: "/user/risk",
    icon: Inbox,
  },
  {
    title: "Scans",
    url: "/user/scans",
    icon: Calendar,
  },
  {
    title: "targets",
    url: "/user/targets",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export function AppSidebar() {

  return (
    <Sidebar side="left" variant="floating">
      <SidebarContent>
        <SidebarHeader />
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon
                    className="h-4 w-4"
                    color="var(--icon-custome-color)"
                  />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                {/* <User className="h-4 w-4"color="var(--icon-custome-color)" /> */}
                {/* <span>Profile</span> */}
                {/* <DropDownMenuForProfile /> */}
                <ComboboxDropdownMenu />
                {/* <ThemeToggle/> */}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function DropDownMenuForProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 p-2 flex-wrap"
        >
          <User className="h-4 w-4" color="var(--icon-custome-color)" />
          <span>Profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 dark:bg-neutral-900 shadow-lg rounded-md">
        <DropdownMenuLabel className="font-semibold text-gray-700">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem className="flex items-center space-x-2 p-2 rounded-md ">
          <User className="h-4 w-4" color="var(--icon-custome-color)" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2 p-2 rounded-md">
          <Settings className="h-4 w-4" color="var(--icon-custome-color)" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-2 p-2  rounded-md">
          <CreditCard className="h-4 w-4" color="var(--icon-custome-color)" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem className="flex items-center space-x-2 p-2  rounded-md">
          <LogOut className="h-4 w-4" color="var(--icon-custome-color)" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

function ComboboxDropdownMenu() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme()

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex justify-between items-center w-full"
        >
          <User className="h-4 w-4" color="var(--icon-custome-color)" />
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Settings color="var(--icon-custome-color)" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon color="var(--icon-custome-color)" />
              <span>Theams</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun color="var(--icon-custome-color)" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon color="var(--icon-custome-color)" />
                  <span>Dark</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full flex justify-start" onClick={
            ()=>{
                logout()
            }
          }>
            <LogOut color="var(--icon-custome-color)" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
