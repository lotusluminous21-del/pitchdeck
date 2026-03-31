import {setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import Hero from '@/components/home/Hero';
import TheGap from '@/components/home/TheGap';
import ProductShowcase from '@/components/home/ProductShowcase';
import NumbersStrip from '@/components/home/NumbersStrip';
import AuthorIntro from '@/components/home/AuthorIntro';
import CallToAction from '@/components/home/CallToAction';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-background text-foreground overflow-x-hidden">
      <Hero />
      <TheGap />
      <ProductShowcase />
      <NumbersStrip />
      <AuthorIntro />
      <CallToAction />
    </main>
  );
}
