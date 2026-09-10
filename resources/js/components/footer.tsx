import { Link } from '@inertiajs/react';
import { Clock, Facebook, MapPin, Phone } from 'lucide-react';
const Footer = () => {
    return (
        <footer className="border-t border-slate-100 bg-muted/50">
            <div className="container mx-auto max-w-6xl px-4 py-14 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">
                            GABINET PODOLOGICZNA OAZA
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Profesjonalna opieka podologiczna w Kielcach. Dbamy
                            o zdrowie Twoich stóp.
                        </p>
                        <div className="flex gap-2">
                            <a
                                aria-label="Odwiedź profil Podologicznej Oazy na TikToku"
                                href="https://www.tiktok.com/@podolog_kielce"
                                target={'_blank'}
                                rel="noopener noreferrer"
                                className="rounded-full bg-primary p-2 transition-transform hover:-translate-y-0.5"
                            >
                                <img
                                    src="/images/tiktok.svg"
                                    width={19}
                                    height={19}
                                    alt={'TikTok'}
                                    aria-hidden="true"
                                    className="brightness-0 invert"
                                />
                            </a>
                            <a
                                href="https://www.facebook.com/people/Gabinet-Podologiczna-Oaza-Podolog-Kielce/61566252414011/"
                                target={'_blank'}
                                rel="noopener noreferrer"
                                aria-label="Odwiedź profil Podologicznej Oazy na Facebooku"
                                className="rounded-full bg-primary p-2 transition-transform hover:-translate-y-0.5"
                            >
                                <Facebook
                                    className={'text-gray-100'}
                                    size={19}
                                    aria-hidden="true"
                                />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase">
                            Kontakt
                        </h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                                <span>
                                    ul. Mieczysławy Ćwiklińskiej 1E
                                    <br />
                                    25-437 Kielce
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 shrink-0 text-primary" />
                                <a
                                    href="tel:505849060"
                                    className="transition-colors hover:text-primary"
                                >
                                    505 849 060
                                </a>
                            </div>
                            <div className="flex items-start space-x-2">
                                <Clock className="h-4 w-4 shrink-0 text-primary" />
                                <div className={'flex flex-col'}>
                                    <span>Pon-Czw: 16:00 - 20:00</span>
                                    <span>Pt: 14:00 - 20:00</span>
                                    <span>Sob: 9:00 - 13:00</span>
                                    <span>Nd: Zamknięte</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-bold tracking-wider text-slate-900 uppercase">
                            Menu
                        </h4>
                        <nav className="space-y-2 text-sm">
                            <Link
                                href="/"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Strona główna
                            </Link>
                            <Link
                                href="/uslugi"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Usługi
                            </Link>
                            <Link
                                href="/cennik"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Cennik
                            </Link>

                            <Link
                                href="/kontakt"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Kontakt
                            </Link>
                            <Link
                                href="/polityka-prywatnosci"
                                className="block text-muted-foreground transition-colors hover:text-primary"
                            >
                                Polityka prywatności i cookies
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-10 border-t border-slate-200/70 pt-7 text-center text-xs text-muted-foreground">
                    <p>
                        &copy; {new Date().getFullYear()} Gabinet Podologiczny
                        Podologiczna Oaza. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
