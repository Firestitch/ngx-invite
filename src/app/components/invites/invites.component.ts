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

import { AccountRequestStates } from '../../consts';
import { InvitesData } from '../../data';
import { AccountRequestState, AccountRequestType } from '../../enums';
import { FsInviteAccount, FsInviteAccountRequest, FsInvitesResponse } from '../../interfaces';


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
  public accountRequestTypes = input<AccountRequestType[]>([
    AccountRequestType.Invite,
    AccountRequestType.Activation,
  ]);
  public accountRequestStates = input<AccountRequestState[]>([]);
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
    (account: FsInviteAccount, accountRequest: FsInviteAccountRequest) => void
  >();

  public listConfig = signal<FsListConfig>(null);
  public AccountRequestState = AccountRequestState;
  public AccountRequestStates = list(AccountRequestStates, 'name', 'value');

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
    accountRequest: FsInviteAccountRequest,
  ): void {
    this.creatorAccountClick()(account, accountRequest);
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
        default: this.accountRequestStates(),
        values: AccountRequestStates,
        isolate: { label: 'Show Deleted', value: AccountRequestState.Deleted },
      },
    ];
  }

  private _createListConfig(): FsListConfig {
    return {
      sort: { value: 'create_date', direction: 'desc' },
      filters: this._createFilters(),
      rowActions: [
        {
          menu: true,
          label: 'Resend Invite',
          show: (accountRequest: FsInviteAccountRequest) => this._isActive(accountRequest),
          click: (accountRequest: FsInviteAccountRequest) => {
            this._invitesData.resend(this._url(), accountRequest.id)
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
          show: (accountRequest: FsInviteAccountRequest) => this._isActive(accountRequest),
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this request?',
          },
          click: (accountRequest: FsInviteAccountRequest) => {
            return this._invitesData.delete(this._url(), accountRequest.id);
          },
        },
      ],
      fetch: (query: Record<string, unknown>) => {
        return this._invitesData
          .gets(this._url(), {
            ...this.query(),
            ...query,
            creatorAccounts: true,
            creatorAccountAvatars: true,
            statuses: true,
            type: this.accountRequestTypes().join(','),
            ...(this.showEnvironments() ? { environments: true, environmentAvatars: true } : {}),
          })
          .pipe(
            map((response: FsInvitesResponse) => ({
              data: response.accountRequests,
              paging: response.paging,
            })),
          );
      },
    };
  }

  private _isActive(accountRequest: FsInviteAccountRequest): boolean {
    return accountRequest.state !== AccountRequestState.Deleted;
  }
}
