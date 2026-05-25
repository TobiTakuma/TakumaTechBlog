import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sorted = posts.sort(
    (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: "Toiyama Takuma's Blog",
    description: 'Notes, discoveries, and writings by Takuma Toiyama.',
    site: context.site ?? 'https://takumatechblog.pages.dev',
    items: sorted.map((post: CollectionEntry<'blog'>) => {
      const link = post.data.url
        ? `/${post.data.url}/`
        : `/blog/${post.id.replace(/\.md$/, '')}/`;
      return {
        title: post.data.title_en ?? post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description ?? '',
        link,
      };
    }),
  });
}
