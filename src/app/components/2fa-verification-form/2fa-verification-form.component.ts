import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';
import { FS_2FA_VERIFICATION_PROVIDER } from '../../tokens/verification.token';
import { IFsVerificationProvider } from '../../interfaces/verification-provider.interface';


@Component({
  selector: 'fs-2fa-verification-form',
  templateUrl: './2fa-verification-form.component.html',
  styleUrls: [
    './2fa-verification-form.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FAVerificationFormComponent implements OnDestroy {

  @Input()
  public method: IFsVerificationMethod;

  @Output()
  public verified = new EventEmitter<unknown>();

  public resendInProgress = false;
  public trustedDevice = false;

  private _code: string;
  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(FS_2FA_VERIFICATION_PROVIDER)
    public verificationProvider: IFsVerificationProvider,
    private _cdRef: ChangeDetectorRef,
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

}
