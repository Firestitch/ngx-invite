import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { Observable, Subject } from 'rxjs';

import { FsMessage } from '@firestitch/message';
import { FsDialog } from '@firestitch/dialog';

import { filter, finalize, takeUntil, tap } from 'rxjs/operators';

import { IFsVerificationMethod } from '../../../../interfaces/verification-method.interface';
import { Fs2faVerificationMethodsComponent } from '../2fa-verification-methods/2fa-verification-methods.component';
import { VerificationMethodType } from '../../../../enums/verification-method-type.enum';
import { Fs2faVerificationCodeComponent } from '../2fa-verification-code/2fa-verification-code.component';


@Component({
  selector: 'fs-2fa-verification',
  templateUrl: './2fa-verification.component.html',
  styleUrls: ['./2fa-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,  
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class Fs2faVerificationComponent implements OnDestroy, AfterViewInit, OnInit {

  @ViewChild(Fs2faVerificationCodeComponent)
  public verificationCodeComponent: Fs2faVerificationCodeComponent;

  @Input()
  public verificationMethod: IFsVerificationMethod;

  @Input()
  public resend: () => Observable<void>;

  @Input()
  public showTrustedDevice = true;

  @Input()
  public trustDevice = true;

  @Input()
  public codeLength;

  @Input()
  public trustDays;

  @Input()
  public formatRecipient = false;

  @Input()
  public getVerificationMethods: () => Observable<IFsVerificationMethod[]>;

  @Input()
  public selectVerificationMethod: (verificationMethod: IFsVerificationMethod) => Observable<IFsVerificationMethod>;

  @Output()
  public verified = new EventEmitter<unknown>();

  @Output()
  public codeChanged = new EventEmitter<unknown>();

  @Output()
  public codeCompleted = new EventEmitter<unknown>();

  @Output()
  public trustDeviceChange = new EventEmitter<boolean>();

  public code = '';
  public VerificationMethodType = VerificationMethodType;

  private _destroy$ = new Subject<void>();

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _dialog: FsDialog,
    private _message: FsMessage,
  ) {}

  public get recipient(): string {
    if(this.verificationMethod.type === VerificationMethodType.Email) {
      return this.verificationMethod.email;
    }

    if(this.verificationMethod.type === VerificationMethodType.Sms) {
      return this.verificationMethod.phoneNumber;
    }
  }

  public ngOnInit(): void {
    this.codeChanged
    .pipe(
      takeUntil(this._destroy$),
    )
    .subscribe((code: string) => {
      this.code = code;
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngAfterViewInit(): void {
    this.verificationCodeComponent.focus();    
  }

  public resendCode(): Observable<any> {
    return this.resend()
      .pipe(
        tap(() => {
          this.code = '';
          this._message.success('Resent Code');
        }),
        finalize(() => {
          this.verificationCodeComponent.focus();  
        }),
      );
  }

  public showVerificationMethods(): void {
    this.getVerificationMethods()
    .subscribe((verificationMethods) => {
      this._dialog.open(
        Fs2faVerificationMethodsComponent,
        {
          data: {
            verificationMethod: this.verificationMethod,
            verificationMethods,
            selectVerificationMethod: this.selectVerificationMethod,
          }
        }
      )
        .afterClosed()
        .pipe(
          filter((verificationMethod) => !!verificationMethod),
        )
        .subscribe((verificationMethod) => {
          this.verificationMethod = verificationMethod;
          this.code = '';
          this._cdRef.markForCheck();

          setTimeout(() => {
            this.verificationCodeComponent.focus();
          });
        });
    });
  }

}
