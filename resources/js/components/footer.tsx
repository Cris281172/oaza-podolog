import { Link } from '@inertiajs/react';
import { Clock, Facebook, MapPin, Phone } from 'lucide-react';
const Footer = () => {
    return (
        <footer className="border-t border-border bg-secondary">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-primary">
                            GABINET PODOLOGICZNA OAZA
                        </h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Profesjonalna opieka podologiczna w Kielcach. Dbamy
                            o zdrowie Twoich stóp.
                        </p>
                        <div className={'flex gap-1'}>
                            <a
                                aria-label="Odwiedź profil OAZA na TikToku"
                                href={
                                    'https://www.tiktok.com/@podolog_kielce?_r=1&_d=secCgYIASAHKAESPgo8mcv4a2yEc4%2BHvW94vijmNuCl8JRmbRNGJK37EMZQ2eF6SrcxOuMK2ZEmMLHh6s2i4RqRI7XercGimkUzGgA%3D&_svg=2&checksum=cabb966a06978a72d6ea4acebc4d8d5d2e6d98e8ac9a00f6b74aa4b619f1b91c&item_author_type=1&reflow_sign_scene=7&rgssign=8.1.DlVUoObundwROICFwl8kFw&sec_uid=MS4wLjABAAAAeBBnzo0lMdE8e9jIXIVcsm3XWKFaK6lgwY6K83dN4olpMbIDJtp3wx2SXkxpqogu&sec_user_id=MS4wLjABAAAAeBBnzo0lMdE8e9jIXIVcsm3XWKFaK6lgwY6K83dN4olpMbIDJtp3wx2SXkxpqogu&share_app_id=1233&share_author_id=7597363463048250390&share_link_id=9BCA3EEF-39E3-4B0A-89B9-5E75BCB641A6&share_region=PL&share_scene=1&sharer_language=pl&social_share_type=4&source=h5_m&timestamp=1784786530&tt_from=copy&u_code=f1feh8dbahbmi8&ug_btm=b8727%2Cb0&user_id=7597363463048250390&utm_campaign=client_share&utm_medium=ios&utm_source=copy'
                                }
                                target={'_blank'}
                                className={'rounded-full bg-primary p-2'}
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
                                href={
                                    'https://www.facebook.com/profile.php?id=61566252414011'
                                }
                                target={'_blank'}
                                aria-label="Odwiedź profil OAZA na Facebooku"
                                className={'rounded-full bg-primary p-2'}
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
                            <div className="flex items-start space-x-2">
                                <Clock className="h-4 w-4" />
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
                        <h4 className="mb-4 text-sm font-semibold">Menu</h4>
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
};

export default Footer;
