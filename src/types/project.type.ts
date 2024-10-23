export interface IProject {
  _id: string;
  title: string;
  image: string;
  description: string;
  content: string;
  technologies: ITechnology[];
  frontendGithubLink: string;
  backendGithubLink: string;
  frontendLiveLink: string;
  backendLiveLink: string;
  isFeatured: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITechnology {
  _id: string;
  name: string;
  image: string;
}
