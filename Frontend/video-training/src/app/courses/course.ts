import { User } from '../users/user';
export interface Course {
  _id: number;
  name: string;
  description: string;
  points: number;
  users: User[];
}
