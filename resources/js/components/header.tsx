import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ServiceCategory } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, Phone, Search } from 'lucide-react';
import { useState } from 'react';
import logoImage from '../assets/logo.png';
import { contact, priceList, services } from '../routes';

const navigation = [
    { name: 'Strona główna', href: '/' },
    { name: 'Cennik', href: priceList.url() },
    { name: 'Kontakt', href: contact.url() },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [openMobileCategory, setOpenMobileCategory] = useState<number | null>(
        null,
    );
    const { url, props } = usePage<{ categories: ServiceCategory[] }>();
    const categories = props.categories;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const allServices =
        categories?.flatMap((category) =>
            category.services.map((service) => ({
                ...service,
                category: category.name,
            })),
        ) ?? [];

    const filteredServices = allServices.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase()),
    );

    const isActive = (path: string) => url === path;

    const toggleMobileCategory = (id: number) => {
        setOpenMobileCategory((prev) => (prev === id ? null : id));
    };
    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-22 items-center justify-between">
                    <Link href="/" className="flex w-30">
                        <img src={logoImage} alt="Oaza Logo" />
                    </Link>

                    <nav className="hidden items-center space-x-6 md:flex">
                        <Link
                            href="/"
                            className={`text-md font-medium transition-colors hover:text-primary ${
                                isActive('/')
                                    ? 'text-primary'
                                    : 'text-slate-600'
                            }`}
                        >
                            Strona główna
                        </Link>

                        <div className="group relative">
                            <Link
                                href={services.url()}
                                className={`text-md flex items-center gap-1 font-medium transition-colors hover:text-primary ${
                                    isActive(services.url())
                                        ? 'text-primary'
                                        : 'text-slate-600'
                                }`}
                            >
                                Usługi
                                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            </Link>

                            {categories && categories.length > 0 && (
                                <div className="invisible absolute top-full left-1/2 z-50 w-[min(900px,90vw)] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                                    <div className="max-h-[75vh] overflow-y-auto rounded-2xl border border-slate-100 bg-white p-6 shadow-xl">
                                        <div className="columns-3 gap-x-8">
                                            {categories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="mb-6 break-inside-avoid"
                                                >
                                                    <p className="mb-2 text-xs font-bold tracking-widest text-primary/70 uppercase">
                                                        {category.name}
                                                    </p>

                                                    <div className="space-y-0.5">
                                                        {category.services.map(
                                                            (service) => (
                                                                <Link
                                                                    key={
                                                                        service.id
                                                                    }
                                                                    href={`${services.url()}/${service.slug}`}
                                                                    className="block rounded-lg px-2 py-1 text-sm text-slate-600 transition-colors hover:bg-primary/5 hover:text-primary"
                                                                >
                                                                    {
                                                                        service.name
                                                                    }
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {navigation.slice(1).map((item) => (
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
                        <div className="relative hidden lg:block">
                            <div className="flex h-10 items-center rounded-full border border-slate-200 px-3">
                                <Search className="h-4 w-4 text-slate-400" />

                                <input
                                    value={search}
                                    onFocus={() => setShowSearch(true)}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setShowSearch(true);
                                    }}
                                    placeholder="Szukaj usługi..."
                                    className="ml-2 w-40 bg-transparent text-sm outline-none"
                                />
                            </div>

                            {showSearch && search.length > 1 && (
                                <div className="absolute top-12 left-0 z-50 w-80 rounded-xl border bg-white p-2 shadow-xl">
                                    {filteredServices.length > 0 ? (
                                        filteredServices
                                            .slice(0, 5)
                                            .map((service) => (
                                                <Link
                                                    key={service.id}
                                                    href={`${services.url()}/${service.slug}`}
                                                    onClick={() => {
                                                        setSearch('');
                                                        setShowSearch(false);
                                                    }}
                                                    className="block rounded-lg px-3 py-2 hover:bg-slate-50"
                                                >
                                                    <p className="text-sm font-medium">
                                                        {service.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {service.category}
                                                    </p>
                                                </Link>
                                            ))
                                    ) : (
                                        <p className="px-3 py-2 text-sm text-slate-400">
                                            Brak wyników
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
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
                        {showSearch && (
                            <div className="absolute top-full left-0 z-50 w-full border-b bg-white p-4 shadow-lg md:hidden">
                                <div className="flex items-center rounded-xl border border-slate-200 px-4">
                                    <Search className="h-5 w-5 text-slate-400" />

                                    <input
                                        autoFocus
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        placeholder="Znajdź usługę..."
                                        className="h-12 w-full bg-transparent px-3 outline-none"
                                    />
                                </div>

                                {search.length > 1 && (
                                    <div className="mt-3 rounded-xl border bg-white p-2">
                                        {filteredServices.length > 0 ? (
                                            filteredServices
                                                .slice(0, 5)
                                                .map((service) => (
                                                    <Link
                                                        key={service.id}
                                                        href={`${services.url()}/${service.slug}`}
                                                        onClick={() => {
                                                            setSearch('');
                                                            setShowSearch(
                                                                false,
                                                            );
                                                        }}
                                                        className="block rounded-lg px-3 py-3 hover:bg-slate-50"
                                                    >
                                                        <p className="font-medium">
                                                            {service.name}
                                                        </p>

                                                        <p className="text-xs text-slate-400">
                                                            {service.category}
                                                        </p>
                                                    </Link>
                                                ))
                                        ) : (
                                            <p className="px-3 py-2 text-sm text-slate-400">
                                                Brak wyników
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center space-x-2 md:hidden">
                            <button
                                type="button"
                                onClick={() => setShowSearch(!showSearch)}
                                className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-600"
                            >
                                <Search className="h-5 w-5" />
                            </button>
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
                                    className="w-[300px] overflow-y-auto border-l-0 p-0"
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
                                            <Link
                                                href="/"
                                                onClick={() => setIsOpen(false)}
                                                className={`rounded-xl px-4 py-2 text-lg font-medium transition-colors ${
                                                    isActive('/')
                                                        ? 'bg-primary/5 text-primary'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                Strona główna
                                            </Link>

                                            <div>
                                                <div className="flex items-center justify-between rounded-xl px-4 py-2">
                                                    <Link
                                                        href={services.url()}
                                                        onClick={() =>
                                                            setIsOpen(false)
                                                        }
                                                        className={`text-lg font-medium transition-colors ${
                                                            isActive(
                                                                services.url(),
                                                            )
                                                                ? 'text-primary'
                                                                : 'text-slate-600'
                                                        }`}
                                                    >
                                                        Usługi
                                                    </Link>

                                                    {categories &&
                                                        categories.length >
                                                            0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setIsServicesOpen(
                                                                        !isServicesOpen,
                                                                    )
                                                                }
                                                                className="p-1 text-slate-500"
                                                                aria-label="Rozwiń usługi"
                                                            >
                                                                <ChevronDown
                                                                    className={`h-6 w-6 transition-transform ${
                                                                        isServicesOpen
                                                                            ? 'rotate-180'
                                                                            : ''
                                                                    }`}
                                                                />
                                                            </button>
                                                        )}
                                                </div>

                                                {isServicesOpen &&
                                                    categories && (
                                                        <div className="ml-4 flex flex-col space-y-1 border-l border-slate-100 pl-4">
                                                            {categories.map(
                                                                (category) => (
                                                                    <div
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        className="py-1"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                toggleMobileCategory(
                                                                                    category.id,
                                                                                )
                                                                            }
                                                                            className="flex w-full items-center justify-between gap-3 py-1 text-left text-sm font-bold tracking-widest text-slate-400 uppercase"
                                                                        >
                                                                            <span className="flex-1">
                                                                                {
                                                                                    category.name
                                                                                }
                                                                            </span>

                                                                            <ChevronDown
                                                                                className={`h-6 w-6 shrink-0 transition-transform ${
                                                                                    openMobileCategory ===
                                                                                    category.id
                                                                                        ? 'rotate-180'
                                                                                        : ''
                                                                                }`}
                                                                            />
                                                                        </button>

                                                                        {openMobileCategory ===
                                                                            category.id && (
                                                                            <div className="flex flex-col space-y-1 py-1">
                                                                                {category.services.map(
                                                                                    (
                                                                                        service,
                                                                                    ) => (
                                                                                        <Link
                                                                                            key={
                                                                                                service.id
                                                                                            }
                                                                                            href={`${services.url()}/${service.slug}`}
                                                                                            onClick={() =>
                                                                                                setIsOpen(
                                                                                                    false,
                                                                                                )
                                                                                            }
                                                                                            className="rounded-lg px-2 py-1.5 text-base text-slate-600 hover:bg-slate-50"
                                                                                        >
                                                                                            {
                                                                                                service.name
                                                                                            }
                                                                                        </Link>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </div>

                                            {navigation.slice(1).map((item) => (
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
                                                className="flex items-center gap-3 rounded-2xl bg-muted px-4 py-4 transition-colors hover:bg-primary/5"
                                            >
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                                                    <Phone className="h-5 w-5" />
                                                </div>
                                                <span className="flex flex-col">
                                                    <span className="text-xs text-slate-500">
                                                        Zadzwoń do nas
                                                    </span>
                                                    <span className="text-base font-bold text-slate-900">
                                                        505 849 060
                                                    </span>
                                                </span>
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
