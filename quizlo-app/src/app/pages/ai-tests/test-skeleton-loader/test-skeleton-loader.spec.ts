import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSkeletonLoader } from './test-skeleton-loader';

describe('TestSkeletonLoader', () => {
  let component: TestSkeletonLoader;
  let fixture: ComponentFixture<TestSkeletonLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSkeletonLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSkeletonLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
