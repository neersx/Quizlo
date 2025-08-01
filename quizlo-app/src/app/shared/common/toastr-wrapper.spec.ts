import { TestBed } from '@angular/core/testing';

import { ToastrWrapper } from './toastr-wrapper';

describe('ToastrWrapper', () => {
  let service: ToastrWrapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrWrapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
