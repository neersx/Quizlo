import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLoader } from './grid-loader';

describe('GridLoader', () => {
  let component: GridLoader;
  let fixture: ComponentFixture<GridLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridLoader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
