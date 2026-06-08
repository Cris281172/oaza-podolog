import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Faq {
    answer: string;
    order: number;
    question: string;
    id: number;
}

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content?: JSONContent;
    excerpt: string;
    isPublished: boolean;
    is_published: number;
    createdAt: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    links: Link[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Link[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface PricingItem {
    id: number;
    title: string;
    description: string;
    order: number;
}
