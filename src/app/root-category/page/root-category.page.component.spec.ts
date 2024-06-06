import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCategoryPageComponent } from './root-category.page.component';

describe('RootCategoryPageComponent', () => {
  let component: RootCategoryPageComponent;
  let fixture: ComponentFixture<RootCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootCategoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
