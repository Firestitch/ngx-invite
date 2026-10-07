import { FsPaging } from '@firestitch/list';

import { FsInviteAccountRequest } from './invite-account-request';


export interface FsInvitesResponse {
  accountRequests: FsInviteAccountRequest[];
  paging: FsPaging;
}
