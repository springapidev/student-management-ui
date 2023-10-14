import { Course } from "./course";

export class StudentAssignedDto {   
    id:number;
    courses: Course[] = [];

    constructor( id:number,courses:Course[]){
        this.id=id;
       this.courses=courses;
    }
}
