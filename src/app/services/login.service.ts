import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<User>(this.apiUrl + '/login', { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token ?? '');
          sessionStorage.setItem('username', value.name ?? '');
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<User>(this.apiUrl + '/register', { name, email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token ?? '');
          sessionStorage.setItem('username', value.name ?? '');
        })
      );
  }
}
