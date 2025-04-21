"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";

// Mock async fetch (replace with real API if available)
async function fetchNotifications() {
    // Simulate network delay
    const res = await fetch("http://127.0.0.1:223/notifications")
    if (!res.ok) {
      throw new Error("Network response was not ok")
    }
    return res.json()
  
  }
  
function NotificationItem({ notification }: { notification: any }) {
    return (
        <div className="rounded-md bg-muted p-3 mb-2 flex flex-col gap-1">
            <div className="font-medium text-primary">{notification.title ?? "Notification"}</div>
            <div className="text-sm text-foreground">{notification.content}</div>
            {notification.time && (
                <div className="text-xs text-muted-foreground">{new Date(notification.time * 1000).toLocaleString()}</div>
            )}
        </div>
    );
}

export function NotificationsAlert() {
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["notifications"],
        queryFn: fetchNotifications,
        enabled: isOpen,
    });

    const last10 = data ? data.slice(-10).reverse() : [];

    // Prevent outside dropdown closing
    const handleDialogClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <>
            <button
                className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent transition focus:outline-none"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                    refetch();
                }}
                aria-label="Notifications"
                type="button"
            >
                <Bell className="size-4" />
                <span>Notifications</span>
                {Boolean(data && data.length) && (
                    <span className="ml-1 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-background" />
                )}
            </button>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent
                    className="max-w-sm focus:outline-none"
                    onClick={handleDialogClick}
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Notifications</AlertDialogTitle>
                        <AlertDialogDescription>
                            Here are your latest notifications
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex flex-col gap-2 min-h-[100px] max-h-72 overflow-y-auto my-2">
                        {isLoading ? (
                            <span className="text-muted-foreground text-sm">Loading...</span>
                        ) : error ? (
                            <span className="text-destructive text-sm">Failed to load notifications.</span>
                        ) : last10.length === 0 ? (
                            <span className="text-muted-foreground text-sm">No notifications found.</span>
                        ) : (
                            last10.map((noti : any) => (
                                <NotificationItem notification={noti} key={noti._id} />
                            ))
                        )}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>
                            Close
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}