export interface Book {
  title: string;
  authors?: string[];
  categories?: string[];
  imageLinks?: ImageLinks;
  description?: string;
}

 interface ImageLinks {
  thumbnail: string;
  xthumbnail: string;
  small: string;
}

export interface BookCard extends Book {
  src: string | undefined;
  address: string;
}

