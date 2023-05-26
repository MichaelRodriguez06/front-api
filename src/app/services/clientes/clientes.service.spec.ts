import { TestBed } from '@angular/core/testing';

import { AirplaneFlightService } from './airplane-flight.service';

describe('ClientesService', () => {
  let service: AirplaneFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirplaneFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
