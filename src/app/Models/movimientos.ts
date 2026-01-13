export interface Movimiento {
    id: number;
    cuentaId: number;
    fecha: Date;
    concepto: string;
    importe: number;
    tipo: ['DEBE' | 'HABER'];
}
