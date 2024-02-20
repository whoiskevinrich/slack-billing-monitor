/**
 * A Chatbot message that can be sent to AWS Chatbot.
 * @see: {@link https://docs.aws.amazon.com/chatbot/latest/adminguide/custom-notifs.html}
 */
export interface ChatbotMessage { 
    version: string;
    source: string;
    id?: string;
    content: {
        title?: string;
        description: string;
    }
    metadata?: {
        eventType?: string;
        relatedResources?: string[];
        additionalContext?: {[key: string]: string}[];
    }
}

/**
 * A builder for creating Chatbot messages.
 * @see: {@link https://docs.aws.amazon.com/chatbot/latest/adminguide/custom-notifs.html}
 */
export class ChatbotMessageBuilder {
    private message: ChatbotMessage;

    constructor(description: string) {
        this.message = {
            version: "1.0",
            source: "custom",
            content: {
                description
            }
        }
    }

    public withTitle(title: string) {
        this.message.content.title = title;
        return this;
    }

    public withId(id: string) {
        this.message.id = id;
        return this;
    }

    public withEventType(eventType: string) {
        this.message.metadata ??= {};
        this.message.metadata.eventType = eventType;
    }

    public addRelatedResource(resource: string) {
        this.message.metadata ??= {};
        this.message.metadata.relatedResources ??= [];
        this.message.metadata.relatedResources.push(resource);
    }

    public addAdditionalContext(key: string, value: string) {
        this.message.metadata ??= {};
        this.message.metadata.additionalContext ??= [];
        this.message.metadata.additionalContext.push({[key]: value});
    }

    public build() {
        return this.message;
    }
}