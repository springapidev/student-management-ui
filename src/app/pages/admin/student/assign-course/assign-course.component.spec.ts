import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCourseComponent } from './assign-course.component';

describe('AssignCourseComponent', () => {
  let component: AssignCourseComponent;
  let fixture: ComponentFixture<AssignCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignCourseComponent]
    });
    fixture = TestBed.createComponent(AssignCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
