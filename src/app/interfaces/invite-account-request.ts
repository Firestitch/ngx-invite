import { AccountRequestState, AccountRequestType } from '../enums';

import { FsInviteAccount } from './invite-account';
import { FsInviteEnvironment } from './invite-environment';


export interface FsInviteAccountRequest {
  id: number;
  email: string;
  type: AccountRequestType;
  state: AccountRequestState;
  /**
   * The state as the user sees it: a pending request whose expiry date has passed reads
   * Expired. Computed by the server, which also sorts and filters on it.
   */
  status: AccountRequestState;
  expiryDate: string;
  createDate: string;
  creatorAccount?: FsInviteAccount;
  environment?: FsInviteEnvironment;
}
