
interface CustomChatbotMessage {
    version: string;
    source: string;

    content: {
        textType?: string;
        description: string;
        title?: string;
        nextSteps?: string[];
        keywords?: string[];
    },

    /**
     * Used for custom actions, will not appear in message
     */
    metadata: {
        threadId?: string;
        summary?: string;
        eventType?: string;
        relatedResources?: string[];
        additionalContext?: {[key: string]: string};
    }
};

/**
 * A Chatbot message that can be sent to AWS Chatbot.
 * @see: {@link https://docs.aws.amazon.com/chatbot/latest/adminguide/custom-notifs.html}
 */
export class ChatbotMessage implements CustomChatbotMessage {
    content: {
        textType?: string;
        description: string;
        title?: string;
        nextSteps?: string[];
        keywords?: string[];
    }

    /**
     * Used for custom actions, will not appear in message
     */
    metadata: {
        threadId?: string;
        eventType?: string;
        summary?: string;
        relatedResources?: string[];
        additionalContext?: {[key: string]: string};
    };

    constructor(
        description: string, 
        public version: string = '1.0', 
        public source: string = 'custom') {

        this.content = {
            description: description
        }
    }
}

/**
 * A builder for creating Chatbot messages.
 * @see: {@link https://docs.aws.amazon.com/chatbot/latest/adminguide/custom-notifs.html}
 */
export class ChatbotMessageBuilder {

    private message: ChatbotMessage;

    constructor(description: string) {
        this.message = new ChatbotMessage(description);
    }

    public withTitle(title: string): ChatbotMessageBuilder {
        this.message.content.title = title;
        return this;
    }

    public addNextStep(step: string): ChatbotMessageBuilder {
        this.message.content.nextSteps = this.message.content.nextSteps || [];
        this.message.content.nextSteps.push(step);
        return this;
    }

    public addKeyword(keyword: string): ChatbotMessageBuilder {
        this.message.content.keywords = this.message.content.keywords || [];
        this.message.content.keywords.push(keyword);
        return this;
    }

    public withTextType(textType: undefined |'client-markdown'): ChatbotMessageBuilder {
        this.message.content.textType = textType;
        return this;
    }

    /**
     * Adds additional context to metadata used for custom actions, will not appear in message
     */
    public withThreadId(threadId: string): ChatbotMessageBuilder {
        this.message.metadata = this.message.metadata || {};
        this.message.metadata.threadId = threadId;
        return this;
    }

    /**
     * Adds additional context to metadata used for custom actions, will not appear in message
     */
    public withSummary(summary: string): ChatbotMessageBuilder {
        this.message.metadata = this.message.metadata || {};
        this.message.metadata.summary = summary;
        return this;
    }

    /**
     * Adds additional context to metadata used for custom actions, will not appear in message
     */
    public withEventType(eventType: string): ChatbotMessageBuilder {
        this.message.metadata = this.message.metadata || {};
        this.message.metadata.eventType = eventType;
        return this;
    }

    /**
     * Adds additional context to metadata used for custom actions, will not appear in message
     */
    public addRelatedResource(resource: string): ChatbotMessageBuilder {
        this.message.metadata = this.message.metadata || {};
        this.message.metadata.relatedResources = this.message.metadata.relatedResources || [];
        this.message.metadata.relatedResources.push(resource);
        return this;
    }


    /**
     * Adds additional context to metadata used for custom actions, will not appear in message
     */
    public addAdditionalContext(key: string, value: string) {
        this.message.metadata = this.message.metadata || {};
        this.message.metadata.additionalContext = this.message.metadata.additionalContext || {};
        this.message.metadata.additionalContext[key] = value;
        return this;
    }

    public build(): ChatbotMessage { return this.message;}
}