import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { FusionAuthService } from './fusionauth.service';
import { Public } from 'src/public.decorator';
import { SendOtpDto, VerifyOtpDto } from './fusionauth.dto';

@Controller('fusionauth')
@Public()
export class FusionAuthController {
  constructor(private readonly fusionAuthService: FusionAuthService) {}

  @Post('otp/send')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.fusionAuthService.sendOtp(dto.phoneNumber);
  }

  @Post('otp/verify')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.fusionAuthService.verifyOtp(dto.phoneNumber, dto.otp);
  }

  @Post('user/update')
  createOrUpdateUser(@Body() payload: any, @Req() req: any) {
    const token = req.headers.authorization?.split(' ')?.[1];
    return this.fusionAuthService.createOrUpdateUser(payload, token);
  }
}
