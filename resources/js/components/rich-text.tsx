import type { JSONContent } from '@tiptap/core';
import type { ReactNode } from 'react';

const renderChildren = (node: JSONContent): ReactNode =>
    node.content?.map((child, index) => renderNode(child, index));

const safeHref = (value: unknown) => {
    const href = String(value ?? '');
    return /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) ? href : '#';
};

const renderText = (node: JSONContent, key: number): ReactNode => {
    let content: ReactNode = node.text ?? '';

    node.marks?.forEach((mark) => {
        if (mark.type === 'bold') content = <strong>{content}</strong>;
        if (mark.type === 'italic') content = <em>{content}</em>;
        if (mark.type === 'strike') content = <s>{content}</s>;
        if (mark.type === 'code') content = <code>{content}</code>;
        if (mark.type === 'link') {
            const href = safeHref(mark.attrs?.href);
            content = (
                <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={
                        href.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                    }
                >
                    {content}
                </a>
            );
        }
    });

    return <span key={key}>{content}</span>;
};

const renderNode = (node: JSONContent, key: number): ReactNode => {
    if (node.type === 'text') return renderText(node, key);
    if (node.type === 'paragraph')
        return <p key={key}>{renderChildren(node)}</p>;
    if (node.type === 'heading') {
        const level = Math.min(Math.max(Number(node.attrs?.level ?? 2), 2), 4);
        if (level === 3) return <h3 key={key}>{renderChildren(node)}</h3>;
        if (level === 4) return <h4 key={key}>{renderChildren(node)}</h4>;
        return <h2 key={key}>{renderChildren(node)}</h2>;
    }
    if (node.type === 'bulletList')
        return <ul key={key}>{renderChildren(node)}</ul>;
    if (node.type === 'orderedList')
        return <ol key={key}>{renderChildren(node)}</ol>;
    if (node.type === 'listItem')
        return <li key={key}>{renderChildren(node)}</li>;
    if (node.type === 'blockquote')
        return <blockquote key={key}>{renderChildren(node)}</blockquote>;
    if (node.type === 'horizontalRule') return <hr key={key} />;
    if (node.type === 'hardBreak') return <br key={key} />;
    if (node.type === 'image') {
        return (
            <img
                key={key}
                src={String(node.attrs?.src ?? '')}
                alt={String(node.attrs?.alt ?? '')}
                loading="lazy"
            />
        );
    }

    return <div key={key}>{renderChildren(node)}</div>;
};

const RichText = ({ content }: { content: JSONContent }) => (
    <div className="policy-content">{renderChildren(content)}</div>
);

export default RichText;
