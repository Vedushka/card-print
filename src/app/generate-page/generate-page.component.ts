import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CardComponent } from './card/card.component';
import * as XLSX from 'xlsx';
import {  ViewChild, ElementRef } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MtxTooltip } from '@ng-matero/extensions/tooltip';


@Component({
  selector: 'app-generate-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    CardComponent,
    MatTooltipModule,
    MtxTooltip],
  templateUrl: './generate-page.component.html',
  styleUrl: './generate-page.component.scss'
})
export class GeneratePageComponent {
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef | undefined;
  @ViewChild('drawer', { static: false }) public drawer : MatDrawer | undefined;
  sideOfCard: 'face' | 'reverse' = 'face';
  cardBorder = true;
  height = 88;
  width = 54;
  borderRadius = 4;
  amountOfCard = 1;
  amountOfCardArr = new Array<string>(this.amountOfCard);
  textSize = 7;
  selectedFile: any = null;
  selectedPicture: any = null;
  backgroundColor = "#ffffff";
  backgroundSize = 100;
  data = [["Example"]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };

constructor(){
  this.amountOfCardArr = new Array<string>(this.amountOfCard);
}
  changrAmountOfCard(e:any){
    this.amountOfCardArr = new Array<string>(this.amountOfCard);
  }

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  formatLabel(value: number): string {
    return value + 'mm';
  }
  changeSide(e: MatRadioChange) {
    this.sideOfCard = e.value;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.onFileChange(event);
  }

  onPictureSelected(event: any): void {
    this.selectedPicture = event.target.files[0] ?? null;
  }
  
  print(){
    if(this.drawer){
      this.drawer.close();
    }
    setTimeout(()=>{ 
      window.print();
     }, 500)
    
  }
  
}
