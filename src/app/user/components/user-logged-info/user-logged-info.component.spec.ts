import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoggedInfoComponent } from './user-logged-info.component';

describe('UserLoggedInfoComponent', () => {
  let component: UserLoggedInfoComponent;
  let fixture: ComponentFixture<UserLoggedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoggedInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoggedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
