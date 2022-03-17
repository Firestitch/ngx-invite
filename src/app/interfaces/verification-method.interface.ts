import { FsVerificationMethodType } from '../enums/verification-method-type.enum';

export interface IFsVerificationMethod {
  id: number;
  state?: string;
  type: FsVerificationMethodType;
  phoneCode?: number;
  phoneCountry?: string;
  email?: string;
  phoneNumber?: string;
  default: boolean;
}
