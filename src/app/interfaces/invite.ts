import { InviteState } from '../enums';

import { FsInviteAccount } from './invite-account';
import { FsInviteEnvironment } from './invite-environment';


/**
 * An invitation, as the framework's Invite API answers it (under invite / invites): into an
 * environment (environmentId) or into the application as a whole (none).
 */
export interface FsInvite {
  id: number;
  email: string;
  environmentId?: number;
  state: InviteState;
  /**
   * The state as the user sees it: a pending invite whose expiry date has passed reads
   * Expired. Computed by the server, which also sorts and filters on it.
   */
  status: InviteState;
  expiryDate: string;
  createDate: string;
  creatorAccount?: FsInviteAccount;
  environment?: FsInviteEnvironment;
}
