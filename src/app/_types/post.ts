import { Category } from "./Category";

export interface PostCategory {
  id: number;
  postId: number;
  categoryId: number;
  category: Category;
}
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  postCategories: PostCategory[];

  thumbnailImageKey: string;
}

export interface PostInput {
  title: string;
  content: string;
  thumbnailImageKey: string;
  categories: Category[];
}
