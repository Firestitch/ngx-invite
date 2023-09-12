import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { FsFormDirective } from '@firestitch/form';

import { CodeInputComponent } from '../../../../modules/code-input/components/code-input';
import { VerificationMethodType } from '../../../../enums/verification-method-type.enum';


@Component({
  selector: 'fs-2fa-verification-code',
  templateUrl: './2fa-verification-code.component.html',
  styleUrls: ['./2fa-verification-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: NgForm,
    },
  ],
})
export class Fs2faVerificationCodeComponent {

  @ViewChild(CodeInputComponent)
  public codeInputComponent: CodeInputComponent;

  @Input()
  public type: VerificationMethodType;

  @Input()
  public recipient: string;

  @Input()
  public codeLength;

  @Input()
  public code;

  @Output()
  public codeChanged = new EventEmitter<string>();

  @Output()
  public codeCompleted = new EventEmitter<void>();

  public VerificationMethodType = VerificationMethodType;

  constructor(
    private _form: FsFormDirective,
  ) {}

  public codeChange(code): void {
    this.code = code;
    this.codeChanged.emit(this.code);
    this._form.dirty();
  }

  public focus(): void {
    this.codeInputComponent.focus();
  }

}
