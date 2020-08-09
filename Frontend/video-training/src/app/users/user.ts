import { Course } from '../courses/course';
export interface User {
  _id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  courses: Course[];
}
