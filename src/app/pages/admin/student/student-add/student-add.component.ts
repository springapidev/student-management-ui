import { Component } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { StudentDto } from 'src/app/models/student-dto';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.sass']
})
export class StudentAddComponent {
  errorResponse?: ApiResponse; // Initialize with default values

  constructor(private studentService: StudentService) { }


  student=new StudentDto(0,'','','',0,'');
  submitted=false;
  success?:string;
  onSubmit(){
    this.submitted=true;
    this.addStudent(this.student)
    console.log(this.student);
  }

  reset() {
    this.student=new StudentDto(0,'','','',0,'');
    this.success='';
    this.errorResponse=undefined;
  }



  addStudent(student: StudentDto) {
    this.studentService.addStudent(student)
      .subscribe(
        (response: any) => {
          student=response;
          if (student.id > 0) {
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

