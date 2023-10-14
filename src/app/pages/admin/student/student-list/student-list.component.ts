import { HttpStatusCode } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ApiError } from 'src/app/models/api-error';
import { ApiResponse } from 'src/app/models/api-response';
import { StudentPageResponse } from 'src/app/models/student-page-response';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.sass']
})
export class StudentListComponent implements OnInit{
  constructor(private studentService : StudentService){}
  studentPageResponse: StudentPageResponse | null = null; // Initialize as null
  studentPageResponsePagination: StudentPageResponse | null = null; // Initialize as null
  errorResponse: ApiResponse = new ApiResponse(HttpStatusCode.Ok, 0, []); // Initialize with default values

  ngOnInit(): void {
    this.getAllStudents();
    this.loadStudents();
  }
getAllStudents():void{
  this.studentService.getAllStudents().subscribe({
    next:data =>{
      this.studentPageResponse=data;
      console.log(this.studentPageResponse);
      
      this.errorResponse.errors=[new ApiError('OK...........')]
      console.log('Api Response => '+this.errorResponse.code+' : '+this.errorResponse.status+' : '+this.errorResponse.errors[0].errorMessage);
      
    },
    error: err => {
      if (err.error) {
        try {
          const res = JSON.parse(err.error);
          console.log('Error LOG => '+res)
          this.errorResponse.status=res.message;
          this.errorResponse.code=err.status;
          this.errorResponse.errors=[new ApiError('OK...........')]
          console.log('in Try : Api Error Response => '+this.errorResponse.code+' : '+this.errorResponse.status+' : '+this.errorResponse.errors);
        } catch {
          const res = JSON.parse(err.error);
          console.log('In Catch : =====At Error : Api Error res => '+res);
          this.errorResponse.code=err.status;
          this.errorResponse.errors=err.statusText;
          this.errorResponse.errors=[new ApiError('Internal Server Error!')]
        }
      } else {
        this.errorResponse.code=err.status;
        this.errorResponse.errors=err.statusText;
        const res = JSON.parse(err.error);
        console.log('In Else : =====At Error : Api Error res => '+res);
      }
    }
  });
}

  refreshList(): void {
    this.getAllStudents(); 
  }
  deleteStudent(id:number){
    if(confirm('Are You Sure to Delete this Student?'))
    this.studentService.delete(id).subscribe({
      next: (res) => {
        console.log('Response=> ', res);      
        this.errorResponse=res;
        if(this.errorResponse.code == 226){
          this.refreshList();
          alert('Student Deleted Successfully');
        }else if(this.errorResponse.code == 409){
          alert('This Student already enrolled,So you can not delete');
        }
        
      },
      error: (e) => console.error(e)
    });
  }


  
  ////////////////// Filter & Pagination ///////////////////////////////////

  // Variables for pagination and filtering
  currentPage: number = 1;
  itemsPerPage: number = 3;
  filterTerm: string = 'a';
  totalPages: number=0;
  totalItems:number=0;
  sortDirection:string='ASC'
   filterData() {
    this.loadStudents();
  }
  sortData(){
    this.loadStudents();
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  previousPage() {
    this.setPage(this.currentPage - 1);
    this.loadStudents();
  }
  
  nextPage() {
    this.setPage(this.currentPage + 1);
    this.loadStudents();
  }
 

  loadStudents():void {    
    this.studentService.getStudentsWithPagination(this.currentPage,this.itemsPerPage,this.filterTerm,this.sortDirection).subscribe({
      next:data =>{
        this.studentPageResponsePagination=data;
        this.totalPages = data.totalPages;
        this.totalItems=data.totalItems;
        console.log(this.studentPageResponsePagination);
        
        this.errorResponse.errors=[new ApiError('OK...........')]
        console.log('Api Response studentPageResponsePagination => '+this.errorResponse.code+' : '+this.errorResponse.status+' : '+this.errorResponse.errors[0].errorMessage);
        
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            console.log('Error LOG => '+res)
            this.errorResponse.status=res.message;
            this.errorResponse.code=err.status;
            this.errorResponse.errors=[new ApiError('OK...........')]
            console.log('in Try : Api Error Response => '+this.errorResponse.code+' : '+this.errorResponse.status+' : '+this.errorResponse.errors);
          } catch {
            const res = JSON.parse(err.error);
            console.log('In Catch : =====At Error : Api Error res => '+res);
            this.errorResponse.code=err.status;
            this.errorResponse.errors=err.statusText;
            this.errorResponse.errors=[new ApiError('Internal Server Error!')]
          }
        } else {
          this.errorResponse.code=err.status;
          this.errorResponse.errors=err.statusText;
          const res = JSON.parse(err.error);
          console.log('In Else : =====At Error : Api Error res => '+res);
        }
      }
    });
  }
}

