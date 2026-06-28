import config from '../../../../config/site';
import { getBlogPosts } from '../../lib/blog';

export const metadata = {
  title: `Blog · ${config.site.name}`,
  description: 'Recent articles about utility directories and build quality.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <article style={{maxWidth:860, margin:'0 auto', display:'grid', gap:16}}>
      <h1>Blog</h1>
      <p>Insights on the Hubs ecosystem, metadata-driven previews, and responsive utility design.</p>
      <div style={{display:'grid', gap:12}}>
        {posts.map(post => (
          <a key={post.slug} href={`/blog/${post.slug}`} style={{padding:18, border:'1px solid var(--border)', borderRadius:16, textDecoration:'none', color:'inherit', background:'var(--surface)'}}>
            <h2 style={{margin:'0 0 8px'}}>{post.title}</h2>
            <p style={{margin:0, color:'var(--text-muted)'}}>{post.description}</p>
            {post.date && <time style={{fontSize:13, color:'var(--text-muted)', marginTop:8, display:'block'}}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>}
          </a>
        ))}
      </div>
    </article>
  );
}
