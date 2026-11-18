import { BadRequestException, Body, Controller, Get, Headers, Param, Post, Req } from '@nestjs/common';
import { pfDto } from 'src/dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { TemporalService } from './temporal.service';

@ApiTags('Temporal')
@ApiBearerAuth('JWT-auth')
@Controller('temporal')
export class TemporalController {
  constructor(private readonly temporalService: TemporalService) {}

  // POST /temporal/node/run -> runs one flow node (same PoEvent body te.service sends) in the Temporal worker
  // Body is typed as `any` on purpose: the global ValidationPipe (whitelist) would strip PoEvent's undecorated fields
  // POST /temporal/flow/run -> same body as /te/eventEmitter, whole flow runs as a Temporal workflow
  @Post('flow/run')
  async runFlow(@Body() pfdto: pfDto, @Req() req: any, @Headers('Authorization') auth: string) {
    pfdto.token = auth?.split(' ')[1];
    pfdto['authContext'] = req?.authContext;
    return this.temporalService.runFlow(pfdto);
  }

  // SkipThrottle: DynamicFlowService calls this once per flow node, from the same IP
  @SkipThrottle()
  @Post('node/run')
  async runNode(@Body() body: any, @Req() req: any) {
    if (!body?.pfdto?.key || !body?.pfdto?.nodeId || !body?.pfdto?.nodeType) {
      throw new BadRequestException('pfdto.key, pfdto.nodeId and pfdto.nodeType are required');
    }
    // Same as AuthGuard.canActivateRpc: node code reads the verified identity from pfdto.authContext
    body.pfdto.authContext = req.authContext;
    return this.temporalService.runFlowNode(body);
  }

  // GET /temporal/workflow/:workflowId -> status + result of any workflow (e.g. ids from the flow logs)
  @Get('workflow/:workflowId')
  async getWorkflow(@Param('workflowId') workflowId: string) {
    return this.temporalService.getStatus(workflowId);
  }
}
