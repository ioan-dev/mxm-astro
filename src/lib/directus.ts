import { createDirectus, rest } from '@directus/sdk';

type Global = {
  title: string;
  description: string;
}

type Author = {
  name: string
}

type Page = {
  title: string;
  content: string;
  slug: string;
}

type Post = {
  image: string;
  title: string;
  author: Author;
  content: string;
  published_date: string
  slug: string;
}

type HomePage = {
  title: string;
}

type Schema = {
  posts: Post[];
  global: Global;
  pages: Page[];
  home_page: HomePage;
}

const directus = createDirectus<Schema>('http://localhost:8055').with(rest());

export default directus;
