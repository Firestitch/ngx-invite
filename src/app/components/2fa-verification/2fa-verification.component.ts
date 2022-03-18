import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

import { FsDialog } from '@firestitch/dialog';

import { filter, takeUntil, tap } from 'rxjs/operators';

import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';
import { Fs2FaVerificationMethodsComponent } from '../2fa-verification-methods/2fa-verification-methods.component';
import { Subject } from 'rxjs';
import { FS_2FA_VERIFICATION_PROVIDER } from '../../tokens/verification.token';
import { IFsVerificationProvider } from '../../interfaces/verification-provider.interface';


@Component({
  selector: 'fs-2fa-verification',
  templateUrl: './2fa-verification.component.html',
  styleUrls: [
    './2fa-verification.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FAVerificationComponent implements OnDestroy {

  @Input()
  public method: IFsVerificationMethod;

  @Output()
  public verified = new EventEmitter<unknown>();

  @Output()
  public backToSignIn = new EventEmitter<void>();


  public resendInProgress = false;
  public trustedDevice = false;

  private _code: string;
  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(FS_2FA_VERIFICATION_PROVIDER)
    public verificationProvider: IFsVerificationProvider,
    private _cdRef: ChangeDetectorRef,
    private _dialog: FsDialog,
  ) {}

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public verify = () => {
    return this.verificationProvider
      .verify(this._code, this.trustedDevice)
      .pipe(
        tap((response) => {
          this.verified.emit(response);
        }),
      );
  };

  public codeChanged(code: string): void {
    this._code = code;
  }

  public resend(): void {
    this.resendInProgress = true;

    this.verificationProvider
      .resend()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.resendInProgress = false;

        this._cdRef.markForCheck();
      })
  }

  public showVerificationMethods(): void {
    this._dialog.open(
      Fs2FaVerificationMethodsComponent,
      {
        data: {
          method: this.method,
        }
      }
    )
      .afterClosed()
      .pipe(
        filter((method) => !!method),
      )
      .subscribe((method) => {
        this.method = method;

        this._cdRef.markForCheck();
      });
  }

  public toSignIn(): void {
    this.backToSignIn.emit();
  }

}
