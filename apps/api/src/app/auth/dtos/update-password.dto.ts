import { passwordConstraints } from '@novu/shared';
import { IsDefined, Matches, MaxLength, MinLength } from 'class-validator';
export class UpdatePasswordBodyDto {
  @IsDefined()
  @MinLength(passwordConstraints.minLength)
  @MaxLength(passwordConstraints.maxLength)
  @Matches(passwordConstraints.pattern, {
    message:
      'The new password must contain minimum 8 and maximum 64 characters,' +
      ' at least one uppercase letter, one lowercase letter, one number and one special character #?!@$%^&*()-',
  })
  newPassword: string;

  @IsDefined()
  confirmPassword: string;

  @IsDefined()
  currentPassword: string;
}
