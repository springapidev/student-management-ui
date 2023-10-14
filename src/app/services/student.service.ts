import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentPageResponse } from '../models/student-page-response';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Student } from '../models/student';
import { StudentDto } from '../models/student-dto';
import { StudentAssignedDto } from '../models/student-assigned-dto';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private STUDENT_API_ROOL_URL = 'http://localhost:8080/api/v1/student/';

  constructor(private http: HttpClient) { }
  getAllStudents():Observable<StudentPageResponse>{
    return this.http.get<StudentPageResponse>(this.STUDENT_API_ROOL_URL+'list');
  }
 
  
  addStudent(student: StudentDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.STUDENT_API_ROOL_URL+'add', student);
  }
  get(id: any): Observable<Student> {
    return this.http.get<Student>(`${this.STUDENT_API_ROOL_URL}/find/${id}`);
  }
 

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.STUDENT_API_ROOL_URL}+"update"`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.STUDENT_API_ROOL_URL}+${id}`);
  }

 
  getStudentsWithPagination(page: number, pageSize: number, name:string,sortDirection:string): Observable<StudentPageResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString())
      .set('name',name)
      .set('direction',sortDirection);
    return this.http.get<StudentPageResponse>(this.STUDENT_API_ROOL_URL+'search', { params });
  }
  assignStudent(studentDto: StudentAssignedDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.STUDENT_API_ROOL_URL+'assign-courses', studentDto);
  }
}
