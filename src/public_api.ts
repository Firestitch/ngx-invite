/*
 * Public API Surface of fs-2fa
 */

export { Fs2FaModule } from './app/fs-2fa.module';

// Components
export { Fs2FAVerificationComponent } from './app/components/2fa-verification/2fa-verification.component';

export { IFsVerificationProvider } from './app/interfaces/verification-provider.interface';
export { IFsVerificationMethod } from './app/interfaces/verification-method.interface';

export { FsVerificationMethodType } from './app/enums/verification-method-type.enum';

export { FS_2FA_VERIFICATION_PROVIDER } from './app/tokens/verification.token';
