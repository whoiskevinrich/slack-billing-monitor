/**
 * SlackNotificationService implements INotificationService for sending messages to Slack.
 */
import { INotificationService } from './INotificationService';

export class SlackNotificationService implements INotificationService {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
  }

  async send(message: string, subject?: string): Promise<void> {
    const payload = {
      text: subject ? `*${subject}*\n${message}` : message,
    };
    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }
}
