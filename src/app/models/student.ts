import { Course } from "./course";

export class Student {
    id:number;
    name:string;
    phone:string;
    email:string;
    roll:number;
    address:string;
    courses:Course[];
    createdAt:Date;
    updatedAt:Date;

    constructor( id:number,name:string,phone:string,email:string,roll:number,address:string, courses:Course[],createdAt:Date,updatedAt:Date){
        this.id=id;
        this.name=name;      
        this.phone=phone;
        this.email=email;
        this.roll=roll;
        this.address=address;
        this.courses=courses;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
}
