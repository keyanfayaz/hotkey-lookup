import { Link, useParams } from "react-router-dom";
import { Seo } from "../components/Seo";
import { CarbonAd } from "../components/CarbonAd";
import { RecommendedGear } from "../components/RecommendedGear";
import { NotFoundContent } from "./NotFound";
import { HOWTOS } from "../data/howtos";
import { KeyCombo } from "../components/KeyCombo";

export function Component() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? HOWTOS.find((a) => a.slug === slug) : null;

  if (!article) return <NotFoundContent label="Article not found" />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: article.title,
    description: article.description,
    step: article.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.heading,
      text: s.body,
    })),
  };

  return (
    <>
      <Seo
        title={`${article.title} | Hotkey Lookup`}
        description={article.description}
        path={`/how-to/${article.slug}`}
        jsonLd={jsonLd}
      />
      <div className="page">
        <Link className="back-btn" to="/">← Home</Link>
        <article className="howto">
          <h1>{article.title}</h1>
          <p className="page-lede">{article.description}</p>

          {article.steps.map((step, i) => (
            <section key={i} className="howto-step">
              <h2>{step.heading}</h2>
              <p>{step.body}</p>
              {step.combos && step.combos.length > 0 && (
                <div className="smodal-combos">
                  {step.combos.map((c, j) => (
                    <KeyCombo key={j} combo={c.combo} os={c.os} />
                  ))}
                </div>
              )}
            </section>
          ))}

          <CarbonAd placement="footer" />

          {article.appId && (
            <RecommendedGear appId={article.appId} os={article.os ?? "macos"} />
          )}
        </article>
      </div>
    </>
  );
}

export default Component;
