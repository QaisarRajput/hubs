import config from '../../../../config/site';

export const metadata = {
  title: `About · ${config.site.name}`,
  description: 'What Hubs is and how the subdomain ecosystem works.',
};

export default function AboutPage() {
  return (
    <article style={{maxWidth:760, margin:'0 auto', display:'grid', gap:16}}>
      <h1>About Hubs</h1>
      <p>{config.site.name} is a curated launcher for useful web applications hosted across subdomains. It brings independent tools together under a clear, modern directory so visitors can discover them quickly.</p>
      <p>Each application contributes its own branding through metadata and opens in a dedicated subdomain, keeping the experience lightweight and focused.</p>
    </article>
  );
}
