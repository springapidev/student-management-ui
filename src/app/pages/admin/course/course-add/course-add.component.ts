import { Component,OnInit } from '@angular/core';
import { CoursePageResponse } from 'src/app/models/course-page-response';
import { CourseService } from 'src/app/services/course.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/models/api-response';
import { Course } from 'src/app/models/course';
import { HttpStatusCode } from '@angular/common/http';
import { CourseDto } from 'src/app/models/course-dto';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.sass']
})
export class CourseAddComponent {
  errorResponse?: ApiResponse; // Initialize with default values

  constructor(private courseService: CourseService) { }


  course=new CourseDto(0,'','');
  submitted=false;
  success?:string;
  onSubmit(){
    this.submitted=true;
    this.addCourse(this.course)
    console.log(this.course);
  }

  newCourse() {
    this.course = new CourseDto(0,'', '');
    this.success='';
    this.errorResponse=undefined;
  }



  addCourse(course:CourseDto) {
    this.courseService.addCourse(course)
      .subscribe(
        (response: any) => {
          course=response;
          if (course.id > 0) {
            this.handleSuccessResponse(response);
          } else if(response.code == 409){
            this.handleValidationErrorResponse(response);
          }
          console.log('Reza Api Response => ', response);
        },
        (error: ApiResponse) => {
          this.handleErrorResponse(error);
        }
      );
  }
  
  handleSuccessResponse(response: ApiResponse) {
    this.success = 'Student Added Successfully.';
    this.errorResponse = undefined; // Clear any previous errors
  }
  
  handleValidationErrorResponse(response: ApiResponse) {
    this.success = undefined; // Clear any previous success message
    this.errorResponse = response; // Display validation errors
  }
  
  handleErrorResponse(error: ApiResponse) {
    this.success = ''; // Clear previous success message
    this.errorResponse = error; // Display error response
    console.error(':: Error adding student =>', this.errorResponse);
  }

  
}
