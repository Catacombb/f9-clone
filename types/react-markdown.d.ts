declare module 'react-markdown' {
  import { ReactNode, ReactElement } from 'react';
  
  interface ReactMarkdownProps {
    children: string;
    className?: string;
    [key: string]: any;
  }
  
  export default function ReactMarkdown(props: ReactMarkdownProps): ReactElement;
} 