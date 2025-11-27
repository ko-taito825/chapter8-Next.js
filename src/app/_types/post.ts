import { Category } from "./Category";

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  postCategories: { category: Category }[];
  thumbnailImageKey: string;
}

// interface Post {
//   post: {
//     id: number;
//     content: string;
//     title: string;
//     thumbnailUrl: string;
//     postCategories: {
//       id: number;
//       postId: number;
//       categoryId: number;
//       createdAt: Date;
//       updatedAt: Date;
//       category: {
//         id: number;
//         name: string;
//       };
//     }[];
//   };
// }
