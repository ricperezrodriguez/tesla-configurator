import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OptionsService } from '../../core/services/options.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Observable,
  combineLatest,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CarOption, Config } from '../../core/models/carOption.interface';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { CarSelectedService } from '../../core/services/car-selected.service';
import { RangeSpeedPipe } from '../../shared/pipes/range-speed.pipe';

interface StepTwoForm {
  config: FormControl<string | null>;
  towHitch: FormControl<boolean | null>;
  yoke: FormControl<boolean | null>;
}

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule, CurrencyPipe, RangeSpeedPipe],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent {
  private readonly _modelsService = inject(OptionsService);
  private readonly _carSelectedService = inject(CarSelectedService);
  configSelected: Config | null = null;

  formStepTwo = new FormGroup<StepTwoForm>({
    config: new FormControl(null, [Validators.required]),
    towHitch: new FormControl(false, { nonNullable: true }),
    yoke: new FormControl(false, { nonNullable: true }),
  });

  prevCarSelected$ = this._carSelectedService.carSelected$.pipe(
    take(1),
    tap((car) => {
      this.formStepTwo.patchValue({
        config: car.config?.id.toString() ?? null,
      });
      this.formStepTwo.patchValue({ towHitch: car.option?.towHitch ?? false });
      this.formStepTwo.patchValue({ yoke: car.option?.yoke ?? false });
    })
  );

  carOption$ = this._carSelectedService.carSelected$.pipe(
    take(1),
    map((car) => car.carModel?.code ?? null),
    filter((carModel) => carModel !== null),
    switchMap((carModel) => this._modelsService.getOptions(carModel ?? ''))
  );

  vm$: Observable<CarOption> = combineLatest({
    carOption: this.carOption$,
    formValue: this.formStepTwo.valueChanges.pipe(startWith(null)),
    prevCarSelected: this.prevCarSelected$,
  }).pipe(
    map(({ carOption, formValue }) => {
      formValue && this._saveData(carOption, formValue);
      return carOption;
    })
  );

  private _saveData(
    carOption: CarOption,
    formValue: Partial<{
      config: string | null;
      towHitch: boolean | null;
      yoke: boolean | null;
    }>
  ) {
    if (this.formStepTwo.valid) {
      this.configSelected =
        carOption.configs.find((c) => c.id === Number(formValue.config)) ??
        null;

      const optionSelected = {
        towHitch: this.formStepTwo.controls.towHitch.value ?? false,
        yoke: this.formStepTwo.controls.yoke.value ?? false,
      };

      this._carSelectedService.setConfigOption(
        this.configSelected,
        optionSelected
      );
    }
  }
}
