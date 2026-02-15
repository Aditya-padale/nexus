/**
 * JSON-LD Structured Data helpers for SEO.
 * Outputs Schema.org compliant structured data for Google rich results.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nexusclub.in';

/** Organization schema — used on every page via layout */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nexus — Web Development Club',
    alternateName: 'Nexus ADCE',
    url: siteUrl,
    logo: `${siteUrl}/images/nexus-og.png`,
    description:
      'Nexus is the Web Development Club under the AI & Data Science Department at Annasaheb Dange College of Engineering, Ashta, Sangli, Maharashtra, India.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'nexus.adce@gmail.com',
      contactType: 'general',
    },
    sameAs: [
      'https://github.com/NEXUS-ADCET',
      'https://www.instagram.com/nexus_adce',
      'https://www.linkedin.com/company/nexus-adce',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sangli',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Annasaheb Dange College of Engineering and Technology',
      alternateName: 'ADCET',
    },
  };
}

/** WebSite schema with search action — for site links in SERPs */
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nexus — Web Dev Club',
    url: siteUrl,
    description:
      'Nexus — Web Development Club | AI & Data Science Department, Annasaheb Dange College of Engineering.',
    publisher: {
      '@type': 'Organization',
      name: 'Nexus — Web Development Club',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/** BreadcrumbList schema */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Event schema for club events */
export function getEventSchema(event: {
  name: string;
  description: string;
  startDate?: string;
  location?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location ?? 'ADCET, Ashta, Sangli',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sangli',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Nexus — Web Development Club',
      url: siteUrl,
    },
    url: event.url ?? siteUrl,
  };
}

/** CollectionPage schema for projects listing */
export function getProjectsCollectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Nexus Club Projects',
    description:
      'A curated collection of web development projects built by Nexus club members — from event platforms to AI-powered systems.',
    url: `${siteUrl}/projects`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Nexus — Web Dev Club',
      url: siteUrl,
    },
  };
}

/** AboutPage schema */
export function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Nexus — Web Development Club',
    description:
      'Learn about Nexus, the web development community at ADCET. Our mission, values, tech stack, journey timeline, and open-source contributions.',
    url: `${siteUrl}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Nexus — Web Development Club',
      url: siteUrl,
    },
  };
}

/** ContactPage schema */
export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Nexus Club',
    description:
      'Get in touch with Nexus, the web development club at ADCET. Reach out via email, Instagram, or GitHub.',
    url: `${siteUrl}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Nexus — Web Development Club',
      email: 'nexus.adce@gmail.com',
      url: siteUrl,
    },
  };
}
