Notification Abstraction:
- Create an INotificationService interface and implement SlackNotificationService, etc.
Cost Fetching Abstraction:
- Create an ICostFetcher interface for AWS and possible future sources.
Formatting:
- Move formatting logic (e.g., currency, percent) into utility classes or services.