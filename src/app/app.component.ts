import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CarSelectedService } from './core/services/car-selected.service';
import { ImagePipe } from './shared/pipes/image.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgClass,
    ImagePipe,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly _carSelectedService = inject(CarSelectedService);

  car$ = this._carSelectedService.carSelected$;
  enableStepTwo$ = this._carSelectedService.enabledStepTwo$;
  enableStepThree$ = this._carSelectedService.enabledStepThree$;
}
