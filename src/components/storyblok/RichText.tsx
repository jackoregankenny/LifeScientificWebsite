import { ISbRichtext, renderRichText } from '@storyblok/react';

interface RichTextProps {
  document: ISbRichtext;
  className?: string;
}

const RichText = ({ document, className = '' }: RichTextProps) => {
  if (!document) return null;

  const content = renderRichText(document);
  if (!content) return null;

  return (
    <div 
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichText; 