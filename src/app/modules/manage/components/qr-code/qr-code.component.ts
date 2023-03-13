import {
  Component, OnInit, ChangeDetectorRef, Input,
} from '@angular/core';

import QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {

  @Input() public value;

  public image;

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    QRCode.toDataURL(this.value, { 
      errorCorrectionLevel: 'H',
      width: 300,
      height: 300,
    })
    .then((url) => {
      this.image = url;
      this._cdRef.markForCheck();
    })
    .catch((err) => {
      console.error(err)
    });
    
  }


}
