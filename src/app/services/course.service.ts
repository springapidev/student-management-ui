import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { CoursePageResponse } from '../models/course-page-response';
import { ApiResponse } from '../models/api-response';
import { Course } from '../models/course';
import { CourseDto } from '../models/course-dto';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private COURSE_API_ROOL_URL = 'http://localhost:8080/api/v1/course/';

  constructor(private http: HttpClient) { }
  getAllCourses():Observable<CoursePageResponse>{
    return this.http.get<CoursePageResponse>(this.COURSE_API_ROOL_URL+'list');
  }
 
  
  addCourse(courseDto: CourseDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.COURSE_API_ROOL_URL+'add', courseDto);
  }
  get(id: any): Observable<CourseDto> {
    return this.http.get<CourseDto>(`${this.COURSE_API_ROOL_URL}find/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.COURSE_API_ROOL_URL+'add', data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${this.COURSE_API_ROOL_URL}+"update"`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.COURSE_API_ROOL_URL}+${id}`);
  }


  getCoursesWithPagination(page: number, pageSize: number, name:string,sortDirection:string): Observable<CoursePageResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', pageSize.toString())
      .set('name',name)
      .set('direction',sortDirection);
    console.log("URL=> "+this.COURSE_API_ROOL_URL+'search', { params })
    console.log('Data at Service level',this.http.get<CoursePageResponse>(this.COURSE_API_ROOL_URL+'search', { params })); 
    return this.http.get<CoursePageResponse>(this.COURSE_API_ROOL_URL+'search', { params });
  }
}
