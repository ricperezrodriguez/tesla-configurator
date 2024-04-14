import { Pipe, PipeTransform } from '@angular/core';
import { Config } from '../../core/models/carOption.interface';

@Pipe({
  name: 'rangeSpeed',
  standalone: true,
})
export class RangeSpeedPipe implements PipeTransform {
  transform(value: Config | null, ...args: unknown[]): unknown {
    return value
      ? `Range: ${value.range} miles - Max speed: ${value.speed}`
      : '';
  }
}
