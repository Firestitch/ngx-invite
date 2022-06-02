import {
  Component, ChangeDetectionStrategy, OnInit, Input, ViewChild,
} from '@angular/core';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsPrompt } from '@firestitch/prompt';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IFsVerificationMethod } from '../../../../interfaces/verification-method.interface';
import { VerificationMethodType } from '../../../../enums/verification-method-type.enum';


@Component({
  selector: 'fs-2fa-verification-methods',
  templateUrl: './verification-methods.component.html',
  styleUrls: ['./verification-methods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationMethodsComponent implements OnInit {

  @ViewChild(FsListComponent)
  public list: FsListComponent;

  @Input() public accountVerify: () => Observable<any>;
  @Input() public verificationMethodsFetch: (query: any) => Observable<IFsVerificationMethod[]>;
  @Input() public verificationMethodDelete: (verificationMethod: IFsVerificationMethod) => Observable<any>;
  
  public listConfig: FsListConfig;
  public VerificationMethodType = VerificationMethodType;
  public textMessageAdd: () => void;

  constructor(
    private _prompt: FsPrompt,
  ) {
  }

  public ngOnInit(): void {
    this.listConfig = {
      paging: false,
      rowActions: [
        {
          click: (verificationMethod) => {
            this._prompt.confirm({
              title: 'Confirm',
              template: 'Would you like to delete this verification method?',
            })
              .pipe(
                switchMap(() => this.accountVerify()),
                switchMap(() => this.verificationMethodDelete(verificationMethod)),
              )
              .subscribe(() => {
                this.list.reload();
              });
          },
          label: 'Delete',
        },
      ],
      fetch: (query) => {
        return this.verificationMethodsFetch(query)
          .pipe(
            map((verificationMethods) => ({
              data: verificationMethods,
            }),
            ),
          );
      },
    };
  }
}
