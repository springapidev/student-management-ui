import { HttpStatusCode } from "@angular/common/http";
import { ApiError } from "./api-error";

export class ApiResponse {
    status:HttpStatusCode;
    code:number;
    errors:ApiError[];
    constructor(status:HttpStatusCode, code:number,errors:ApiError[]){
        this.status=status;
        this.code=code;
        this.errors=errors;
    }
        
}
