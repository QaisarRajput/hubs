import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogDir = path.join(process.cwd(), '../../content/blog');

export async function getBlogPosts() {
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const fullPath = path.join(blogDir, file);
      const content = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(content);
      return {
        slug: data.slug || file.replace('.md', ''),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.publishedAt || '',
        ...data,
      };
    });
  return posts.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
}

export async function getBlogPost(slug: string) {
  const fullPath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.publishedAt || '',
    ...data,
  };
}
