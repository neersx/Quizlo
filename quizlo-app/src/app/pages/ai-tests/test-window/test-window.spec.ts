import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWindow } from './test-window';

describe('TestWindow', () => {
  let component: TestWindow;
  let fixture: ComponentFixture<TestWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWindow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
