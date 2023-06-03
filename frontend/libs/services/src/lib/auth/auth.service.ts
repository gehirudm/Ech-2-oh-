import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  login(username: string) {
    return this.http.post<{ id: string, username: string }>("https://ech-2-oh-api.gehirudm.workers.dev/api/login", { username })
  }
}
