import { Course } from './course';

export interface User {
  _id: string;
  name: string;
  email: string;
  courses: Course[];
  finishedCourses: Course[];
  score: number;
}
