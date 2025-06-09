export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface News {
  id: string;
  title: string;
  description: string;
  categoryId: number;
}
