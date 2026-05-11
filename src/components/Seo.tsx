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
}

export function Seo({ title, description, path, image, ogType = "website", jsonLd, noindex = false }: Props) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? `${SITE_URL}/og-image.png`;
  const ldArr = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
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
