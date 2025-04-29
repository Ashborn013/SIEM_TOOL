"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { UserRoundPen, Settings, LogOut, BellIcon } from "lucide-react";
import NotificationModal from "./notification-modal";
import { authClient } from "@/lib/auth-client";

export default function SideBarUser() {
  const router = useRouter();
  const [userName, setuserName] = useState<string>("Username");
  const [email, setemail] = useState<string>("user@example.com");
  const [profilePic, setprofilePic] = useState<string>(
    "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  );
  const notificationModal = useDisclosure();
  useEffect(() => {
    async function getInfon() {
      const { data: session } = await authClient.getSession();
      if (!session) {
        return;
      }
      setuserName(session.user.name);
      setemail(session.user.email);
      setprofilePic(
        session.user.image ?? "https://i.pravatar.cc/150?u=a042581f4e29026024d"
      );
    }
    getInfon();
  });

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="w-full flex items-center justify-start gap-4 px-4 py-4 text-sm text-foreground/0.80 hover:text-foreground h-16"
            variant="ghost"
            startContent={<Avatar src={profilePic} size="sm" />}
            endContent={
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-foreground/60">{email}</span>
              </div>
            }
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User actions"
          onAction={(key) => {
            if (key === "notifications") {
              notificationModal.onOpen();
            }
          }}
        >
          {/* <DropdownItem
            key="profile"
            startContent={<UserRoundPen className="w-4 h-4" />}
            description="Edit your profile"
          >
            Profile
          </DropdownItem>
          <DropdownItem
            key="settings"
            startContent={<Settings className="w-4 h-4" />}
            description="Tweak your settings"
          >
            Settings
          </DropdownItem> */}
          <DropdownItem
            key="notifications"
            startContent={<BellIcon className="w-4 h-4" />}
            description="Your recent notifications"
          >
            Notifications
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-danger"
            color="danger"
            startContent={<LogOut className="w-4 h-4" />}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <NotificationModal
        isOpen={notificationModal.isOpen}
        onOpenChange={notificationModal.onOpenChange}
      />
    </>
  );
}
