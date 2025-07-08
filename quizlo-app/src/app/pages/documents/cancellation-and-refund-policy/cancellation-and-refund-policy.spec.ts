import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationAndRefundPolicy } from './cancellation-and-refund-policy';

describe('CancellationAndRefundPolicy', () => {
  let component: CancellationAndRefundPolicy;
  let fixture: ComponentFixture<CancellationAndRefundPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationAndRefundPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancellationAndRefundPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
