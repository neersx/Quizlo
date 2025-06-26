import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveTest } from './live-test';

describe('LiveTest', () => {
  let component: LiveTest;
  let fixture: ComponentFixture<LiveTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
