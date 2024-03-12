import { Component, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() cardText: any = [""];
  @Input() width: number = 54;
  @Input() height: number = 88;
  @Input() borderRadius: number = 4;
  @Input() cardBorder: boolean = false;
  @Input() backgroundColor: any;
  @Input() backgroundPicture: any;
  @Input() backgroundPictureSize: number = 100;
  @Input() textSize: any;


  constructor(private elRef: ElementRef) { }
  updateCustomProperty() {
    this.elRef.nativeElement.style.setProperty('--card-width', this.width + "mm");
    this.elRef.nativeElement.style.setProperty('--card-height', this.height + "mm");
    this.elRef.nativeElement.style.setProperty('--card-radius', this.borderRadius + "mm");
    this.elRef.nativeElement.style.setProperty('--card-background', this.backgroundColor);
  
    if(this.backgroundPicture){
      let reader = new FileReader();
      reader.readAsDataURL(this.backgroundPicture);
      reader.onload = (_event) => {  
        this.elRef.nativeElement.style.setProperty('--background-image', `url(${reader.result})`);
        this.elRef.nativeElement.style.setProperty('--background-size', this.backgroundPictureSize + '%');
    }
    }
    this.elRef.nativeElement.style.setProperty('--card-font-size', this.textSize+"mm");
    if (this.cardBorder) {
      this.elRef.nativeElement.style.setProperty('--card-border', '1px solid gray');
    }
    else {
      this.elRef.nativeElement.style.setProperty('--card-border', 'none');
    }
  }

  ngOnChanges() {
    this.updateCustomProperty();
  }
}

