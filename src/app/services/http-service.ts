import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../Models/cuenta';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  private url = 'http://localhost:8083/api/';

  getCuentasByCliente(clientId: number) {
    return this.http.get<Cuenta[]>(`${this.url}clientes/${clientId}/cuentas`);
  }

  getCuenta(cuentaId: number) {
    return this.http.get<Cuenta>(`${this.url}cuentas/${cuentaId}`);
  }



}
