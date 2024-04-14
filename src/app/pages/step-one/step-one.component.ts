import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModelsService } from '../../core/services/models.service';
import { CarModel } from '../../core/models/carModel.interface';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Observable, combineLatest, map, startWith, take, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CarSelectedService } from '../../core/services/car-selected.service';
import {
  CarModelSelected,
  ColorSelected,
} from '../../core/models/carModelSelected.interface';

interface StepOneForm {
  model: FormControl<string | null>;
  color: FormControl<string | null>;
}

interface VmStepOne {
  modelsItems: CarModelSelected[];
  colorsItems: ColorSelected[];
}

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent {
  private readonly _modelsService = inject(ModelsService);
  private readonly _carSelectedService = inject(CarSelectedService);
  private _saveData = false;

  formStepOne = new FormGroup<StepOneForm>({
    model: new FormControl(null, [Validators.required]),
    color: new FormControl(null, [Validators.required]),
  });

  prevCarSelected$ = this._carSelectedService.carSelected$.pipe(
    take(1),
    tap((car) => {
      this.formStepOne.patchValue(
        { model: car.carModel?.code ?? null },
        { emitEvent: false }
      );
      this.formStepOne.patchValue(
        { color: car.color?.code ?? null },
        { emitEvent: false }
      );
    })
  );

  vm$: Observable<VmStepOne> = combineLatest({
    carModels: this._modelsService.getModels(),
    formModelValue: this.formStepOne.controls.model.valueChanges.pipe(
      tap(() => {
        this._saveData = true;
        this.formStepOne.patchValue({ color: null }, { emitEvent: false });
      }),
      startWith(null)
    ),
    formColorValue: this.formStepOne.controls.color.valueChanges.pipe(
      tap(() => (this._saveData = true)),
      startWith(null)
    ),
    prevCarSelected: this.prevCarSelected$,
  }).pipe(
    map(({ carModels }) => {
      return this._mapItems(carModels);
    })
  );

  private _mapItems(carModels: CarModel[]): VmStepOne {
    const modelsItems = carModels.map((v) => ({
      code: v.code,
      description: v.description,
    }));

    const colorsItems =
      carModels.find((v) => v.code === this.formStepOne.controls.model.value)
        ?.colors ?? [];

    if (this._saveData) {
      this._saveData = false;
      this._carSelectedService.setModelColor(
        modelsItems.find(
          (v) => v.code === this.formStepOne.controls.model.value
        ) ?? null,
        colorsItems.find(
          (v) => v.code === this.formStepOne.controls.color.value
        ) ?? null
      );
    }

    return { modelsItems, colorsItems };
  }
}
