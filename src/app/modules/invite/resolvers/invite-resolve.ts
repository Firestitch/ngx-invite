import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { DisplayApiError } from '@firestitch/api';
import { RouteSubject } from '@firestitch/core';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { HttpContext } from '@angular/common/http';

import { InviteData } from '../data';
import { InviteService } from '../services';


@Injectable()
export class InviteResolve  {

  private _inviteData = inject(InviteData);
  private _inviteService = inject(InviteService);
  private _router = inject(Router);

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const routeSubject = new RouteSubject();

    return routeSubject.observe(
      this._inviteData.valid({ guid: route.params.guid },
        { context: new HttpContext().set(DisplayApiError, false) },
      )
        .pipe(
          catchError((error) => {
            this._router.navigate([state.url, 'error']);

            return throwError(() => error);
          }),
          tap((invite) => {
            this._inviteService.invite = invite;
          }),
        ),
    );
  }
}
