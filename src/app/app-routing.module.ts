import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PublicLayoutComponent } from './layouts/public/public-layout/public-layout.component';
import { HomeComponent } from './pages/public/home/home.component';
import { CourseAddComponent } from './pages/admin/course/course-add/course-add.component';
import { AssignCourseComponent } from './pages/admin/student/assign-course/assign-course.component';
import { StudentListComponent } from './pages/admin/student/student-list/student-list.component';
import { StudentAddComponent } from './pages/admin/student/student-add/student-add.component';
import { CourseListComponent } from './pages/admin/course/course-list/course-list.component';
import { StudentEditComponent } from './pages/admin/student/student-edit/student-edit.component';
import { CourseEditComponent } from './pages/admin/course/course-edit/course-edit.component';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';


const routes: Routes = [
  {
    path:'',
    component:PublicLayoutComponent,
    children:[
      { path: '', component: HomeComponent, pathMatch: 'full',}
    ]
  },{
    path:'admin',
    component:AdminLayoutComponent,
    children:[
      { path: '', component: DashboardComponent,pathMatch: 'full'},   
      { path: 'course/add', component: CourseAddComponent },
      { path: 'course/list', component: CourseListComponent },
      { path: 'course/edit/:id', component: CourseEditComponent },
      { path: 'student/add', component: StudentAddComponent },
      { path: 'student/list', component: StudentListComponent },
      { path: 'student/assign-course', component: AssignCourseComponent },
      { path: 'student/edit/:id', component: StudentEditComponent },
    ]
  },
  { path: '**', component: NotFoundComponent }
 

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, scrollPositionRestoration: 'top',  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
