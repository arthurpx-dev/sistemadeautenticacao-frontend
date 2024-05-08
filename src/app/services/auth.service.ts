import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://seuapi.com/auth'; // Substitua pela URL da sua API
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }

  saveToken(token: Token): void {
    localStorage.setItem(this.tokenKey, token.accessToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    // Aqui você pode adicionar lógica para verificar se o token é válido
    return !!token;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    // Redirecione o usuário para a página de login ou faça outras limpezas necessárias
  }
}
