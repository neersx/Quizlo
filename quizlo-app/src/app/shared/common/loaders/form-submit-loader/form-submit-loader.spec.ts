import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmitLoader } from './form-submit-loader';

describe('FormSubmitLoader', () => {
  let component: FormSubmitLoader;
  let fixture: ComponentFixture<FormSubmitLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSubmitLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmitLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
