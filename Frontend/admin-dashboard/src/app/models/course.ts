import { Category } from './category';

export interface Course {
  _id: string;
  name: string;
  description: string;
  points: number;
  categories: Category[];
}
