import { Component, inject, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Banco } from '../../services/banco';
import { UpperCasePipe } from '@angular/common';
import { Tarjeta } from '../../Models/tarjeta';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-detail-cuenta',

  imports: [UpperCasePipe, DatePipe],
  templateUrl: './detail-cuenta.html',
  styleUrl: './detail-cuenta.scss'
})
export class DetailCuentaComponent implements OnInit {
  @Input() cuentaId!: number;
  tarjetasVisibles = new Set<number>();


  constructor(private bancoService: Banco) { }

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
  private loginService = inject(LoginService);
  private router = inject(Router);
  tarjetas: Tarjeta[] = [];


  ngOnInit() {
    if (this.cuentaId) {
      this.verDetalles(this.cuentaId);
    }
  }

  ngOnChanges() {
    if (this.cuentaId) {
      this.verDetalles(this.cuentaId);
    }
  }



  verDetalles(cuentaId: number) {
    console.log('Ver detalles de cuenta:', cuentaId);
    this.bancoService.getTarjetasByCuenta(cuentaId).subscribe({
      next: (data) => {
        console.log('Tarjetas cargadas:', data);
        this.tarjetas = data;
      },
      error: (err) => console.error('Error al obtener tarjetas', err)
    });
  }
}
