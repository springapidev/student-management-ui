import { Student } from "./student";

export interface StudentPageResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    students: Student[];
}
