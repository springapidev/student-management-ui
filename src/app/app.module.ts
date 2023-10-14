import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './layouts/admin/admin-header/admin-header.component';
import { AdminLeftSidebarComponent } from './layouts/admin/admin-left-sidebar/admin-left-sidebar.component';
import { AdminFooterComponent } from './layouts/admin/admin-footer/admin-footer.component';
import { PublicLayoutComponent } from './layouts/public/public-layout/public-layout.component';
import { PublicHeaderComponent } from './layouts/public/public-header/public-header.component';
import { PublicFooterComponent } from './layouts/public/public-footer/public-footer.component';
import { HomeComponent } from './pages/public/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CourseListComponent } from './pages/admin/course/course-list/course-list.component';
import { CourseAddComponent } from './pages/admin/course/course-add/course-add.component';
import { StudentListComponent } from './pages/admin/student/student-list/student-list.component';
import { StudentAddComponent } from './pages/admin/student/student-add/student-add.component';
import { AssignCourseComponent } from './pages/admin/student/assign-course/assign-course.component';
import { NotFoundComponent } from './pages/other/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { StudentEditComponent } from './pages/admin/student/student-edit/student-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminLeftSidebarComponent,
    AdminFooterComponent,
    PublicLayoutComponent,
    PublicHeaderComponent,
    PublicFooterComponent,
    HomeComponent,
    DashboardComponent,
    CourseListComponent,
    CourseAddComponent,
    StudentListComponent,
    StudentAddComponent,
    AssignCourseComponent,
    NotFoundComponent,
    StudentEditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
