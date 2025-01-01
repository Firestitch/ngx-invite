import { inject, Injectable } from '@angular/core';

import { FsApi } from '@firestitch/api';


import { Observable } from 'rxjs';

import { FS_INVITE_CONFIG } from 'src/app/injectors/invite-config.injector';

import { FsInviteConfig } from '../../../interfaces';


@Injectable()
export class InviteData {

  private _api = inject(FsApi);
  private _config: FsInviteConfig = inject(FS_INVITE_CONFIG, { optional: true });
  
  public valid(data, options: any = {}): Observable<any> {
    return this._api.post(this.apiUrl('valid'), data, { key: null, ...options });
  }

  public email(data): Observable<any> {
    return this._api.post(this.apiUrl('email'), data, { key: 'exists' });
  }

  public use(guid): Observable<any> {
    return this._api.post(this.apiUrl('use'), { guid }, { key: '' });
  }

  public signupEmail(guid, account): Observable<any> {
    return this._api.post(this.apiUrl('signup/email'), { account, guid }, { key: null });
  }

  public resend(data): Observable<any> {
    return this._api.post(this.apiUrl('resend'), data, { key: null });
  }

  public apiUrl(path: string): string {
    return `${this._config?.apiUrl || 'invite'}/${path}`;
  }
}

