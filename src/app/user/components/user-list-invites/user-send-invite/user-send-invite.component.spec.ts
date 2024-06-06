import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSendInviteComponent } from './user-send-invite.component';

describe('UserSendInviteComponent', () => {
  let component: UserSendInviteComponent;
  let fixture: ComponentFixture<UserSendInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSendInviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSendInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
