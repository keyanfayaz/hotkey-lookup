import { Helmet } from "react-helmet-async";

const SITE_URL = "https://hotkeylookup.com";

interface Props {
  title: string;
  description: string;
  path: string;
  image?: string;
  ogType?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  keywords?: string[];
  /** Breadcrumb trail: array of { name, path } from root to current. The current page is included. */
  breadcrumbs?: { name: string; path: string }[];
}

function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function Seo({
  title,
  description,
  path,
  image,
  ogType = "website",
  jsonLd,
  noindex = false,
  keywords,
  breadcrumbs,
}: Props) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? `${SITE_URL}/og-image.png`;
  const userLd = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const ldArr = breadcrumbs && breadcrumbs.length > 1 ? [breadcrumbLd(breadcrumbs), ...userLd] : userLd;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Hotkey Lookup" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {ldArr.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
}
