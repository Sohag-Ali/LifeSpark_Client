import { siteConfig } from "../config/siteConfig";

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.baseUrl,
  logo: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.baseUrl,
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteConfig.baseUrl}${item.path}`,
  })),
});
