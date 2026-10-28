import { inject, Injectable } from '@angular/core';

import { FsApi } from '@firestitch/api';

import { Observable } from 'rxjs';

import { FsInvite, FsInvitesResponse } from '../interfaces';


/**
 * The invites list's endpoints. Each call takes the list's base URL (invites, or an
 * environment's environments/:environmentId/invites), so one service serves both.
 */
@Injectable({
  providedIn: 'root',
})
export class InvitesData {

  private _api = inject(FsApi);

  public gets(apiUrl: string, query: Record<string, unknown> = {}): Observable<FsInvitesResponse> {
    return this._api.get(apiUrl, query, { key: null });
  }

  public resend(apiUrl: string, inviteId: number): Observable<FsInvite> {
    return this._api.post(`${apiUrl}/${inviteId}/resend`, {}, { key: 'invite' });
  }

  public delete(apiUrl: string, inviteId: number): Observable<FsInvite> {
    return this._api.delete(`${apiUrl}/${inviteId}`, {}, { key: 'invite' });
  }
}
