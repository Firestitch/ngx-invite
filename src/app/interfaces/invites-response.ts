import { FsPaging } from '@firestitch/list';

import { FsInvite } from './invite';


export interface FsInvitesResponse {
  invites: FsInvite[];
  paging: FsPaging;
}
