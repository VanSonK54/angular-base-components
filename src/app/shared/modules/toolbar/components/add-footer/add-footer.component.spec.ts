import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFooterComponent } from './add-footer.component';

describe('AddFooterComponent', () => {
  let component: AddFooterComponent;
  let fixture: ComponentFixture<AddFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
