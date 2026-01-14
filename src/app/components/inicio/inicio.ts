import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioRequest } from '../../Models/usuarioRequest';
import { Cuenta } from '../../Models/cuenta';
import { Movimiento } from '../../Models/movimientos';
import { CurrencyPipe, NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Banco } from '../../services/banco';
import { DetailCuentaComponent } from "../detail-cuenta/detail-cuenta";


@Component({
  selector: 'app-inicio',
  imports: [CurrencyPipe, DatePipe, DetailCuentaComponent, NgClass],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  usuario: UsuarioRequest = { username: '', password: '' };
  cuenta!: Cuenta;
  cuentas: Cuenta[] = [];
  movimiento!: Movimiento;
  movimientos: Movimiento[] = [];
  movimientosFull: Movimiento[] = [];
  itemsToShow: number = 5;
  cuentaSeleccionada: Cuenta | null = null;

  constructor(private bancoService: Banco) { }

  ngOnInit() {

    const username = localStorage.getItem('username') || 'Usuario';
    this.usuario = { username: username, password: '' };


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
        console.error('Error al cargar las cuentas:', error);
      }
    });
  }

  private loadMovimientosPorCuenta(cuentaId: number): void {
    console.log('Cargando movimientos para cuenta:', cuentaId);
    this.itemsToShow = 5; // Reiniciar al cambiar de cuenta
    this.bancoService.getMovimientosByCuenta(cuentaId).subscribe({
      next: (movimientos) => {
        console.log('Movimientos cargados:', movimientos.length);
        this.movimientosFull = movimientos;
        this.updateVisibleMovements();
      },
      error: (error) => {
        console.error('Error al cargar los movimientos:', error);
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
