import config from '../../../../config/site';

const faqs = [
  {
    question: 'What is Hubs?',
    answer: 'Hubs is a directory for useful web tools hosted across subdomains, making them easier to discover from one place.',
  },
  {
    question: 'Are these applications free to use?',
    answer: 'Most of them are designed as lightweight public tools and can be used directly from their own subdomain.',
  },
  {
    question: 'How are my data and privacy handled?',
    answer: 'Each subdomain is responsible for its own privacy practices, while the hub uses minimal analytics and links to the relevant apps.',
  },
  {
    question: 'Can I submit my own tool to be hosted on Hubs?',
    answer: 'Yes. Reach out through the contact email to discuss a new utility or subdomain registration.',
  },
  {
    question: 'Do these tools work offline?',
    answer: 'The directory itself is static and the hosted tools vary by app, but the launcher experience remains available offline once cached.',
  },
];

export const metadata = {
  title: `FAQ · ${config.site.name}`,
  description: 'Answers to common questions about the Hubs launcher.',
};

export default function FaqPage() {
  return (
    <article style={{maxWidth:860, margin:'0 auto', display:'grid', gap:16}}>
      <h1>Frequently asked questions</h1>
      <div style={{display:'grid', gap:12}}>
        {faqs.map(faq => (
          <details key={faq.question} style={{padding:16, border:'1px solid var(--border)', borderRadius:16, background:'var(--surface)'}}>
            <summary style={{fontWeight:700, cursor:'pointer'}}>{faq.question}</summary>
            <p style={{margin:'12px 0 0', color:'var(--text-muted)'}}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </article>
  );
}
