export class CuotaSocietaria {
  static tasaInteresBase: number = 0.33;
  id: number;
  importe: number;
  fechaGeneracion: Date;
  fechaVencimiento: Date;
  interes?: number;
  importeActual?: number;
  estado: string;
  check: boolean;

  constructor(
    id: number,
    importe: number,
    fechaGeneracion: Date,
    fechaVencimiento: Date,
    estado: string,
    check: boolean
  ) {
    this.id = id;
    this.importe = importe;
    this.fechaGeneracion = fechaGeneracion;
    this.fechaVencimiento = fechaVencimiento;
    this.importeActual = importe;
    this.estado = estado;
    this.check = check;
  }

  static buscarCuotasEmpresa(idEmpresaAsociada : string) : Array<CuotaSocietaria> {
    //Implementar consulta a BD aquí
    const listadoCuotasEmpresa: Array<CuotaSocietaria> = [
      new CuotaSocietaria(1, 50000, new Date('2024-04-06'), new Date('2024-05-06'), 'Pagada', false),
      new CuotaSocietaria(2, 50000, new Date('2024-05-06'), new Date('2024-06-06'), 'Vencida', true),
      new CuotaSocietaria(3, 50000, new Date('2024-06-06'), new Date('2024-07-06'), 'Pendiente', true)
    ];

    listadoCuotasEmpresa.forEach(cuotaSocietaria => {
      if(cuotaSocietaria.estado == 'Vencida')
        cuotaSocietaria.calcularInteresesDeMora();
    });

    return listadoCuotasEmpresa;
  }

  calcularInteresesDeMora() {
    const fechaHoy = new Date();
    const diferenciaTiempo = fechaHoy.getTime() - this.fechaVencimiento.getTime();
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
    const interesesCalculados = this.importe*((diferenciaDias * CuotaSocietaria.tasaInteresBase)/100);
    console.log(diferenciaDias)
    this.interes = interesesCalculados;
    this.importeActual = this.importe + this.interes;
  }
}