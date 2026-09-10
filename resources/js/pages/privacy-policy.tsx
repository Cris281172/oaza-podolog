import HeaderPage from '@/components/header-page';
import RichText from '@/components/rich-text';
import Seo from '@/components/seo';
import PageLayout from '@/layouts/page-layout';
import type { JSONContent } from '@tiptap/core';

interface Policy {
    title: string;
    intro: string;
    content: JSONContent;
}

const PrivacyPolicy = ({ policy }: { policy: Policy }) => {
    return (
        <PageLayout>
            <Seo
                title="Polityka prywatności i cookies | Podologiczna Oaza"
                desc="Informacje o ochronie danych osobowych, plikach cookies i usługach zewnętrznych na stronie gabinetu Podologiczna Oaza."
            />
            <main className="bg-background">
                <HeaderPage
                    overline="Informacje prawne"
                    title={policy.title}
                    text={policy.intro}
                />

                <section className="py-12 md:py-20">
                    <article className="container mx-auto max-w-4xl px-4">
                        <RichText content={policy.content} />
                    </article>
                </section>
            </main>
        </PageLayout>
    );
};

export default PrivacyPolicy;
