/**
 * Abstraction for sending notifications to any channel (Slack, Email, etc).
 */
export interface INotificationService {
  /**
   * Send a message to the notification channel.
   * @param message The message to send.
   * @param subject Optional subject/title for the message.
   */
  send(message: string, subject?: string): Promise<void>;
}
