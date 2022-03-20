import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CodeInputComponent } from 'angular-code-input';
import { FsVerificationMethodType } from '../../enums/verification-method-type.enum';

import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';


@Component({
  selector: 'fs-2fa-verification-code',
  templateUrl: './2fa-verification-code.component.html',
  styleUrls: [
    './2fa-verification-code.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class Fs2FAVerificationCodeComponent {

  @ViewChild(CodeInputComponent)
  public codeInputComponent: CodeInputComponent;

  @Input()
  public method: IFsVerificationMethod;

  @Input()
  public code;

  @Output()
  public codeChanged = new EventEmitter<string>();

  @Output()
  public codeCompleted = new EventEmitter<void>();

  public FsVerificationMethodType = FsVerificationMethodType;

  public codeChange(code): void {
    this.code = code;
    this.codeChanged.emit(this.code);
  }

  public focus(): void {
    this.codeInputComponent.focusOnField(0);
  }

}
