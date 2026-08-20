import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import dashboard from '@/routes/dashboard';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Strona główna',
        href: dashboard.home.url(),
    },
];

interface DashboardStats {
    services: number;
    serviceCategories: number;
    pricing: number;
    pricingItems: number;
    faq: number;
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

interface Props {
    stats: DashboardStats;
    auth: {
        user: AuthUser;
    };
}

const Home = ({ stats, auth }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Strona główna" />

            <div className="mx-10 mt-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Witaj, {auth.user.name}! 👋
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Miło Cię widzieć. Oto podsumowanie Twojej strony.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Usługi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stats.services}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                aktywnych usług
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Kategorie usług</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stats.serviceCategories}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                kategorii
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cennik</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stats.pricingItems}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                pozycji cennika
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>FAQ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stats.faq}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                pytań i odpowiedzi
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default Home;
