import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoader } from './form-loader';

describe('FormLoader', () => {
  let component: FormLoader;
  let fixture: ComponentFixture<FormLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
