import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvData } from './envData/envData.service';

@Injectable()
export class JwtServices {
  constructor(
    private readonly jwtService: JwtService,
    private readonly envData: EnvData,
  ) {}

  // Signature + expiry verified — use this wherever the decoded claims drive
  // an authorization/identity decision. decodeToken() below trusts nothing.
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, { secret: this.envData.getAuthSecret() });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token,{ json: true });
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}