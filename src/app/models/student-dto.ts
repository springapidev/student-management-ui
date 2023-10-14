import { Course } from "./course";

export class StudentDto {
    id:number;
    name:string;
    phone:string;
    email:string;
    roll:number;
    address:string;

    constructor( id:number,name:string,phone:string,email:string,roll:number,address:string){
        this.id=id;
        this.name=name;      
        this.phone=phone;
        this.email=email;
        this.roll=roll;
        this.address=address;    
    }
}
