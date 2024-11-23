import { Router } from '@angular/router';

import { SigninConfig } from '@firestitch/signin';

import { of } from 'rxjs';

import { InviteData } from '../data';
import { InviteService } from '../services';


export function signinConfig(
  router: Router,
  inviteData: InviteData,
  inviteService: InviteService,
): SigninConfig {
  return {
    signinTitle: '',
    emailChanged: () => {
      const path = window.location.pathname.replace(/\/[^/]+$/, '');
      router.navigateByUrl(path);

      return of(true);
    },
    beforeProcessSignin() {
      return inviteData.use({
        guid: inviteService.invite.guid,
      });
    },
  };
}
