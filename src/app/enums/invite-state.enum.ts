/** An invite's state, as the framework's InviteStateEnum: expired is a pending invite past its expiry date. */
export enum InviteState {
  Pending = 'pending',
  Used = 'used',
  Deleted = 'deleted',
  Expired = 'expired',
}
