import config from '../../../../config/site';

export const metadata = {
  title: `Cookies · ${config.site.name}`,
  description: 'Cookie guidance for the Hubs directory.',
};

export default function CookiesPage() {
  return (
    <article style={{maxWidth:760, margin:'0 auto', display:'grid', gap:16}}>
      <h1>Cookie Policy</h1>
      <p>{config.site.name} uses no mandatory third-party cookies by default. If analytics are enabled, the provider may set cookies for traffic analysis purposes.</p>
      <p>Please review the privacy policy and contact {config.site.contactEmail} with questions.</p>
    </article>
  );
}
