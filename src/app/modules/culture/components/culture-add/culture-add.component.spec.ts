import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultureAddComponent } from './culture-add.component';

describe('CultureAddComponent', () => {
  let component: CultureAddComponent;
  let fixture: ComponentFixture<CultureAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CultureAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CultureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
