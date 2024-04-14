import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CarOption } from '../models/carOption.interface';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private readonly _http = inject(HttpClient);

  getOptions(modelCode: string): Observable<CarOption> {
    return this._http.get<CarOption>('/options/' + modelCode);
  }
}
