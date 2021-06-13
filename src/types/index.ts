export interface microcmsList {
  contents: article[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface article {
  id: string;
  title: string;
  description: string;
  tags: tag[] | null;
  ogimage: image | null;
  body: (richText | textWithRightImage | linkCard)[];
  books: book[] | null;
  author: author | null;
  publishedAt?: Date;
  revisedAt?: Date;
}

export interface richText {
  fieldId: 'richText';
  richText: HTMLElement;
}

export interface textWithRightImage {
  fieldId: 'textWithRightImage';
  text: HTMLElement;
  image: image;
  caption: string | null;
}

export interface linkCard {
  fieldId: 'linkCard';
  url: string;
  ogp: ogp;
}

export interface ogp {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export interface image {
  url: string;
}

export interface tag {
  id: string;
  name: string;
}

export interface book {
  fieldId: 'book';
  image: image;
  title: string;
  author: string;
  url: string;
}

export interface author {
  name: string;
  profile: string;
  image: image;
  twitter: string | null;
  github: string | null;
}