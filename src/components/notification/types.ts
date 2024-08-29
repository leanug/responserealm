// src/features/notification/types.ts
export type NotificationType = 'error' | 'info' | 'success' | 'warning';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
