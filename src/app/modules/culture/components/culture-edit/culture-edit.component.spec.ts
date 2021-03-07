import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureEditComponent } from './culture-edit.component';

describe('CultureEditComponent', () => {
  let component: CultureEditComponent;
  let fixture: ComponentFixture<CultureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultureEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
