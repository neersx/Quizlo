import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Faqs } from './faqs';

describe('Faqs', () => {
  let component: Faqs;
  let fixture: ComponentFixture<Faqs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Faqs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Faqs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
