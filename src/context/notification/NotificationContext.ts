import { createContext } from "react";

export type NotificationType = "success" | "error";

export interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {
    throw new Error("NotificationContext not initialized");
  },
});
