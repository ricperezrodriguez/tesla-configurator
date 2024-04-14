import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/carModel.interface';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  private readonly _http = inject(HttpClient);

  getModels(): Observable<CarModel[]> {
    return this._http.get<CarModel[]>('/models');
  }
}
