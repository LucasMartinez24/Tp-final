import { CuotaSocietaria } from "./cuotas";

export class ReferenciaPago {
    identificador : number;
    idEmpresaAsociada : string;
    montoAPagar : number;
    cuotasSeleccionadas : Array<CuotaSocietaria>;

    constructor(
        idEmpresaAsociada : string,
        cuotasSeleccionadas : Array<CuotaSocietaria>
    ){
        this.idEmpresaAsociada = idEmpresaAsociada;

        //Generar indentificador aleatorio
        this.identificador = Math.floor(Math.random() * 1000000);

        this.cuotasSeleccionadas = cuotasSeleccionadas;
        this.montoAPagar = 0;

        //Calcular monto total
        this.cuotasSeleccionadas.forEach(cuota => {
            this.montoAPagar += cuota.importeActual!
          });
        
    }

    static buscarReferenciaActiva(idEmpresaAsociada : string) : boolean{
        //Implementar busqueda en base de datos
        return false;
    }
}