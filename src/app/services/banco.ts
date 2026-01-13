import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movimiento } from '../Models/movimientos';
import { Cuenta } from '../Models/cuenta';

export interface Tarjeta {
  id: number;
  numero: string;
  fechaExpiracion: string;
  cvv: string;
  cuentaId: number;
}

@Injectable({
  providedIn: 'root',
})
export class Banco {
  private baseUrl = '/api';
  private cuentasUrl = `${this.baseUrl}/clientes`;
  private tarjetasMovimientosUrl=  `${this.baseUrl}/cuentas`;

  constructor(private Mihttp: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getCuentasByCliente(clientId: number): Observable<Cuenta[]> {
    return this.Mihttp.get<Cuenta[]>(`${this.cuentasUrl}/${clientId}/cuentas`, { headers: this.getAuthHeaders() });
  }

  getTarjetasByCliente(clientId: number): Observable<Tarjeta[]> {
    return this.Mihttp.get<Tarjeta[]>(`${this.tarjetasMovimientosUrl}/${clientId}/tarjetas`, { headers: this.getAuthHeaders() });
  }

  getMovimientosByCliente(clientId: number): Observable<Movimiento[]> {
    return this.Mihttp.get<Movimiento[]>(`${this.tarjetasMovimientosUrl}/${clientId}/movimientos`, { headers: this.getAuthHeaders() });
  }
}