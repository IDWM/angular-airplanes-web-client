import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AirplaneService } from '../services/airplane.service';
import { Airplane } from '../interfaces/airplane';

export const airplaneListResolver: ResolveFn<Airplane[]> = (_route, _state) => {
  const airplaneService = inject(AirplaneService);

  return airplaneService.getAirplanes();
};
