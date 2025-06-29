import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode } from '@lexical/rich-text';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useState } from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Unlink,
  Image as ImageIcon,
  Maximize,
} from 'lucide-react';

export default function LexicalToolbar() {
  const [editor] = useLexicalComposerContext();
  const [heading, setHeading] = useState<'h1' | 'h2'>('h1');

  const formatHeading = (tag: 'h1' | 'h2') => {
    setHeading(tag);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(tag));
      }
    });
  };

  const formatText = (formatType: 'bold' | 'italic' | 'strikethrough') => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  const formatList = (type: 'bullet' | 'number') => {
    if (type === 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const alignText = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  return (
    <div className='flex flex-wrap items-center gap-3 border rounded-xl px-6 py-3 mb-4 bg-white shadow-sm'>
      <select
        value={heading}
        onChange={(e) => formatHeading(e.target.value as 'h1' | 'h2')}
        className='text-sm border px-3 py-1 rounded-md'
      >
        <option value='h1'>Heading 1</option>
        <option value='h2'>Heading 2</option>
      </select>
      <button onClick={() => formatText('bold')}>
        <Bold className='w-5 h-5' />
      </button>
      <button onClick={() => formatText('strikethrough')}>
        <Strikethrough className='w-5 h-5' />
      </button>
      <button onClick={() => formatText('italic')}>
        <Italic className='w-5 h-5' />
      </button>
      <button onClick={() => formatList('bullet')}>
        <List className='w-5 h-5' />
      </button>
      <button onClick={() => formatList('number')}>
        <ListOrdered className='w-5 h-5' />
      </button>
      <button onClick={() => alignText('left')}>
        <AlignLeft className='w-5 h-5' />
      </button>
      <button onClick={() => alignText('center')}>
        <AlignCenter className='w-5 h-5' />
      </button>
      <button onClick={() => alignText('right')}>
        <AlignRight className='w-5 h-5' />
      </button>
      <button onClick={() => alignText('justify')}>
        <AlignJustify className='w-5 h-5' />
      </button>
      <button>
        <Link className='w-5 h-5' />
      </button>
      <button>
        <Unlink className='w-5 h-5' />
      </button>
      <button>
        <ImageIcon className='w-5 h-5' />
      </button>
      <button>
        <Maximize className='w-5 h-5' />
      </button>
    </div>
  );
}
