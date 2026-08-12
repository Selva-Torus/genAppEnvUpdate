import { Module } from '@nestjs/common';
import { AbilitiesGuard } from './ability.guard';
import { JwtServices } from 'src/jwt.services';
import { RedisService } from 'src/redisService';
import { CommonService } from 'src/common.Service';
import { RuleService } from 'src/ruleService';
import { CodeService } from 'src/codeService';
import { ConfigService } from '@nestjs/config';
import { EnvData } from 'src/envData/envData.service';
import { JwtService } from '@nestjs/jwt';

// AbilitiesGuard was previously unregistered anywhere (not even a DI
// provider), so it could never actually be attached to a route. This makes
// it resolvable — it still isn't applied to any controller here, since doing
// so requires real @CheckAbilities() rules per route, which don't exist yet
// (see the audit remediation notes).
@Module({
    providers: [AbilitiesGuard, JwtServices, RedisService, CommonService, RuleService, CodeService, ConfigService, EnvData, JwtService],
    exports: [AbilitiesGuard],
})
export class AbilityModule {}