import { MarkdownProps } from '@/types/blokTypes';

const Markdown = ({ content, className = '' }: MarkdownProps) => {
  if (!content) {
    return null;
  }

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Check if this starts a list
      if (line.startsWith('- ')) {
        const listItems: React.ReactElement[] = [];
        let listIndex = 0;

        // Collect all consecutive list items
        while (i < lines.length && lines[i].startsWith('- ')) {
          const listLine = lines[i];

          // Handle bold list items like "- **Label**: Description"
          if (listLine.startsWith('- **') && listLine.includes('**: ')) {
            const match = listLine.match(/- \*\*(.*?)\*\*: (.*)/);
            if (match) {
              const [, label, description] = match;
              listItems.push(
                <li key={listIndex} className="mb-2">
                  <strong className="font-semibold">{label}</strong>:{' '}
                  {description}
                </li>
              );
            }
          } else {
            // Regular list item
            listItems.push(
              <li key={listIndex} className="mb-1">
                {listLine.replace('- ', '')}
              </li>
            );
          }

          listIndex++;
          i++;
        }

        elements.push(
          <ul key={elements.length} className="list-disc pl-6 mb-4">
            {listItems}
          </ul>
        );
        continue;
      }

      // Handle other line types
      const element = renderMarkdownLine(line, elements.length);
      if (element) {
        elements.push(element);
      }
      i++;
    }

    return elements;
  };

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

    if (
      line.match(/\*[^*]+\*/) &&
      !line.startsWith('*') &&
      !line.startsWith('- *')
    ) {
      // Handle italic text safely - only process proper *italic* patterns
      const parts = line.split(/(\*[^*]+\*)/);
      return (
        <p key={index} className="mb-4 leading-relaxed">
          {parts.map((part, partIndex) => {
            if (part.match(/^\*[^*]+\*$/)) {
              return <em key={partIndex}>{part.slice(1, -1)}</em>;
            }
            return part;
          })}
        </p>
      );
    }

    if (line.trim() === '') {
      return null;
    }

    return (
      <p key={index} className="mb-4 leading-relaxed">
        {line}
      </p>
    );
  };

  try {
    return (
      <div className={`markdown ${className}`}>{renderMarkdown(content)}</div>
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
