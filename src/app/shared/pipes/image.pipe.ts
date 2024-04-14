import { Pipe, PipeTransform } from '@angular/core';
import { CarSelected } from '../../core/models/carModelSelected.interface';

@Pipe({
  name: 'image',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: CarSelected): unknown {
    return `https://interstate21.com/tesla-app/images/${value.carModel?.code}/${value.color?.code}.jpg`;
  }
}
