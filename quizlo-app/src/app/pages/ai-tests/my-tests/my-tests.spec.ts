import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTests } from './my-tests';

describe('MyTests', () => {
  let component: MyTests;
  let fixture: ComponentFixture<MyTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
