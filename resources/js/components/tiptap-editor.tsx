import type { Editor } from '@tiptap/core';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';

import { Button } from '@/components/ui/button';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import type { EditorStateSnapshot } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
const extensions = [
    TextStyleKit,
    StarterKit,
    Typography,
    Link.configure({ openOnClick: false }),
    Image.configure({ HTMLAttributes: { class: 'rounded-lg max-w-full' } }),
    Placeholder.configure({ placeholder: 'Zacznij pisać artykuł...' }),
];
/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
    return {
        // Text formatting
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

        // Block types
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,

        // Lists and blocks
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,

        // History
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
    };
}

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
    const editorState = useEditorState({
        editor,
        selector: menuBarStateSelector,
    });

    if (!editor) {
        return null;
    }

    return (
        <div className="control-group">
            <div className="button-group">
                <Button
                    type={'button'}
                    variant={editorState.isBold ? 'default' : 'secondary'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active' : ''}
                >
                    Bold
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isItalic ? 'default' : 'secondary'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                >
                    Italic
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isStrike ? 'default' : 'secondary'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                >
                    Strike
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isCode ? 'default' : 'secondary'}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                >
                    Code
                </Button>
                {/*<Button*/}
                {/*    onClick={() => editor.chain().focus().unsetAllMarks().run()}*/}
                {/*>*/}
                {/*    Clear marks*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*    onClick={() => editor.chain().focus().clearNodes().run()}*/}
                {/*>*/}
                {/*    Clear nodes*/}
                {/*</Button>*/}
                <Button
                    type={'button'}
                    variant={editorState.isParagraph ? 'default' : 'secondary'}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                >
                    Paragraph
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isHeading1 ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                >
                    H1
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isHeading2 ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    H2
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isHeading3 ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                >
                    H3
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isHeading4 ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 4 }).run()
                    }
                >
                    H4
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isHeading5 ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 5 }).run()
                    }
                >
                    H5
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isHeading6 ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 6 }).run()
                    }
                >
                    H6
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isBulletList ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet list
                </Button>
                <Button
                    type={'button'}
                    variant={
                        editorState.isOrderedList ? 'default' : 'secondary'
                    }
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    Ordered list
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isCodeBlock ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    Code block
                </Button>
                <Button
                    type={'button'}
                    variant={editorState.isBlockquote ? 'default' : 'secondary'}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    Blockquote
                </Button>
                <Button
                    type={'button'}
                    variant={editor.isActive('link') ? 'default' : 'secondary'}
                    onClick={() => {
                        const url = window.prompt('Podaj adres URL:');
                        if (url) {
                            editor.chain().focus().setLink({ href: url }).run();
                        }
                    }}
                >
                    Link
                </Button>

                <Button
                    type={'button'}
                    variant="secondary"
                    onClick={() => {
                        const url = window.prompt('Podaj adres URL obrazka:');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                >
                    Obraz
                </Button>
                <Button
                    type={'button'}
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    Horizontal rule
                </Button>
                <Button
                    type={'button'}
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                >
                    Hard break
                </Button>
                <Button
                    type={'button'}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState.canUndo}
                >
                    Undo
                </Button>
                <Button
                    type={'button'}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState.canRedo}
                >
                    Redo
                </Button>
            </div>
        </div>
    );
};

interface EditorProps {
    content: any;
    onChange: (json: any) => void;
}

export const TiptapEditor = ({ content, onChange }: EditorProps) => {
    const editor = useEditor({
        extensions,
        content: content,
        onUpdate: ({ editor }) => {
            // Wysyłamy obiekt JSON do useForm
            onChange(editor.getJSON());
        },
    });

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
};
