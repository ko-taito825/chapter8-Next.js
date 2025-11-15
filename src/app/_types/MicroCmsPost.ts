export interface MicroCmsPost {
  id: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  postCategories: {
    category: {
      id: number;
      name: string;
    };
  }[];
}
