declare module '@chatui/core' {
  import { ReactNode, ReactElement, ComponentType } from 'react';

  export interface MessageProps {
    type: string;
    content: any;
    position?: 'left' | 'right' | 'center';
    user?: {
      avatar?: string;
      name?: string;
    };
    hasTime?: boolean;
    [key: string]: any;
  }

  export interface ChatProps {
    navbar?: {
      title?: string;
      [key: string]: any;
    };
    messages: MessageProps[];
    renderMessageContent: (message: MessageProps) => ReactNode;
    onSend: (type: string, content: string) => void;
    placeholder?: string;
    locale?: string;
    loadMoreText?: string;
    isTyping?: boolean;
    [key: string]: any;
  }

  export interface BubbleProps {
    type?: string;
    content?: string | ReactNode;
    children?: ReactNode;
    className?: string;
    [key: string]: any;
  }

  export interface UseMessagesResult {
    messages: MessageProps[];
    appendMsg: (message: MessageProps) => void;
    updateMsg: (id: string, message: Partial<MessageProps>) => void;
    deleteMsg: (id: string) => void;
    resetList: () => void;
    setTyping: (typing: boolean) => void;
    prependMsgs: (messages: MessageProps[]) => void;
  }

  export function useMessages(initialMessages?: MessageProps[]): UseMessagesResult;
  
  export const Bubble: ComponentType<BubbleProps>;
  
  const Chat: ComponentType<ChatProps>;
  export default Chat;
} 