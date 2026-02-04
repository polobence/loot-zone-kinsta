import { useState, type ReactNode } from "react";
import styled from "@emotion/styled";
import {
  NotificationContext,
  type Notification,
  type NotificationType,
} from "./NotificationContext";

const Toast = styled.div<{ type: NotificationType }>`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  padding: 1rem 1.5rem;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: ${({ type }) => (type === "success" ? "#00b894" : "#d63031")};
  z-index: 1000;
`;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: NotificationType = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Toast type={notification.type}>{notification.message}</Toast>}
    </NotificationContext.Provider>
  );
}
