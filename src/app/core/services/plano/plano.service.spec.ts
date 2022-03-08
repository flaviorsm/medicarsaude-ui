import { TestBed } from '@angular/core/testing';

import { PlanoService } from './plano.service';

describe('PlanoService', () => {
  let service: PlanoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
