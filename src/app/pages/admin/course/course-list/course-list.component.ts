import { HttpStatusCode } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiError } from 'src/app/models/api-error';
import { ApiResponse } from 'src/app/models/api-response';
import { Course } from 'src/app/models/course';
import { CoursePageResponse } from 'src/app/models/course-page-response';
import { CourseService } from 'src/app/services/course.service';
import { SharedDataService } from 'src/app/services/shared.data.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent implements OnInit{
  constructor(private courseService : CourseService,private dataService: SharedDataService){
  }
  coursePageResponse: CoursePageResponse | null = null; // Initialize as null
  coursePageResponsePagination: CoursePageResponse | null = null; // Initialize as null
  errorResponse: ApiResponse = new ApiResponse(HttpStatusCode.InternalServerError, 0, []); // Initialize with default values

  ngOnInit(): void {
   // this.getAllCourses();

    this.loadCourses();
  }
getAllCourses():void{
  this.courseService.getAllCourses().subscribe({
    next:data =>{
      this.coursePageResponse=data;
      console.log(this.coursePageResponse);
      
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
    this.getAllCourses(); 
    this.loadCourses();
  }
  deleteCourse(id:number){
    if(confirm('Are You Sure to Delete this Course?'))
    this.courseService.delete(id).subscribe({
      next: (res) => {
        console.log(res);      
        this.errorResponse=res;
        if(this.errorResponse.code == 226){
          this.refreshList();
          alert('Course Deleted Successfully');
        }else if(this.errorResponse.code == 409){
          alert('This course already enrolled,So you can not delete');
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
    this.loadCourses();
  }
  sortData(){
    this.loadCourses();
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  previousPage() {
    this.setPage(this.currentPage - 1);
    this.loadCourses();
  }
  
  nextPage() {
    this.setPage(this.currentPage + 1);
    this.loadCourses();
  }
 

  loadCourses():void {    
    this.courseService.getCoursesWithPagination(this.currentPage,this.itemsPerPage,this.filterTerm,this.sortDirection).subscribe({
      next:data =>{
        this.coursePageResponsePagination=data;
        this.totalPages = data.totalPages;
        this.totalItems=data.totalItems;
        console.log(this.coursePageResponsePagination);
        
        this.errorResponse.errors=[new ApiError('OK...........')]
        console.log('Api Response coursePageResponsePagination => '+this.errorResponse.code+' : '+this.errorResponse.status+' : '+this.errorResponse.errors[0].errorMessage);
        
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
      console.log('my Data: '+this.coursePageResponsePagination)
  }
  
  assignCourse(id:number){
    alert('Do you want to assign Me? '+id);
  }
  sendCourseIdToCourseEditPage(id: number) {
  
    const stringValue: string = `${id}`;

    this.dataService.changeId(stringValue);
   
  }
}






