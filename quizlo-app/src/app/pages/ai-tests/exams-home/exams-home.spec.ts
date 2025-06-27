import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsHome } from './exams-home';

describe('ExamsHome', () => {
  let component: ExamsHome;
  let fixture: ComponentFixture<ExamsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamsHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
