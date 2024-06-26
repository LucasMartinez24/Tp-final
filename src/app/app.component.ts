import { Component } from '@angular/core';
import { faPersonDigging,faBars,faFilePdf,faBarcode } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  faPersonDigging = faPersonDigging;
  faBars=faBars;
  faFilePdf=faFilePdf;
  faBarcode=faBarcode;
}
