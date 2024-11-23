import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FsApi } from '@firestitch/api';

import { tap } from 'rxjs/operators';

import { VerificationMethodData } from '../../data';


@Component({
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailComponent implements OnInit {

  public email = null;

  private _api = inject(FsApi);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _verificationMethodData = inject(VerificationMethodData);
  private _cdRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this._api.get('account')
      .subscribe(({ email }) => {
        this.email = email;
        this._cdRef.markForCheck();
      });
  }

  public next = () => {
    const redirect = this._route.snapshot.queryParams.redirect || '/';

    return this._verificationMethodData.account()
      .pipe(
        tap(() => {
          this._router.navigate(['verify'], { relativeTo: this._route, queryParams: { redirect } });
        }),
      );
  };

  public cancel() {
    this._router.navigateByUrl('/signin');
  }

}
