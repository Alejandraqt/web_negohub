import { TestBed } from '@angular/core/testing';

import { categoria } from './categoriaServ';

describe('categoria', () => {
  let service: categoria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(categoria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
