import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTests } from './user-tests';

describe('UserTests', () => {
  let component: UserTests;
  let fixture: ComponentFixture<UserTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
