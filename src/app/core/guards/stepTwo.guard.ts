import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CarSelectedService } from '../services/car-selected.service';

export const stepTwoGuard: CanActivateFn = (route, state) => {
  const carSelectedService = inject(CarSelectedService);
  return carSelectedService.enabledStepTwo$;
};
