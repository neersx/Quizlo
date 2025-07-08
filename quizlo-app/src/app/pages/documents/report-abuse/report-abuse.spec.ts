import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAbuse } from './report-abuse';

describe('ReportAbuse', () => {
  let component: ReportAbuse;
  let fixture: ComponentFixture<ReportAbuse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportAbuse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAbuse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
