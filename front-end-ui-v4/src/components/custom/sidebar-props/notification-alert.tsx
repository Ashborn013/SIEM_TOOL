
"use client"

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

export function NotificationsAlert() {
    const [isOpen, setIsOpen] = useState(false); // Control modal state manually

    const handleDialogClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents dropdown from closing
    };

    return (
        <>
                <Bell className="size-5" />
            {/* Prevent dropdown from closing when clicking this button */}
            <button
                className="flex items-center gap-2"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent dropdown from closing
                    setIsOpen(true);
                }}
            >
                <span>Notifications</span>
            </button>

            {/* Controlled Dialog */}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent className="focus:outline-none" onClick={handleDialogClick}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => setIsOpen(false)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
