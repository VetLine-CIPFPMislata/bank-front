import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioRequest } from '../../Models/usuarioRequest';
import { Cuenta } from '../../Models/cuenta';
import { Movimiento } from '../../Models/movimientos';
import { CurrencyPipe, NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Banco } from '../../services/banco';
import { DetailCuentaComponent } from "../detail-cuenta/detail-cuenta";
import { Usuario } from '../../Models/usuario';
import { LoginService } from '../../services/login-service';


@Component({
  selector: 'app-inicio',
  imports: [CurrencyPipe, DatePipe, DetailCuentaComponent, NgClass],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  usuarioNombre: string = '';
  usuario: UsuarioRequest = { username: '', password: '' };
  cuenta!: Cuenta;
  cuentas: Cuenta[] = [];
  movimiento!: Movimiento;
  movimientos: Movimiento[] = [];
  movimientosFull: Movimiento[] = [];
  itemsToShow: number = 5;
  cuentaSeleccionada: Cuenta | null = null;

  constructor(private bancoService: Banco, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getCurrentUser().subscribe({
      next: (usuario) => {
        this.usuarioNombre = `${usuario.nombre} ${usuario.apellido1}`;
        this.usuario = { username: usuario.username, password: '' };
      },
      error: (error) => {
        const username = localStorage.getItem('username') || 'Usuario';
        this.usuario = { username: username, password: '' };
        this.usuarioNombre = username;
      }
    });

    const clientId = this.getClientId();

    if (clientId) {
      this.loadCuentas(clientId);
    }
  }

  private getClientId(): number | null {
    const clientIdStr = localStorage.getItem('clientId');
    return clientIdStr ? parseInt(clientIdStr, 10) : null;
  }

  private loadCuentas(clientId: number): void {
    this.bancoService.getCuentasByCliente(clientId).subscribe({
      next: (cuentas) => {
        this.cuentas = cuentas;
        if (cuentas.length > 0) {
          this.cuentaSeleccionada = cuentas[0];
          this.loadMovimientosPorCuenta(this.cuentaSeleccionada.id);
        }
      },
      error: (error) => {
      }
    });
  }

  private loadMovimientosPorCuenta(cuentaId: number): void {
    this.itemsToShow = 5;
    this.bancoService.getMovimientosByCuenta(cuentaId).subscribe({
      next: (movimientos) => {
        this.movimientosFull = movimientos;
        this.updateVisibleMovements();
      },
      error: (error) => {
        this.movimientosFull = [];
        this.movimientos = [];
      }
    });
  }

  updateVisibleMovements(): void {
    this.movimientos = this.movimientosFull.slice(0, this.itemsToShow);
  }

  cargarMas(): void {
    this.itemsToShow += 5;
    this.updateVisibleMovements();
  }

  seleccionarCuenta(cuenta: Cuenta): void {
    this.cuentaSeleccionada = cuenta;
    this.loadMovimientosPorCuenta(cuenta.id);
  }

  formatIban(iban: string): string {
    return iban ? iban.replace(/(.{4})/g, '$1 ').trim() : '';
  }

  copiarIban(event: Event, iban: string): void {
    event.stopPropagation();
    navigator.clipboard.writeText(iban).then(() => {
    });
  }
}
