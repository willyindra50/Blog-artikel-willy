'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { EditorState } from 'lexical';
import LexicalToolbar from './LexicalToolbar';

interface Props {
  onChange: (val: string) => void;
}

const editorConfig = {
  namespace: 'MyEditor',
  theme: {},
  onError(error: Error) {
    console.error('Lexical error:', error);
  },
  nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode],
};

export default function LexicalEditor({ onChange }: Props) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className='border rounded-[12px] p-2'>
        <LexicalToolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className='min-h-[200px] p-4 outline-none text-sm' />
          }
          placeholder={
            <div className='p-4 text-gray-400 text-sm'>Enter your content</div>
          }
          ErrorBoundary={() => <div>Error!</div>}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState: EditorState) => {
            editorState.read(() => {
              const json = JSON.stringify(editorState);
              onChange(json);
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
}
