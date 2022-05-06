import {
  Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter,
} from '@angular/core';

import { FsListConfig } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';
import { IFsVerificationMethod } from '../../../../interfaces/verification-method.interface';

import { map, switchMap } from 'rxjs/operators';
import { TwoFactorManageService } from '../../services';


@Component({
  selector: 'app-verification-methods',
  templateUrl: './verification-methods.component.html',
  styleUrls: ['./verification-methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationMethodsComponent implements OnInit {

  @Input() public twoFactorManageService: TwoFactorManageService;
  @Input() public type;
  
  @Output() public deleted = new EventEmitter<IFsVerificationMethod>();

  public listConfig: FsListConfig;
  public textMessageAdd: () => void;

  constructor(
    private _prompt: FsPrompt,
  ) {
  }

  public ngOnInit(): void {
    this.listConfig = {
      rowActions: [
        {
          click: (verificationMethod) => {
            this._prompt.confirm({
              title: 'Confirm',
              template: 'Would you like to delete this verification method?',
            })
              .pipe(
                switchMap(() => this.twoFactorManageService.accountVerify()),
                switchMap(() => this.twoFactorManageService
                  .verificationMethodDelete(verificationMethod)),
              )
              .subscribe(() => {
                this.deleted.emit(verificationMethod);
              });
          },
          label: 'Delete',
        },
      ],
      fetch: () => {
        return this.twoFactorManageService.verificationMethods$
          .pipe(
            map((verificationMethods) => ({
              data: verificationMethods.filter((verificationMethod) => {
                return verificationMethod.type === this.type;
              }),
            }),
            ),
          );
      },
    };
  }
}
