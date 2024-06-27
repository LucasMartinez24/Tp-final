import { Component } from '@angular/core';
import { faPersonDigging, faBars, faFilePdf, faBarcode,faX } from '@fortawesome/free-solid-svg-icons';
import { Cuotas } from './interfaces/cuotas';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faPersonDigging = faPersonDigging;
  faBars = faBars;
  faFilePdf = faFilePdf;
  faBarcode = faBarcode;
  faX=faX;
  cuotas: Cuotas[] = [
    {
      id: 1,
      importe: 50000,
      fechaGeneracion: '08/04/2024',
      fechaVencimiento: '06/05/2024',
      estado: 'Pagada',
      interes: 0,
      importeActual: 5000,
      check: false
    },
    {
      id: 2,
      importe: 50000,
      fechaGeneracion: '06/05/2024',
      fechaVencimiento: '10/06/2024',
      estado: 'Vencida',
      interes: 907.5,
      importeActual: 50907.5,
      check: true
    },
    {
      id: 3,
      importe: 50000,
      fechaGeneracion: '10/06/2024',
      fechaVencimiento: '08/07/2024',
      estado: 'Pendiente',
      interes: 0,
      importeActual: 50000,
      check: true
    }
  ];

  selectedCuotas: any[] = [];
  referenciaPago: any = null;
  showModal: boolean = false;

  onCheckboxChange(event: any, cuota: any) {
    if (event.target.checked) {
      this.selectedCuotas.push(cuota);
    } else {
      const index = this.selectedCuotas.findIndex(c => c.id === cuota.id);
      if (index > -1) {
        this.selectedCuotas.splice(index, 1);
      }
    }
  }

  generarReferenciaPago() {
    this.referenciaPago = {
      id: this.generarIdAleatorio(),
      cuotas: this.selectedCuotas
    };
    this.showModal = true;
  }
  generatePdf(referenciaPago: any) {
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text(`ID de Referencia de Pago: N°${referenciaPago.id}`, 20, 20);
    doc.text('Cuotas Seleccionadas:', 20, 30);
    let y = 40;
    referenciaPago.cuotas.forEach((cuota: any) => {
      doc.text(`Cuota ${cuota.id}: Estado - ${cuota.estado}`, 30, y);
      y += 10;
    });

    // Guardar PDF como archivo para descarga
    doc.save('referencia_pago.pdf');
  }
  // Método para cerrar el modal
  closeModal() {
    this.showModal = false;
  }
  generarIdAleatorio() {
    return Math.floor(Math.random() * 1000000); // Genera un número aleatorio entre 0 y 999999
  }

  cerrarModal() {
    this.showModal = false;
  }

  downloadPDF() {
    const data = document.getElementById('tabla-cuotas')!;
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Listado_Cuotas.pdf');
    });
  }
}
