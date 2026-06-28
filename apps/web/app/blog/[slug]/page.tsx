import config from '../../../../../config/site';
import { getBlogPost, getBlogPosts } from '../../../lib/blog';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} · ${config.site.name}`,
    description: post.description,
  };
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) return <div>Not found</div>;

  return (
    <article style={{maxWidth:760, margin:'0 auto', display:'grid', gap:16}}>
      <h1>{post.title}</h1>
      <p style={{margin:0, color:'var(--text-muted)'}}>{post.description}</p>
      {post.date && <time style={{fontSize:14, color:'var(--text-muted)'}}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>}
      <div style={{lineHeight:1.7}} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
