import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { Menu, Phone } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../assets/logo.png';
import { contact, priceList, services } from '../routes';
const navigation = [
    { name: 'Strona główna', href: '/' },
    { name: 'Usługi', href: services.url() },
    { name: 'Cennik', href: priceList.url() },
    { name: 'Kontakt', href: contact.url() },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const isActive = (path: string) => url === path;

    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-22 items-center justify-between">
                    <Link href="/" className="flex w-26">
                        <img src={logoImage} alt="Oaza Logo" />
                    </Link>

                    <nav className="hidden items-center space-x-6 md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-md font-medium transition-colors hover:text-primary ${
                                    isActive(item.href)
                                        ? 'text-primary'
                                        : 'text-slate-600'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-3">
                        <a
                            href="tel:505849060"
                            className="hidden items-center space-x-2 text-sm font-semibold text-slate-700 transition-colors hover:text-primary lg:flex"
                        >
                            <Phone className="h-5 w-5" />
                            <span>505 849 060</span>
                        </a>

                        <Button
                            asChild
                            className="hidden rounded-full px-6 md:inline-flex"
                        >
                            <Link href="/kontakt">Umów wizytę</Link>
                        </Button>

                        <div className="flex items-center space-x-2 md:hidden">
                            <a
                                href="tel:505849060"
                                className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors active:bg-primary active:text-white"
                                aria-label="Zadzwoń teraz"
                            >
                                <Phone className="h-5 w-5" />
                            </a>

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-12 w-12 rounded-xl border border-slate-100"
                                    >
                                        <Menu className="h-5 w-5 text-slate-700" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-[300px] border-l-0 p-0"
                                >
                                    <div className="flex h-full flex-col p-6">
                                        <div className="mb-10">
                                            <img
                                                src={logoImage}
                                                alt="Logo"
                                                className="w-24"
                                            />
                                        </div>

                                        <nav className="flex flex-col space-y-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    className={`rounded-xl px-4 py-2 text-lg font-medium transition-colors ${
                                                        isActive(item.href)
                                                            ? 'bg-primary/5 text-primary'
                                                            : 'text-slate-600 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>

                                        <div className="mt-auto border-t border-slate-100 pt-6">
                                            <p className="mb-4 px-4 text-xs font-bold tracking-widest text-slate-400 uppercase">
                                                Szybki kontakt
                                            </p>

                                            <a
                                                href="tel:505849060"
                                                className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 transition-colors hover:bg-primary/5"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <a
                                                    href="tel:505849060"
                                                    className="flex flex-col"
                                                >
                                                    <span className="text-xs text-slate-500">
                                                        Zadzwoń do nas
                                                    </span>
                                                    <span className="text-base font-bold text-slate-900">
                                                        505 849 060
                                                    </span>
                                                </a>
                                            </a>

                                            <Button
                                                asChild
                                                className="mt-4 w-full rounded-2xl"
                                            >
                                                <a
                                                    href="https://booksy.com/pl-pl/254137_gabinet-podologiczna-oaza-podolog-kielce_podologia_7937_kielce"
                                                    target={'_blank'}
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    Umów wizytę online
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
