import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { FS_2FA_VERIFICATION_PROVIDER } from '../../tokens/verification.token';
import { FsVerificationMethodType } from '../../enums/verification-method-type.enum';
import { IFsVerificationProvider } from '../../interfaces/verification-provider.interface';
import { IFsVerificationMethod } from '../../interfaces/verification-method.interface';


@Component({
  selector: 'fs-2fa-verification-methods',
  templateUrl: './2fa-verification-methods.component.html',
  styleUrls: [
    './2fa-verification-methods.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Fs2FaVerificationMethodsComponent implements OnInit {

  @Input()
  public method: IFsVerificationMethod;

  @Output()
  public methodChange = new EventEmitter<IFsVerificationMethod>();

  @Output()
  public cancelled = new EventEmitter<void>();

  public phone: string;
  public code: string;
  public methods$: Observable<Record<string, IFsVerificationMethod[]>>;
  public readonly verificationMethodType = FsVerificationMethodType;

  constructor(
    @Inject(FS_2FA_VERIFICATION_PROVIDER)
    private _verificationProvider: IFsVerificationProvider,
  ) {
    this._initMethods();
  }

  public ngOnInit(): void {
  }

  public compareWith(o1, o2) {
    return o1 && o2 && o1.id === o2.id
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  public setVerificationMethod = () => {
    return this._verificationProvider
      .updateVerificationMethod(this.method.id)
      .pipe(
        tap((method: IFsVerificationMethod) => {
          this.methodChange.emit(method);
        })
      );
  };

  private _initMethods(): void {
    this.methods$ = this._verificationProvider
      .methods()
      .pipe(
        map((methods) => {
          return methods
            .reduce((acc, method) => {
              if (!acc[method.type]) {
                acc[method.type] = [];
              }

              acc[method.type].push(method);

              return acc;
            }, {});
        }),
        shareReplay(1),
      );
  }
}
