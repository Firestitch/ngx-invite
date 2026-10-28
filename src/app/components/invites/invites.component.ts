import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

import { FsBadgeModule } from '@firestitch/badge';
import { list } from '@firestitch/common';
import { FsDateModule } from '@firestitch/date';
import { IFilterConfigItem, ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig, FsListModule } from '@firestitch/list';

import { map, tap } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InviteStates } from '../../consts';
import { InvitesData } from '../../data';
import { InviteState } from '../../enums';
import { FsInvite, FsInviteAccount, FsInvitesResponse } from '../../interfaces';


@Component({
  selector: 'fs-invites',
  templateUrl: './invites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsListModule,
    FsBadgeModule,
    FsDateModule,
  ],
})
export class FsInvitesComponent implements OnInit {

  /**
   * Lists one environment's invites, through that environment's endpoint. Leave it off in a
   * project without environments, or to list every invite.
   */
  public environmentId = input<number>();
  /**
   * Shows each invite's environment in a column, for a list that spans environments. Off by
   * default, since not every project has environments.
   */
  public showEnvironments = input(false);
  /**
   * What the project calls an environment (a clinic, an organization), as the column's title.
   */
  public environmentLabel = input('Environment');
  public showFilters = input(false);
  public query = input<Record<string, unknown>>({});
  public inviteStates = input<InviteState[]>([]);
  /**
   * The list's endpoint. Defaults to the environment's invites when environmentId is set,
   * otherwise the app-level invites.
   */
  public apiUrl = input<string>();
  /**
   * Called when an invitation creator is clicked, so the host decides what that does
   * (open the account, a dialog, nothing). Without it the creator is plain text.
   */
  public creatorAccountClick = input<
    (account: FsInviteAccount, invite: FsInvite) => void
  >();

  public listConfig = signal<FsListConfig>(null);
  public InviteState = InviteState;
  public InviteStates = list(InviteStates, 'name', 'value');

  private _list = viewChild(FsListComponent);
  private _url = computed(() => {
    if (this.apiUrl()) {
      return this.apiUrl();
    }

    return this.environmentId() ? `environments/${this.environmentId()}/invites` : 'invites';
  });

  private _invitesData = inject(InvitesData);
  private _destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.listConfig.set(this._createListConfig());
  }

  public reload(): void {
    this._list().reload();
  }

  public openCreatorAccount(
    account: FsInviteAccount,
    invite: FsInvite,
  ): void {
    this.creatorAccountClick()(account, invite);
  }

  private _createFilters(): IFilterConfigItem[] {
    if (!this.showFilters()) {
      return [];
    }

    return [
      {
        name: 'keyword',
        type: ItemType.Keyword,
        label: 'Search',
      },
      {
        name: 'status',
        type: ItemType.Select,
        label: 'Status',
        multiple: true,
        default: this.inviteStates(),
        values: InviteStates,
        isolate: { label: 'Show Deleted', value: InviteState.Deleted },
      },
    ];
  }

  private _createListConfig(): FsListConfig {
    return {
      sort: { value: 'createDate', direction: 'desc' },
      filters: this._createFilters(),
      rowActions: [
        {
          menu: true,
          label: 'Resend Invite',
          show: (invite: FsInvite) => this._isResendable(invite),
          click: (invite: FsInvite) => {
            this._invitesData.resend(this._url(), invite.id)
              .pipe(
                tap(() => {
                  this.reload();
                }),
                takeUntilDestroyed(this._destroyRef),
              )
              .subscribe();
          },
        },
        {
          menu: true,
          label: 'Delete',
          show: (invite: FsInvite) => this._isActive(invite),
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this request?',
          },
          click: (invite: FsInvite) => {
            return this._invitesData.delete(this._url(), invite.id);
          },
        },
      ],
      fetch: (query: Record<string, unknown>) => {
        return this._invitesData
          .gets(this._url(), {
            ...this.query(),
            ...query,
            creatorAccount: true,
            creatorAccountAvatar: true,
            ...(this.showEnvironments() ? { environment: true, environmentAvatar: true } : {}),
          })
          .pipe(
            map((response: FsInvitesResponse) => ({
              data: response.invites,
              paging: response.paging,
            })),
          );
      },
    };
  }

  private _isActive(invite: FsInvite): boolean {
    return invite.state !== InviteState.Deleted;
  }

  /** The server sends again only a pending invite, or one that expired unused. */
  private _isResendable(invite: FsInvite): boolean {
    return invite.status === InviteState.Pending || invite.status === InviteState.Expired;
  }
}
