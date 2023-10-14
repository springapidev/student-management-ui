import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response';
import { Course } from 'src/app/models/course';
import { CoursePageResponse } from 'src/app/models/course-page-response';
import { Student } from 'src/app/models/student';
import { StudentAssignedDto } from 'src/app/models/student-assigned-dto';
import { StudentPageResponse } from 'src/app/models/student-page-response';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-assign-course',
  templateUrl: './assign-course.component.html',
  styleUrls: ['./assign-course.component.sass']
})
export class AssignCourseComponent implements OnInit{
  constructor(private courseService: CourseService, private studentService:StudentService,private cdr: ChangeDetectorRef){}

  errorResponse?: ApiResponse; // Initialize with default values
  success?:string;
  courses:Course[]=[];
  studentDto?:StudentAssignedDto;
  selectedStudentId:number=0;
  studentSelected = false;
  coursesSelected = false;


  // Course Related 
  coursePageResponsePagination: CoursePageResponse | null = null; 
  currentPage: number = 1;
  itemsPerPage: number = 10;
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
 
  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  loadCourses(){
    this.courseService.getCoursesWithPagination(this.currentPage,this.itemsPerPage,this.filterTerm,this.sortDirection).subscribe({
      next:data =>{
        this.coursePageResponsePagination=data;
        this.totalPages = data.totalPages;
        this.totalItems=data.totalItems; 
      },
      error: err => {
        // Implement error here........
      }
        
    });

  }
  // Student Related
  studentPageResponsePagination: StudentPageResponse | null = null; // Initialize as null
  currentPageStudent: number = 1;
  itemsPerPageStudent: number = 10;
  filterTermStudent: string = 'a';
  totalPagesStudent: number=0;
  totalItemsStudent:number=0;
  sortDirectionStudent:string='ASC'
   filterDataStudent() {
    this.loadStudents();
  }
  sortDataStudent(){
    this.loadStudents();
  }

  setPageStudent(page: number) {
    if (page >= 1 && page <= this.totalPagesStudent) {
      this.currentPageStudent = page;
    }
  }
  
  previousPageStudent() {
    this.setPageStudent(this.currentPageStudent - 1);
    this.loadStudents();
  }
  
  nextPageStudent() {
    this.setPageStudent(this.currentPageStudent + 1);
    this.loadStudents();
  }
 

  loadStudents():void {    
    this.studentService.getStudentsWithPagination(this.currentPageStudent,this.itemsPerPageStudent,this.filterTermStudent,this.sortDirectionStudent).subscribe({
      next:data =>{
        this.studentPageResponsePagination=data;
        this.totalPagesStudent = data.totalPages;
        this.totalItemsStudent=data.totalItems;
      },
      error: err => {
        // Implement Error Here
      }
    });
  }
    // Now Assign Courses
    assignCourses() {
      if(this.selectedStudentId > 0 && this.courses.length > 0){
       
        const studentAssignedDto = new StudentAssignedDto(this.selectedStudentId, this.courses);
        this.assignCourse(studentAssignedDto);
        this.courses=[];
        this.selectedStudentId=0;
  
        this.loadCourses();
        this.loadStudents();
        this.cdr.detectChanges();
       this.success="Courses Assigned Successfully";
      }else{
        alert('Select Student and Courses Also');
      }

     }
    
  
  courseToggleSelection(course: Course):void{
    console.log('Hi..........'+course);
    const index = this.courses.findIndex(selectedCourse => selectedCourse.id === course.id);
      if (index === -1) {
        // Course not in the courses array, so add it.
        this.courses.push(course);
      } else {
        // Course is in the courses array, so remove it.
        this.courses.splice(index, 1);
      }
      this.updateSelections();
  }

  studentToggleSelection(studentId: number):void{
    console.log('Hi..........'+studentId);
    this.selectedStudentId = studentId;
    this.updateSelections();
   //   alert("Selected Student ID: "+this.selectedStudentId)
  }
  updateSelections() {
    this.studentSelected = !!this.selectedStudentId;
    this.coursesSelected = this.courses.length > 0;
    this.success='';
  }
  



  assignCourse(studentDto:StudentAssignedDto) {
    this.studentService.assignStudent(studentDto)
      .subscribe(
        (response: any) => {
          const code= this.errorResponse=response;
          if (code == 202) {
            this.handleSuccessResponse(response);
          } 
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
  
  
  handleErrorResponse(error: ApiResponse) {
    this.success = ''; // Clear previous success message
    this.errorResponse = error; // Display error response
    console.error(':: Error Assigning student =>', this.errorResponse);
  }


}

