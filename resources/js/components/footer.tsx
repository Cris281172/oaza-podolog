import { Clock, MapPin, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
        <footer className="border-t border-border bg-secondary">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-primary">
                            OAZA GABINET PODOLOGICZNY
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Profesjonalna opieka podologiczna w Kielcach. Dbamy
                            o zdrowie Twoich stóp.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Kontakt</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>
                                    ul. Mieczysławy Ćwiklińskiej 1E
                                    <br />
                                    25-437 Kielce
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <a
                                    href="tel:505849060"
                                    className="transition-colors hover:text-primary"
                                >
                                    505 849 060
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Pon-Pt: 9:00 - 18:00</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Menu</h4>
                        <nav className="space-y-2 text-sm">
                            <Link
                                href="/services"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Usługi
                            </Link>
                            <Link
                                href="/pricing"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Cennik
                            </Link>
                            <Link
                                href="/gallery"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Galeria
                            </Link>
                            <Link
                                href="/blog"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Blog
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} Gabinet Podologiczny
                        OAZA. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
