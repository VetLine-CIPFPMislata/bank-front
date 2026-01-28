import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Movimiento } from '../Models/movimientos';
import { Cuenta } from '../Models/cuenta';
import { Tarjeta } from '../Models/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class Banco {
  private baseUrl = 'bank-back-vetline.producciondaw.cip.fpmislata.com/api';
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

  getTarjetasByCuenta(cuentaId: number): Observable<Tarjeta[]> {
    return this.Mihttp.get<Tarjeta[]>(`${this.tarjetasMovimientosUrl}/${cuentaId}/tarjetas`, { headers: this.getAuthHeaders() });
  }

  getMovimientosByCuenta(cuentaId: number): Observable<Movimiento[]> {
    return this.Mihttp.get<Movimiento[]>(`${this.tarjetasMovimientosUrl}/${cuentaId}/movimientos`, { headers: this.getAuthHeaders() });
  }
}