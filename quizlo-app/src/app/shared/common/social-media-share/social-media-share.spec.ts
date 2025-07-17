import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaShare } from './social-media-share';

describe('SocialMediaShare', () => {
  let component: SocialMediaShare;
  let fixture: ComponentFixture<SocialMediaShare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocialMediaShare]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaShare);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
