import { InjectionToken } from '@angular/core';

import { IFsVerificationProvider } from '../interfaces/verification-provider.interface';

export const FS_2FA_VERIFICATION_PROVIDER = new InjectionToken<IFsVerificationProvider>(
  'Provider for Verification service',
);
