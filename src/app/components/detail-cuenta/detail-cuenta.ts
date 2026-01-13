import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http-service';
import { LoginService } from '../../services/login-service';
import { UpperCasePipe } from '@angular/common';
import { Tarjeta } from '../../Models/tarjeta';
@Component({
  selector: 'app-detail-cuenta',

  imports: [UpperCasePipe],
  templateUrl: './detail-cuenta.html',
  styleUrl: './detail-cuenta.scss'
})
export class DetailCuentaComponent {
  tarjetasVisibles = new Set<number>();

  toggleMostrarDatos(id: number) {
    if (this.tarjetasVisibles.has(id)) {
      this.tarjetasVisibles.delete(id);
    } else {
      this.tarjetasVisibles.add(id);
    }
  }

  isVisible(id: number): boolean {
    return this.tarjetasVisibles.has(id);
  }

  formatNumTarjeta(num: string, id: number) {
    if (!this.isVisible(id)) {
      const numVisible = num.slice(-4);
      return `**** **** **** ${numVisible}`;
    }
    return num.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }
  private httpService = inject(HttpService);
  private loginService = inject(LoginService);
  private router = inject(Router);
  tarjetas: Tarjeta[] = [];



  ngOnInit() {
    this.tarjetas = [
      { id: 1, titular: 'Juan Perez Garcia', numero: '4100000300012344', fechaCaducidad: '12/25', cvv: '123', cuentaId: 1 },
      { id: 2, titular: 'Juan Perez Garcia', numero: '4100003000056789', fechaCaducidad: '12/25', cvv: '456', cuentaId: 2 },
      { id: 3, titular: 'Maria Lopez Garcia', numero: '4100000500090123', fechaCaducidad: '12/25', cvv: '789', cuentaId: 3 },
      { id: 4, titular: 'Antonio', numero: '4100000010034567', fechaCaducidad: '12/25', cvv: '012', cuentaId: 4 }
    ];

    // Uncomment when ready
    /*
    const clientId = this.loginService.getClientId();
    if (clientId) {
        this.httpService.getCuentasByCliente(clientId).subscribe({
          next: (data) => {
            this.cuentas = data;
          },
          error: (err) => console.error('Error al cargar cuentas', err)
        });
    } else {
        this.router.navigate(['/login']);
    }
   */
  }



  verDetalles(id: number) {
    console.log('Ver detalles de cuenta:', id);
    this.httpService.getCuenta(id).subscribe({
      next: (data) => console.log('Detalles recibidos:', data),
      error: (err) => console.error('Error al obtener cuenta', err)
    });
  }

  verTarjetas(id: number) {
    console.log('Ver tarjetas de cuenta:', id);
    // TODO: Implement navigation or fetch cards
  }

  verMovimientos(id: number) {
    console.log('Ver movimientos de cuenta:', id);
    // TODO: Implement navigation
  }
}
