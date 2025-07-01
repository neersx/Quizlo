import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsList } from './blogs-list';

describe('BlogsList', () => {
  let component: BlogsList;
  let fixture: ComponentFixture<BlogsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
