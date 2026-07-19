import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../config/siteConfig";

/**
 * Drop into any page to set title/description/canonical/OG/Twitter tags and
 * (optionally) JSON-LD structured data. Falls back to site-wide defaults.
 *
 *   <SEO title="Pricing" description="..." />
 *   <SEO title={lesson.title} description={lesson.summary} image={lesson.thumbnail}
 *        canonical={`/lesson-details/${lesson._id}`} jsonLd={courseSchema(lesson)} />
 */
const SEO = ({
  title,
  description = siteConfig.defaultDescription,
  canonical,
  image = siteConfig.defaultOgImage,
  type = "website",
  jsonLd,
  noindex = false,
}) => {
  const resolvedTitle = title ? siteConfig.titleTemplate.replace("%s", title) : siteConfig.defaultTitle;
  const resolvedImage = image.startsWith("http") ? image : `${siteConfig.baseUrl}${image}`;
  const resolvedCanonical = canonical
    ? `${siteConfig.baseUrl}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : undefined;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedImage} />
      {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.twitterHandle} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
