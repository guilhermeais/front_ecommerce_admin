import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListInvitesComponent } from './user-list-invites.component';

describe('UserListInvitesComponent', () => {
  let component: UserListInvitesComponent;
  let fixture: ComponentFixture<UserListInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListInvitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
