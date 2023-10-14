import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from 'src/app/models/api-response';
import { Course } from 'src/app/models/course';
import { CourseDto } from 'src/app/models/course-dto';
import { CourseService } from 'src/app/services/course.service';
import { SharedDataService } from 'src/app/services/shared.data.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.sass']
})
export class CourseEditComponent implements OnInit {
receivedId?: string;
constructor(private courseService: CourseService,private dataService: SharedDataService) {
}

ngOnInit() {
  // You can use this.courseId in the ngOnInit method or other component logic
    this.dataService.currentId.subscribe(id => {
    this.receivedId = id;
    this.loadCourseDetailsById(parseInt(this.receivedId, 10));
  });

}
errorResponse?: ApiResponse; // Initialize with default values



course=new CourseDto(0,'','');
submitted=false;
success?:string;
onSubmit(){
  this.submitted=true;
  this.updateCourse(this.course)
  console.log(this.course);
}


updateCourse(course:CourseDto) {
  console.log('Course Before Update: '+course.id+' : '+course.name+' : '+course.description)
  if(course.id > 0 && course.name != null){
  this.courseService.update(course)
    .subscribe(
      (response: any) => {
        course=response;
        if (course.id > 0) {
          this.handleSuccessResponse(response);
        } else if(response.code == 409){
          this.handleValidationErrorResponse(response);
        }
        console.log('Api Response => ', response);
      },
      (error: ApiResponse) => {
        this.handleErrorResponse(error);
      }
    );
  }
}

handleSuccessResponse(response: ApiResponse) {
  this.success = 'Updated Successfully.';
  this.errorResponse = undefined; // Clear any previous errors
}

handleValidationErrorResponse(response: ApiResponse) {
  this.success = undefined; // Clear any previous success message
  this.errorResponse = response; // Display validation errors
}

handleErrorResponse(error: ApiResponse) {
  this.success = ''; // Clear previous success message
  this.errorResponse = error; // Display error response
  console.error(':: Error Course Update =>', this.errorResponse);
}


loadCourseDetailsById(id: number): void {
  // alert(' ID '+id);
    this.courseService.get(id).subscribe(
      (course: CourseDto) => {
        this.course = course; // Assign the retrieved course to the component variable
        alert('Course........ID '+this.course.id)
      },
      (error) => {
        console.error('Error fetching course details', error);
      }
    );

}

}
