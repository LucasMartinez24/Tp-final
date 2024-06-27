export interface Cuotas {
  id:number;
  importe:number
  fechaGeneracion:string;
  fechaVencimiento:string;
  estado:string;
  interes:number;
  importeActual:number;
  check:boolean;
}
