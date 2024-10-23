export type TBlog = {
  _id: string;
  title: string;
  image: string;
  description: string;
  content: string;
  categories: TCategory[];
  publishedDate: Date;
  tags: string[];
  isFeatured: boolean;
  isDeleted: boolean;
};

export type TCategory = {
  _id: string;
  name: string;
  blogs: TBlog[];
  blogCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
