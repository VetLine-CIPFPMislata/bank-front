import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../Models/usuarioResponse';
import { UsuarioRequest } from '../Models/usuarioRequest';
import { Usuario } from '../Models/usuario';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private miHttp = inject(HttpClient);

  private url: string = 'http://bank-back-vetline.producciondaw.cip.fpmislata.com/api/auth';
  //ng serve --proxy-config src/proxy.conf.json

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  saveUserName(username: string): void {
    localStorage.setItem('userName', username);
  }
  login(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.miHttp.post<UsuarioResponse>(this.url + '/login', usuario);
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.miHttp.post(`${this.url}/logout`, {}, { headers });
  }

  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('clientId');
    localStorage.removeItem('username');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;

  }

  getCurrentUser(): Observable<Usuario> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.miHttp.get<Usuario>(`${this.url}/me`, { headers });
  }
}  

