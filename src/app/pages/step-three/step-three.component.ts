import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CarSelectedService } from '../../core/services/car-selected.service';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { RangeSpeedPipe } from '../../shared/pipes/range-speed.pipe';
import { CarSelected } from '../../core/models/carModelSelected.interface';
import { Observable, map } from 'rxjs';

interface VmStepThree {
  car: CarSelected;
  total: number;
}
@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, RangeSpeedPipe, CurrencyPipe],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent {
  private readonly _carSelectedService = inject(CarSelectedService);

  vm$: Observable<VmStepThree> = this._carSelectedService.carSelected$.pipe(
    map((car) => {
      let total = car.config?.price ?? 0;
      total += car.color?.price ?? 0;
      total += car.option?.towHitch ? 1000 : 0;
      total += car.option?.yoke ? 1000 : 0;

      return { car, total };
    })
  );
}
