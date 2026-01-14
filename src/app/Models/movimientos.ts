export interface TarjetaCreditoOrigen {
    id: number;
    numeroTarjeta: string;
    fechaCaducidad: string;
    cvc: string;
    nombreCompleto: string;
    idCuentaBancaria: number;
}

export interface Movimiento {
    id: number;
    tipoMovimientoBancario: string; 
    origenMovimientoBancario: string; 
    tarjetaCreditoOrigen?: TarjetaCreditoOrigen;
    fechaMovimiento: string;
    importe: number;
    concepto: string;
}
