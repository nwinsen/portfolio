import fm from "front-matter";

interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

const modules = import.meta.glob("../../../blogs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split("/").pop()!.replace(".md", "");
    const { attributes, body } = fm<BlogFrontmatter>(raw);
    return { slug, frontmatter: attributes, content: body };
  })
  .sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
