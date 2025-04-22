"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Rocket,
  Boxes,
  Wrench,Shield,Box
} from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import SideBarUser from "./sidebar-user";

const navigationItems = [
  {
    title: "Main",
    icon: <Box className="w-4 h-4" />,
    items: [
      { name: "Dashboard", href: "/user/dashboard" },
      { name: "Report", href: "/user/report" },
      { name: "Machines", href: "/user/machines" },

    ]
  },
  {
    title: "Documentation",
    icon: <Boxes className="w-4 h-4" />,
    items: [
      { name: "Introduction", href: "#" },
      { name: "Get Started", href: "#" },
      { name: "Tutorials", href: "#" },
      { name: "Changelog", href: "#" },

    ]
  },
  {
    title: "Settings",
    icon: <Wrench className="w-4 h-4" />,
    items: [
      { name: "Theme", href: "#" },
      { name: "General", href: "#" },
      { name: "Config", href: "#" },

    ]
  }
];

export default function Sidebar() {
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>("Getting Started");

  const toggleSection = (sectionTitle: string) => {
    setExpandedSection(current => current === sectionTitle ? null : sectionTitle);
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 h-screen bg-background text-foreground/60 p-4 flex flex-col"
    >
      <div className="mb-6 flex items-center gap-2">
        <span className="text-foreground font-semibold text-xl ">Some SID</span>
        
      </div>

      <nav className="flex-1 space-y-6">
        {navigationItems.map((section) => (
          <div key={section.title} className="space-y-1">
            <Button
              className="w-full flex items-center justify-between px-2 py-2  hover:text-foreground group"
              variant="light"
              onPress={() => toggleSection(section.title)}
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span className="text-sm font-medium">{section.title}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedSection === section.title ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {expandedSection === section.title && (
              <div className="ml-6 space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.name}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-foreground/90 hover:text-foreground"
                    variant="light"
                    onPress={() => router.push(item.href)}
                  >
                    <span>{item.name}</span>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-4">
        <SideBarUser />
      </div>
    </motion.aside>
  );
}
