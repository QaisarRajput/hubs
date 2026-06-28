import config from '../../../../config/site';

export const metadata = {
  title: `Privacy · ${config.site.name}`,
  description: 'Privacy policy for the Hubs directory.',
};

export default function PrivacyPage() {
  return (
    <article style={{maxWidth:760, margin:'0 auto', display:'grid', gap:16}}>
      <h1>Privacy Policy</h1>
      <p>{config.site.name} uses minimal analytics and does not collect personal data beyond what is necessary to provide the directory experience.</p>
      <p>If analytics are enabled, third-party providers may place cookies or collect technical information in accordance with their own policies.</p>
      <p>For questions, contact {config.site.contactEmail}.</p>
    </article>
  );
}
