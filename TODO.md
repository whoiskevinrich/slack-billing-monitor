Formatting:
- Move formatting logic (e.g., currency, percent) into utility classes or services.

1. Report Building Abstraction
Why: Decouple the process of building cost reports from specific data sources or formats.
How: Create an IReportBuilder interface. Implement for different report types (e.g., daily, weekly, service breakdown).
2. Message Formatting Abstraction
Why: Separate formatting logic (Slack, email, plain text, etc.) from business logic.
How: Create an IMessageFormatter interface. Implement for Slack, email, etc. This allows easy changes to message structure or output channel.
3. Environment/Configuration Abstraction
Why: Centralize and abstract environment/configuration access (env vars, secrets, etc.) for testability and maintainability.
How: Create an IConfigProvider interface. Implement for environment variables, AWS SSM, or other config sources.
4. Logging Abstraction
Why: Decouple logging from console or specific logging libraries, and allow for easier testing and log routing.
How: Create an ILogger interface. Implement for console, structured logging, or external log aggregators.
5. Error Handling/Notification Abstraction
Why: Centralize error handling and optionally notify on errors (e.g., via Slack, email, etc.).
How: Create an IErrorNotifier interface. Implement for Slack, email, or other alerting systems.
6. Data Storage Abstraction (if applicable)
Why: If you persist any data (e.g., cost history, reports), abstract the storage layer.
How: Create an IDataStore interface. Implement for DynamoDB, S3, or other storage backends.
7. Scheduling/Trigger Abstraction (if applicable)
Why: If your system supports different trigger mechanisms (EventBridge, cron, manual), abstract the trigger logic.
How: Create an ITriggerHandler interface. Implement for each trigger type.