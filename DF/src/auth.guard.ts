import { CanActivate, ExecutionContext,Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyRequest } from 'fastify';
import { JwtService } from "@nestjs/jwt";
import { EnvData } from "./envData/envData.service";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
   private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly envData: EnvData,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // The TCP microservice transport (DFD/PFD @EventPattern handlers) carries
    // no HTTP Authorization header — identity travels inside the payload as
    // pfdto.token. Every flow/dashboard handler was previously reachable with
    // no credential at all by anyone who could open a socket to PO_PORT.
    if (context.getType() === 'rpc') {
      return this.canActivateRpc(context);
    }
    if (context.getType() !== 'http') {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return true

    const request = context.switchToHttp().getRequest<FastifyRequest & { authContext?: any }>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format. Expected "Bearer <token>"');
    }

    try {
      // Verified (signature + expiry checked) claims, trustworthy for
      // downstream tenant/org scoping — unlike a bare jwt.decode().
      request.authContext = this.jwtService.verify(token, { secret: this.envData.getAuthSecret() });
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  // Verifies the JWT that the flow payload carries (pfdto.token) before any
  // @EventPattern handler runs. The service layer already verified this token
  // for audit-field stamping, but fell through to SessionToken = null and kept
  // processing — so verification existed without enforcement.
  //
  // Break-glass: FLOW_TRANSPORT_AUTH=disabled restores the previous
  // unauthenticated behaviour. It exists only because the TCP client for this
  // transport lives outside this repository and cannot be verified here; it
  // must not be used in production.
  private canActivateRpc(context: ExecutionContext): boolean {
    if (process.env.FLOW_TRANSPORT_AUTH === 'disabled') {
      this.logger.warn(
        'FLOW_TRANSPORT_AUTH=disabled — flow/dashboard events are being processed without authentication.',
      );
      return true;
    }

    const payload: any = context.switchToRpc().getData();
    const token = payload?.pfdto?.token;
    if (!token || typeof token !== 'string') {
      this.logger.warn('Rejected flow event: payload carried no pfdto.token');
      throw new UnauthorizedException('Flow event is missing an authentication token');
    }

    try {
      const claims = this.jwtService.verify(token, { secret: this.envData.getAuthSecret() });
      if (payload?.pfdto) {
        payload.pfdto.authContext = claims;
      }
    } catch (e) {
      this.logger.warn('Rejected flow event: pfdto.token failed verification');
      throw new UnauthorizedException('Invalid or expired token on flow event');
    }

    return true;
  }
}