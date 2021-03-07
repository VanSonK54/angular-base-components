import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaseComponent } from './add-base.component';

describe('AddBaseComponent', () => {
  let component: AddBaseComponent;
  let fixture: ComponentFixture<AddBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
