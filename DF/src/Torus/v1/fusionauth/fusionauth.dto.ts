// fusionauth.dto.ts
import { IsString, Matches, Length } from 'class-validator';

export class SendOtpDto {
  @Matches(/^\+[1-9]\d{7,14}$/, {
    message: 'Phone must be in E.164 format, e.g. +919876543210',
  })
  phoneNumber: string;
}

export class VerifyOtpDto extends SendOtpDto {
  @IsString()
  @Length(4, 10)
  otp: string;
}
