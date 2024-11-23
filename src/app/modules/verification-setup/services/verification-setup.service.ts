import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';

import { finalize } from 'rxjs/operators';

@Injectable()
export class VerificationSetupService {

  private _api = inject(FsApi);
  private _router = inject(Router);

  public signout() {
    return this._api
      .post('auth/signout')
      .pipe(
        finalize(() => {
          this._router.navigateByUrl('/signin');
        }),
      );
  }
}
