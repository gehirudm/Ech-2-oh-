import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http: HttpClient,) { }

  getDrinkCount(id: string) {
    return this.http.get<{ count: number }>(`https://ech-2-oh-api.gehirudm.workers.dev/api/${id}/today`)
  }

  drink(id: string) {
    return this.http.get<void>(`https://ech-2-oh-api.gehirudm.workers.dev/api/${id}/drink`)
  }
}
