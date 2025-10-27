import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RouteObserver } from '@firestitch/core';
import { SigninService } from '@firestitch/signin';

import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { InviteData } from '../../data';
import { FsSkeletonModule } from '@firestitch/skeleton';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsPasswordModule } from '@firestitch/password';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsSkeletonModule,
        FormsModule,
        FsFormModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        FsPasswordModule,
        MatButton,
        RouterLink,
    ],
})
export class SignupComponent implements OnInit, OnDestroy {

  public account: any = {};
  public confirmPassword: string = null;
  public invite = null;
  public invite$: RouteObserver<any>;

  private _destroy$ = new Subject<void>();
  private _route = inject(ActivatedRoute);
  private _inviteData = inject(InviteData);
  private _signinService = inject(SigninService);
  private _cdRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.invite$ = new RouteObserver(this._route, 'invite');
    this.invite$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((invite: any) => {
        this.invite = invite;
        this.account.email = this._route.snapshot.queryParams.email || invite.email;
        this._cdRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public continue = () => {
    return this._inviteData
      .signupEmail(this.invite.guid, this.account)
      .pipe(
        switchMap((response) => this._signinService
          .processSignin(response, null)),
      );
  };

}
