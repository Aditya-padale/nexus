import { Metadata } from 'next';
import ContactClient from './ContactClient';
import { getContactPageSchema, getBreadcrumbSchema } from '@/lib/jsonLd';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Nexus — the web development club at ADCET. Reach us via email, Instagram, or GitHub. We\'d love to hear from you!',
  keywords: [
    'contact Nexus',
    'contact Nexus ADCET',
    'ADCET Nexus contact',
    'ADCET web dev club contact',
    'ADCET web development club',
    'Nexus email',
    'Nexus ADCE email',
    'join Nexus',
    'join Nexus club',
    'join ADCET coding club',
    'Nexus Instagram',
    'Nexus GitHub',
    'nexus.adce@gmail.com',
    'web dev club Sangli contact',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Nexus — Web Dev Club',
    description:
      'Reach out to Nexus club at ADCET via email, Instagram, or GitHub.',
    url: `${siteUrl}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getContactPageSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: siteUrl },
              { name: 'Contact', url: `${siteUrl}/contact` },
            ])
          ),
        }}
      />
      <ContactClient />
    </>
  );
}
