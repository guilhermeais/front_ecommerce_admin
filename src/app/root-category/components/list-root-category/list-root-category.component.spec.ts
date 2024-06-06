import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRootCategoryComponent } from './list-root-category.component';

describe('ListRootCategoryComponent', () => {
  let component: ListRootCategoryComponent;
  let fixture: ComponentFixture<ListRootCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRootCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRootCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
