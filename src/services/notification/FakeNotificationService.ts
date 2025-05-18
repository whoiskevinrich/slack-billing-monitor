/**
 * FakeNotificationService implements INotificationService for testing and development.
 * It logs messages to the console instead of sending real notifications.
 */
import { INotificationService } from './INotificationService';

export class FakeNotificationService implements INotificationService {
  async send(message: string, subject?: string): Promise<void> {
    if (subject) {
      console.log(`[FakeNotificationService] Subject: ${subject}`);
    }
    console.log(`[FakeNotificationService] Message: ${message}`);
  }
}
