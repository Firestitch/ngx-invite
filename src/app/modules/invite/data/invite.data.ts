import { Injectable } from '@angular/core';

import { FsApi } from '@firestitch/api';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InviteData {

  constructor(
    private _api: FsApi,
  ) { }

  public valid(data, options: any = {}): Observable<any> {
    return this._api.post('invite/valid', data, { key: null, ...options });
  }

  public email(data): Observable<any> {
    return this._api.post('invite/email', data, { key: 'exists' });
  }

  public use(guid): Observable<any> {
    return this._api.post('invite/use', { guid }, { key: '' });
  }

  public signupEmail(guid, account): Observable<any> {
    return this._api.post('invite/signup/email', { account, guid }, { key: null });
  }

  public resend(data): Observable<any> {
    return this._api.post('invite/resend', data, { key: null });
  }
}

