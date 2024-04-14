import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CarModelSelected,
  CarSelected,
  ColorSelected,
  ConfigSelected,
  OptionSelected,
} from '../models/carModelSelected.interface';

@Injectable({
  providedIn: 'root',
})
export class CarSelectedService {
  private _carSelected$ = new BehaviorSubject<CarSelected>({
    carModel: null,
    color: null,
    config: null,
    option: null,
  });
  carSelected$ = this._carSelected$.asObservable();

  private _enabledStepTwo$ = new BehaviorSubject<boolean>(false);
  enabledStepTwo$ = this._enabledStepTwo$.asObservable();

  private _enabledStepThree$ = new BehaviorSubject<boolean>(false);
  enabledStepThree$ = this._enabledStepThree$.asObservable();

  setModelColor(
    carModel: CarModelSelected | null,
    color: ColorSelected | null
  ) {
    this._carSelected$.next({
      carModel,
      color,
      config: null,
      option: null,
    });

    const stepTwoValid = carModel !== null && color !== null;
    this._enabledStepTwo$.next(stepTwoValid);

    this._enabledStepThree$.next(false);
  }

  setConfigOption(
    config: ConfigSelected | null,
    option: OptionSelected | null
  ) {
    if (config !== null && option !== null) {
      this._carSelected$.next({
        ...this._carSelected$.value,
        config,
        option,
      });

      this._enabledStepThree$.next(true);
    }
  }
}
