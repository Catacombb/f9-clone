'use client';

import React from 'react';

// A very simple markdown renderer for basic formatting
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
  // Process the markdown text
  const processText = (input: string): React.ReactNode => {
    if (!input) return null;
    
    // Bold text - replace **text** with <strong>text</strong>
    const boldText = input.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Process lists - replace '- item' with list items
    const withLists = boldText.replace(/- (.*?)(?:\n|$)/g, '<li>$1</li>');
    
    // Wrap lists in ul tags if there are list items
    const withListWrapping = withLists.includes('<li>') 
      ? withLists.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>') 
      : withLists;
    
    // Process paragraphs - split by newlines and wrap in p tags
    const paragraphs = withListWrapping
      .split('\n\n')
      .map((para, index) => {
        if (para.trim() === '') return null;
        if (para.includes('<ul>')) return <div key={index} dangerouslySetInnerHTML={{ __html: para }} />;
        return <p key={index} dangerouslySetInnerHTML={{ __html: para }} />;
      });
    
    return <>{paragraphs}</>;
  };
  
  return <div className="simple-markdown">{processText(text)}</div>;
};

export default SimpleMarkdown; 