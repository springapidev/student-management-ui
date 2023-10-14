import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeftSidebarComponent } from './admin-left-sidebar.component';

describe('AdminLeftSidebarComponent', () => {
  let component: AdminLeftSidebarComponent;
  let fixture: ComponentFixture<AdminLeftSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLeftSidebarComponent]
    });
    fixture = TestBed.createComponent(AdminLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
