import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = '/usuarios';

  constructor(private httpClient: HttpClient) {}

  createUsuario(usuario: User): Observable<User> {
    return this.httpClient.post<User>(this.API, usuario).pipe(
      catchError((error) => {
        console.error('Error ao criar usuario:', error);

        return throwError(error);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.API)
      .pipe(tap((users) => console.log('Usuarios', users)));
  }
}
