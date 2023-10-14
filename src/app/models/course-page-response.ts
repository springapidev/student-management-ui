import { Course } from "./course";

export interface CoursePageResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  courses: Course[];
}
