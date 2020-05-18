export interface CardInterface {
  _id: string;
  name: string;
  type?: string;
  description?: string;
  quantity: number;
  image?: Thumbnail[];
}

export interface Thumbnail {
  url: string;
  title?: string;
}
