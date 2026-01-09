import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Usuario } from '../../common/usuario';
import { Cuenta } from '../../common/cuenta';
import { Movimiento } from '../../common/movimientos';
import { NgClass } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, NgClass, CurrencyPipe, DatePipe, RouterLinkActive],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
usuario!: Usuario;
cuenta!: Cuenta;
cuentas!: Cuenta[];
movimiento!: Movimiento;
movimientos!: Movimiento[];

constructor() {
    this.usuario = {
        id: 1,
        nombre: 'Álvaro',
        email: 'q@q.com'
    };
    this.cuentas = [
        {
            id: 1,
            iban: 'ES76 2100 1234 5678 9012 3456',
            saldo: 2500.75
        },
        {
            id: 2,
            iban: 'ES12 3456 7890 1234 5678 9012',
            saldo: 1500.00
        },
        {
            id: 3,
            iban: 'ES98 7654 3210 9876 5432 1098',
            saldo: 3200.40
        }
    ];
  
    this.movimientos = [
        {
            id: 1,
            cuentaId: 1,
            fecha: new Date('2024-06-01'),
            concepto: 'Compra en supermercado',
            importe: -75.50,
            tipo: ['DEBE']
        },
        {
            id: 2,
            cuentaId: 1,
            fecha: new Date('2024-06-03'),
            concepto: 'Ingreso nómina',
            importe: 1500.00,
            tipo: ['HABER']
        },
        {
            id: 3,
            cuentaId: 1,
            fecha: new Date('2024-06-05'),
            concepto: 'Pago factura luz',
            importe: -60.25,
            tipo: ['DEBE']
        }
    ];
  }
}
