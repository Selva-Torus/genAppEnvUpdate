
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common.Service';
import { RuleService } from './ruleService';
import { CodeService } from './codeService';
import { RedisService } from './redisService';
import { JwtService } from '@nestjs/jwt';
import { UfModule } from './Torus/v1/uf/uf.module';
import { TeModule } from './Torus/v1/te/te.module';
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { ErdModule } from './erd/erd.module';
import { DFassetDashboardModule } from './dfd/DFassetDashboard/v1/DFassetDashboard.module';    
import { DFassetsModule } from './dfd/DFassets/v1/DFassets.module';    
import { DFassetMaintenanceModule } from './dfd/DFassetMaintenance/v1/DFassetMaintenance.module';    
import { DFassetSoftwareLicensesModule } from './dfd/DFassetSoftwareLicenses/v1/DFassetSoftwareLicenses.module';    
import { DFassetDisposalModule } from './dfd/DFassetDisposal/v1/DFassetDisposal.module';    
import { DFassetTypeComboModule } from './dfd/DFassetTypeCombo/v1/DFassetTypeCombo.module';    
import { DFassetCategoryComboModule } from './dfd/DFassetCategoryCombo/v1/DFassetCategoryCombo.module';    
import { DFassetClassificationComboModule } from './dfd/DFassetClassificationCombo/v1/DFassetClassificationCombo.module';    
import { DFassetDataClassificationComboModule } from './dfd/DFassetDataClassificationCombo/v1/DFassetDataClassificationCombo.module';    
import { DFownershipTypeComboModule } from './dfd/DFownershipTypeCombo/v1/DFownershipTypeCombo.module';    
import { DFassetConditionComboModule } from './dfd/DFassetConditionCombo/v1/DFassetConditionCombo.module';    
import { DFdisposalMethodComboModule } from './dfd/DFdisposalMethodCombo/v1/DFdisposalMethodCombo.module';    
import { DFriskLevelComboModule } from './dfd/DFriskLevelCombo/v1/DFriskLevelCombo.module';    
import { DFvendorNameComboModule } from './dfd/DFvendorNameCombo/v1/DFvendorNameCombo.module';    
import { DFlifecycleStageComboModule } from './dfd/DFlifecycleStageCombo/v1/DFlifecycleStageCombo.module';    
import { DFcurrencyComboModule } from './dfd/DFcurrencyCombo/v1/DFcurrencyCombo.module';    
import { DFassetDocTableModule } from './dfd/DFassetDocTable/v1/DFassetDocTable.module';    
import { DFassignDocTableModule } from './dfd/DFassignDocTable/v1/DFassignDocTable.module';    
import { DFcategoryDocTableModule } from './dfd/DFcategoryDocTable/v1/DFcategoryDocTable.module';    
import { DFassetAssignmentsModule } from './dfd/DFassetAssignments/v1/DFassetAssignments.module';    
import { DFassetNameComboModule } from './dfd/DFassetNameCombo/v1/DFassetNameCombo.module';    
import { DFassignmentStatusComboModule } from './dfd/DFassignmentStatusCombo/v1/DFassignmentStatusCombo.module';    
import { DFconditionAtReturnComboModule } from './dfd/DFconditionAtReturnCombo/v1/DFconditionAtReturnCombo.module';    
import { DFapprovalStatusComboModule } from './dfd/DFapprovalStatusCombo/v1/DFapprovalStatusCombo.module';    
import { DFmaintenanceTypeComboModule } from './dfd/DFmaintenanceTypeCombo/v1/DFmaintenanceTypeCombo.module';    
import { DFpriorityComboModule } from './dfd/DFpriorityCombo/v1/DFpriorityCombo.module';    
import { DFassetCategoryModule } from './dfd/DFassetCategory/v1/DFassetCategory.module';    
import { DFparentCategoryComboModule } from './dfd/DFparentCategoryCombo/v1/DFparentCategoryCombo.module';    
import { DFdepreciationMethodComboModule } from './dfd/DFdepreciationMethodCombo/v1/DFdepreciationMethodCombo.module';    
import { DFassetCategoryCardsModule } from './dfd/DFassetCategoryCards/v1/DFassetCategoryCards.module';    
import { DFlicenseTypeComboModule } from './dfd/DFlicenseTypeCombo/v1/DFlicenseTypeCombo.module';    
import { DFsoftwareDocTableModule } from './dfd/DFsoftwareDocTable/v1/DFsoftwareDocTable.module';    
import { addAssetModifyModule } from './pfd/addAssetModify/v1/addAssetModify.module';    
import { addAssetModule } from './pfd/addAsset/v1/addAsset.module';    
import { addAssetDocumentModule } from './pfd/addAssetDocument/v1/addAssetDocument.module';    
import { assignAssetModifyModule } from './pfd/assignAssetModify/v1/assignAssetModify.module';    
import { assignAssetModule } from './pfd/assignAsset/v1/assignAsset.module';    
import { addAssignDocumentModule } from './pfd/addAssignDocument/v1/addAssignDocument.module';    
import { assetMaintenanceModifyModule } from './pfd/assetMaintenanceModify/v1/assetMaintenanceModify.module';    
import { assetMaintenanceModule } from './pfd/assetMaintenance/v1/assetMaintenance.module';    
import { addCategoryModifyModule } from './pfd/addCategoryModify/v1/addCategoryModify.module';    
import { addCategoryModule } from './pfd/addCategory/v1/addCategory.module';    
import { addCategoryDocumentModule } from './pfd/addCategoryDocument/v1/addCategoryDocument.module';    
import { assetSoftwareLicensesModifyModule } from './pfd/assetSoftwareLicensesModify/v1/assetSoftwareLicensesModify.module';    
import { assetSoftwareLicensesModule } from './pfd/assetSoftwareLicenses/v1/assetSoftwareLicenses.module';    
import { assetSoftwareLicensesDocumentModule } from './pfd/assetSoftwareLicensesDocument/v1/assetSoftwareLicensesDocument.module';    
//import { DecryptPayloadMiddleware } from './decryptPayloadMiddleware';
import { EncryptInterceptor } from './encryptInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';


@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT)       
      },
    }),
  CacheModule.register({isGlobal:true}),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFassetDashboardModule,DFassetsModule,DFassetMaintenanceModule,DFassetSoftwareLicensesModule,DFassetDisposalModule,DFassetTypeComboModule,DFassetCategoryComboModule,DFassetClassificationComboModule,DFassetDataClassificationComboModule,DFownershipTypeComboModule,DFassetConditionComboModule,DFdisposalMethodComboModule,DFriskLevelComboModule,DFvendorNameComboModule,DFlifecycleStageComboModule,DFcurrencyComboModule,DFassetDocTableModule,DFassignDocTableModule,DFcategoryDocTableModule,DFassetAssignmentsModule,DFassetNameComboModule,DFassignmentStatusComboModule,DFconditionAtReturnComboModule,DFapprovalStatusComboModule,DFmaintenanceTypeComboModule,DFpriorityComboModule,DFassetCategoryModule,DFparentCategoryComboModule,DFdepreciationMethodComboModule,DFassetCategoryCardsModule,DFlicenseTypeComboModule,DFsoftwareDocTableModule,addAssetModifyModule,addAssetModule,addAssetDocumentModule,assignAssetModifyModule,assignAssetModule,addAssignDocumentModule,assetMaintenanceModifyModule,assetMaintenanceModule,addCategoryModifyModule,addCategoryModule,addCategoryDocumentModule,assetSoftwareLicensesModifyModule,assetSoftwareLicensesModule,assetSoftwareLicensesDocumentModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,RedisService,ConfigService,EnvData,{
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    }],
})
export class AppModule implements NestModule {
  configure() {}
}
