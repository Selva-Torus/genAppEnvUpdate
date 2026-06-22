import { HttpStatus, Module } from '@nestjs/common';
import { ams_asset_assignmentsModule } from './ams_asset_assignments/ams_asset_assignments.module';   
import { ams_asset_categoriesModule } from './ams_asset_categories/ams_asset_categories.module';   
import { ams_asset_disposalModule } from './ams_asset_disposal/ams_asset_disposal.module';   
import { ams_asset_maintenanceModule } from './ams_asset_maintenance/ams_asset_maintenance.module';   
import { ams_assetsModule } from './ams_assets/ams_assets.module';   
import { ams_license_allocationsModule } from './ams_license_allocations/ams_license_allocations.module';   
import { ams_software_licensesModule } from './ams_software_licenses/ams_software_licenses.module';   

import { RuleService } from "src/ruleService";
import { CodeService } from "src/codeService";
import { RedisService } from "src/redisService";


@Module({
  imports: [ams_asset_assignmentsModule,ams_asset_categoriesModule,ams_asset_disposalModule,ams_asset_maintenanceModule,ams_assetsModule,ams_license_allocationsModule,ams_software_licensesModule],
  controllers:[],
  providers:[RuleService,CodeService,RedisService]
})
export class ErdModule {}
