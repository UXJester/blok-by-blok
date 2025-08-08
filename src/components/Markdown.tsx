import { MarkdownProps } from '@/types/blokTypes';

const Markdown = ({ content, className = '' }: MarkdownProps) => {
  if (!content) {
    return null;
  }

  const renderMarkdownLine = (line: string, index: number) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={index} className="text-2xl font-semibold mb-4 mt-6">
          {line.replace('## ', '')}
        </h2>
      );
    }

    if (line.startsWith('# ')) {
      return (
        <h1 key={index} className="text-3xl font-bold mb-6 mt-8">
          {line.replace('# ', '')}
        </h1>
      );
    }

    if (line.trim() === '---') {
      return <hr key={index} className="border-gray-300 my-6" />;
    }

    if (line.startsWith('- **') && line.includes('**: ')) {
      const [, label, description] = line.match(/- \*\*(.*?)\*\*: (.*)/) || [];
      return (
        <div key={index} className="mb-2">
          <strong className="font-semibold">{label}</strong>: {description}
        </div>
      );
    }

    if (line.startsWith('- ')) {
      return (
        <li key={index} className="mb-1">
          {line.replace('- ', '')}
        </li>
      );
    }

    if (line.includes('*') && !line.startsWith('*')) {
      // Handle italic text
      const processedLine = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
      return (
        <p
          key={index}
          className="mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    }

    if (line.trim() === '') {
      return <br key={index} />;
    }

    return (
      <p key={index} className="mb-4 leading-relaxed">
        {line}
      </p>
    );
  };

  try {
    return (
      <div className={`markdown ${className} whitespace-pre-wrap`}>
        {content
          .split('\n')
          .map((line, index) => renderMarkdownLine(line, index))}
      </div>
    );
  } catch (error) {
    console.error('Error rendering markdown content:', error);
    return (
      <div className={`markdown ${className}`}>
        <p className="text-red-500">Error rendering content</p>
      </div>
    );
  }
};

export default Markdown;
