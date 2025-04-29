"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

interface NotificationModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

async function fetchNotifications() {
  // Simulate network delay
  const res = await fetch("http://127.0.0.1:223/notifications");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

function NotificationItem({ notification }: { notification: any }) {
  return (
    <div className="rounded-md bg-muted p-3 mb-2 flex flex-col gap-1">
      <div className="font-medium text-primary">
        {notification.title ?? "Notification"}
      </div>
      <div className="text-sm text-foreground">{notification.content}</div>
      {notification.time && (
        <div className="text-xs text-muted-foreground">
          {new Date(notification.time * 1000).toLocaleString()}
        </div>
      )}
    </div>
  );
}

export default function NotificationModal({
  isOpen,
  onOpenChange,
}: NotificationModalProps) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    enabled: isOpen,
  });
  const last10 = data ? data.slice(-10).reverse() : [];

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Notifications
            </ModalHeader>
            <ModalBody>
              {/* <p>Recent notifications will appear here.</p> */}
              {isLoading ? (
                <span className="text-muted-foreground text-sm">
                  Loading...
                </span>
              ) : error ? (
                <span className="text-destructive text-sm">
                  Failed to load notifications.
                </span>
              ) : last10.length === 0 ? (
                <span className="text-muted-foreground text-sm">
                  No notifications found.
                </span>
              ) : (
                last10.map((noti: any) => (
                  <NotificationItem notification={noti} key={noti._id} />
                ))
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Close
              </Button>
              {/* <Button color="primary" onPress={onClose}>
                Mark all as read
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
