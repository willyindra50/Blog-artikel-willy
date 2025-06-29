interface LexicalTextNode {
  text: string;
}

interface LexicalNode {
  children?: LexicalTextNode[];
  type?: string;
}

export const parseLexicalContent = (
  content: string,
  limit?: number
): string => {
  if (!content) return 'No content available.';

  try {
    const parsed = JSON.parse(content);
    const nodes = parsed?.root?.children as LexicalNode[] | undefined;

    if (nodes && Array.isArray(nodes)) {
      const lines: string[] = [];

      for (const node of nodes) {
        if (Array.isArray(node.children)) {
          const line = node.children
            .map((child) => child.text)
            .filter(Boolean)
            .join('');
          if (line) lines.push(line);
        }
      }

      const fullText = lines.join('\n').trim();

      if (limit) {
        return (
          fullText.slice(0, limit) + (fullText.length > limit ? '...' : '')
        );
      }

      return fullText;
    }
  } catch {
    // fallback HTML
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const text = tempDiv.textContent || tempDiv.innerText || '';
  const trimmed = text.trim();

  if (limit) {
    return trimmed.slice(0, limit) + (trimmed.length > limit ? '...' : '');
  }

  return trimmed || 'No text content.';
};
