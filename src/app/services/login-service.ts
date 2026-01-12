import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../common/usuario';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private miHttp = inject(HttpClient);

  private url: string = 'http://localhost:8083/api';

  setToken(token: string): void {
    localStorage.setItem('api_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('api_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  login(usuario: Usuario) {
    return this.miHttp.post(this.url + '/login', usuario);
  }

  logout() {
    localStorage.removeItem('api_token');
    return this.miHttp.post(this.url + '/logout', {});
  }

}
