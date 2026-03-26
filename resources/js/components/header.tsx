import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../assets/logo.png';
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { props } = usePage();
    console.log(props);
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50 bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className={'flex w-25'}>
                        <img src={logoImage} />
                    </Link>

                    <nav className="hidden items-center space-x-6 md:flex">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isActive('/')
                                    ? 'text-primary'
                                    : 'text-foreground'
                            }`}
                        >
                            Strona główna
                        </Link>
                        <Link
                            href="/services"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isActive('/services')
                                    ? 'text-primary'
                                    : 'text-foreground'
                            }`}
                        >
                            Usługi
                        </Link>
                        <Link
                            href="/pricing"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isActive('/pricing')
                                    ? 'text-primary'
                                    : 'text-foreground'
                            }`}
                        >
                            Cennik
                        </Link>
                        <Link
                            href="/gallery"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isActive('/gallery')
                                    ? 'text-primary'
                                    : 'text-foreground'
                            }`}
                        >
                            Galeria
                        </Link>
                        <Link
                            href="/blog"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isActive('/blog')
                                    ? 'text-primary'
                                    : 'text-foreground'
                            }`}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm font-medium transition-colors hover:text-primary ${
                                isActive('/contact')
                                    ? 'text-primary'
                                    : 'text-foreground'
                            }`}
                        >
                            Kontakt
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <a
                            href="tel:505849060"
                            className="hidden items-center space-x-2 text-sm text-foreground transition-colors hover:text-primary md:flex"
                        >
                            <Phone className="h-4 w-4" />
                            <span>505 849 060</span>
                        </a>
                        <Button asChild className="hidden md:inline-flex">
                            <Link href="/contact">Umów wizytę</Link>
                        </Button>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px]">
                                <nav className="mt-8 flex flex-col space-y-4 px-5">
                                    <Link
                                        href="/"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 text-base font-medium transition-colors hover:text-primary ${
                                            isActive('/')
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        Strona główna
                                    </Link>
                                    <Link
                                        href="/services"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 text-base font-medium transition-colors hover:text-primary ${
                                            isActive('/services')
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        Usługi
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 text-base font-medium transition-colors hover:text-primary ${
                                            isActive('/pricing')
                                                ? 'text-primary'
                                                : 'text-primary'
                                        }`}
                                    >
                                        Cennik
                                    </Link>
                                    <Link
                                        href="/gallery"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 text-base font-medium transition-colors hover:text-primary ${
                                            isActive('/gallery')
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        Galeria
                                    </Link>
                                    <Link
                                        href="/blog"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 text-base font-medium transition-colors hover:text-primary ${
                                            isActive('/blog')
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        Blog
                                    </Link>
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsOpen(false)}
                                        className={`py-2 text-base font-medium transition-colors hover:text-primary ${
                                            isActive('/contact')
                                                ? 'text-primary'
                                                : 'text-foreground'
                                        }`}
                                    >
                                        Kontakt
                                    </Link>
                                    <div className="border-t border-border pt-4">
                                        <a
                                            href="tel:505849060"
                                            className="flex items-center space-x-2 py-2 text-sm text-foreground transition-colors hover:text-primary"
                                        >
                                            <Phone className="h-4 w-4" />
                                            <span>505 849 060</span>
                                        </a>
                                        <Button asChild className="mt-4 w-full">
                                            <Link
                                                href="/contact"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Umów wizytę
                                            </Link>
                                        </Button>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
