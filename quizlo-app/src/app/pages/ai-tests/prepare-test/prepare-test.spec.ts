import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareTest } from './prepare-test';

describe('PrepareTest', () => {
  let component: PrepareTest;
  let fixture: ComponentFixture<PrepareTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrepareTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrepareTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
