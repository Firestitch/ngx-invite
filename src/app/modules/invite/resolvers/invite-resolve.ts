import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { DisplayApiError } from '@firestitch/api';
import { RouteSubject } from '@firestitch/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpContext } from '@angular/common/http';

import { InviteData } from '../data';
import { InviteService } from '../services';


@Injectable()
export class InviteResolve  {

  constructor(
    private _inviteData: InviteData,
    private _inviteService: InviteService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const routeSubject = new RouteSubject();

    return routeSubject.observe(
      this._inviteData.valid({ guid: route.params.guid },
        { context: new HttpContext().set(DisplayApiError, false) },
      )
        .pipe(
          tap((invite) => {
            this._inviteService.invite = invite;
          }),
        ),
    );
  }
}
