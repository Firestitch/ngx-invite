import { VerificationMethodType } from '../enums/verification-method-type.enum';

export interface IFsVerificationMethod {
  id?: number;
  state?: string;
  type?: VerificationMethodType;
  phoneCode?: number;
  phoneCountry?: string;
  email?: string;
  phoneNumber?: string;
  default?: boolean;
}
