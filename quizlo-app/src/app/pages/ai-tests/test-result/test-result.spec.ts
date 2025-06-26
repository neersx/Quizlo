import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResult } from './test-result';

describe('TestResult', () => {
  let component: TestResult;
  let fixture: ComponentFixture<TestResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
