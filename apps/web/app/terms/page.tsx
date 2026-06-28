import config from '../../../../config/site';

export const metadata = {
  title: `Terms · ${config.site.name}`,
  description: 'Terms of use for the Hubs directory.',
};

export default function TermsPage() {
  return (
    <article style={{maxWidth:760, margin:'0 auto', display:'grid', gap:16}}>
      <h1>Terms of Service</h1>
      <p>Use of {config.site.name} is subject to responsible use of the linked applications and the resources they provide.</p>
      <p>Each subdomain remains the responsibility of its own owner, and links are provided as convenience shortcuts rather than endorsements.</p>
      <p>For support requests, contact {config.site.contactEmail}.</p>
    </article>
  );
}
