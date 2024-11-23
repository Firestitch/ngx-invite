import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RouteObserver } from '@firestitch/core';
import { FsMessage, MessageMode } from '@firestitch/message';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { InviteData } from '../../data';


@Component({
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteComponent implements OnInit, OnDestroy {

  public invite = null;
  public invite$: RouteObserver<any>;

  private _destroy$ = new Subject<void>();
  private _route: ActivatedRoute;
  private _inviteData: InviteData;
  private _router: Router;
  private _message: FsMessage;
  private _cdRef: ChangeDetectorRef;

  public ngOnInit(): void {
    this.invite$ = new RouteObserver(this._route, 'invite');
    this.invite$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((invite) => {
        this.invite = invite;
        this._cdRef.markForCheck();
        this._processInviteError();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public save = () => {
    return this._inviteData.email({
      guid: this.invite.guid,
      email: this.invite.email,
    })
      .pipe(
        tap((exists) => {
          if (exists) {
            this._router.navigate(['signin'], {
              queryParams: { email: this.invite.email },
              relativeTo: this._route,
            });
          } else {
            this._router.navigate(['signup'], {
              queryParams: { email: this.invite.email },
              relativeTo: this._route,
            });
          }
        }),
      );
  };

  private _processInviteError(): void {
    if (!this.invite || this.invite.error) {
      this._router.navigate(['/signin']);
    }

    if (this.invite && this.invite.error) {
      switch (this.invite.error.code) {
        case 460:
          this._message.info(this.invite.error.message, {
            mode: MessageMode.Dialog,
            buttons: [
              {
                label: 'Ok',
                click: () => {
                  return;
                },
              },
              {
                label: 'Send New Invitation',
                click: () => {
                  this._inviteData.resend({
                    guid: this._route.snapshot.params.guid,
                  })
                    .subscribe(() => {
                      this._message.success('Invite has been resent. Please check your email.',
                        {
                          title: 'Resent Invite',
                          mode: MessageMode.Dialog,
                        });
                    });
                },
              },
            ],
          });
          break;

        case 450:
          this._message.error(this.invite.error.message, {
            mode: MessageMode.Dialog,
          });
          break;
      }
    }
  }

}
