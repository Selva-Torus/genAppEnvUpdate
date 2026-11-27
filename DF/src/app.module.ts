
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonService } from './common.Service';
import { RuleService } from './ruleService';
import { CodeService } from './codeService';
import { RedisService } from './redisService';
import { JwtService } from '@nestjs/jwt';
import { JwtServices } from "src/jwt.services";
import { UfModule } from './Torus/v1/uf/uf.module';
import { TeModule } from './Torus/v1/te/te.module';
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from '@nestjs/schedule';
import { DFtransactionModule } from './dfd/DFtransaction/v1/DFtransaction.module';    
import { DFchannelComboSearchModule } from './dfd/DFchannelComboSearch/v1/DFchannelComboSearch.module';    
import { DFprocessStatusComboSearchModule } from './dfd/DFprocessStatusComboSearch/v1/DFprocessStatusComboSearch.module';    
import { DFcurrencyComboModule } from './dfd/DFcurrencyCombo/v1/DFcurrencyCombo.module';    
import { DFbeneficiaryListQueryModule } from './dfd/DFbeneficiaryListQuery/v1/DFbeneficiaryListQuery.module';    
import { DFpurposeComboModule } from './dfd/DFpurposeCombo/v1/DFpurposeCombo.module';    
import { DFcountryComboModule } from './dfd/DFcountryCombo/v1/DFcountryCombo.module';    
import { DFcrBankCodeComboModule } from './dfd/DFcrBankCodeCombo/v1/DFcrBankCodeCombo.module';    
import { DFdrBankCodeComboModule } from './dfd/DFdrBankCodeCombo/v1/DFdrBankCodeCombo.module';    
import { DFchargeTypeComboModule } from './dfd/DFchargeTypeCombo/v1/DFchargeTypeCombo.module';    
import { DFpaymentMethodComboModule } from './dfd/DFpaymentMethodCombo/v1/DFpaymentMethodCombo.module';    
import { DFinitiationInstructionPriorityComboModule } from './dfd/DFinitiationInstructionPriorityCombo/v1/DFinitiationInstructionPriorityCombo.module';    
import { DFcategoryPurposeComboModule } from './dfd/DFcategoryPurposeCombo/v1/DFcategoryPurposeCombo.module';    
import { DFcorrespondentBankComboModule } from './dfd/DFcorrespondentBankCombo/v1/DFcorrespondentBankCombo.module';    
import { DFmanualInitiationUIMappingQueryModule } from './dfd/DFmanualInitiationUIMappingQuery/v1/DFmanualInitiationUIMappingQuery.module';    
import { DFserviceLevelComboModule } from './dfd/DFserviceLevelCombo/v1/DFserviceLevelCombo.module';    
import { DFjourneyModule } from './dfd/DFjourney/v1/DFjourney.module';    
import { DFreturnReasonModule } from './dfd/DFreturnReason/v1/DFreturnReason.module';    
import { DFtransactionDetailQueryModule } from './dfd/DFtransactionDetailQuery/v1/DFtransactionDetailQuery.module';    
import { DFenquiryPaymentTypeComboModule } from './dfd/DFenquiryPaymentTypeCombo/v1/DFenquiryPaymentTypeCombo.module';    
import { DFenquiryMessageTypeComboModule } from './dfd/DFenquiryMessageTypeCombo/v1/DFenquiryMessageTypeCombo.module';    
import { DFnfTransactionModule } from './dfd/DFnfTransaction/v1/DFnfTransaction.module';    
import { DFnfTranMainTransactionModule } from './dfd/DFnfTranMainTransaction/v1/DFnfTranMainTransaction.module';    
import { DFnfCancelReasonComboModule } from './dfd/DFnfCancelReasonCombo/v1/DFnfCancelReasonCombo.module';    
import { DFnfInvestigationTypeComboModule } from './dfd/DFnfInvestigationTypeCombo/v1/DFnfInvestigationTypeCombo.module';    
import { DFnfInvestigationReasonComboModule } from './dfd/DFnfInvestigationReasonCombo/v1/DFnfInvestigationReasonCombo.module';    
import { DFnfResponseTypeComboModule } from './dfd/DFnfResponseTypeCombo/v1/DFnfResponseTypeCombo.module';    
import { DFnfResponseReasonComboModule } from './dfd/DFnfResponseReasonCombo/v1/DFnfResponseReasonCombo.module';    
import { DFnfViewAllTransactionModule } from './dfd/DFnfViewAllTransaction/v1/DFnfViewAllTransaction.module';    
import { DFmessageTypeSimulatorComboModule } from './dfd/DFmessageTypeSimulatorCombo/v1/DFmessageTypeSimulatorCombo.module';    
import { DFstatusSimulatorComboModule } from './dfd/DFstatusSimulatorCombo/v1/DFstatusSimulatorCombo.module';    
import { DFipmessageTypeStimulatorComboModule } from './dfd/DFipmessageTypeStimulatorCombo/v1/DFipmessageTypeStimulatorCombo.module';    
import { DFnfSimulatorMessageModule } from './dfd/DFnfSimulatorMessage/v1/DFnfSimulatorMessage.module';    
import { DFnfReqTypeModule } from './dfd/DFnfReqType/v1/DFnfReqType.module';    
import { DFnfReqReasonModule } from './dfd/DFnfReqReason/v1/DFnfReqReason.module';    
import { DFnfRespReasonModule } from './dfd/DFnfRespReason/v1/DFnfRespReason.module';    
import { DFnfRespTypeModule } from './dfd/DFnfRespType/v1/DFnfRespType.module';    
import { DFrejectReasonSimulatorComboModule } from './dfd/DFrejectReasonSimulatorCombo/v1/DFrejectReasonSimulatorCombo.module';    
import { DFchannelDashboard_dashboardModule } from './dfd/DFchannelDashboard_dashboard/v1/DFchannelDashboard_dashboard.module';    
import { DFcurrencyDashboard_dashboardModule } from './dfd/DFcurrencyDashboard_dashboard/v1/DFcurrencyDashboard_dashboard.module';    
import { DFtransaction_dashboardModule } from './dfd/DFtransaction_dashboard/v1/DFtransaction_dashboard.module';    
import { DFonlineOfflineDashboard_dashboardModule } from './dfd/DFonlineOfflineDashboard_dashboard/v1/DFonlineOfflineDashboard_dashboard.module';    
import { DFprocessCategoryDashboard_dashboardModule } from './dfd/DFprocessCategoryDashboard_dashboard/v1/DFprocessCategoryDashboard_dashboard.module';    
import { DFtransactionCountVphDashboard_dashboardModule } from './dfd/DFtransactionCountVphDashboard_dashboard/v1/DFtransactionCountVphDashboard_dashboard.module';    
import { DFchannelCountVphDashboard_dashboardModule } from './dfd/DFchannelCountVphDashboard_dashboard/v1/DFchannelCountVphDashboard_dashboard.module';    
import { DFchannelChartDashboard_dashboardModule } from './dfd/DFchannelChartDashboard_dashboard/v1/DFchannelChartDashboard_dashboard.module';    
import { DFonlineOfflineCountVPHDashboard_dashboardModule } from './dfd/DFonlineOfflineCountVPHDashboard_dashboard/v1/DFonlineOfflineCountVPHDashboard_dashboard.module';    
import { PFPchangeStatusTranUpdateLogInsertModule } from './pfd/PFPchangeStatusTranUpdateLogInsert/v1/PFPchangeStatusTranUpdateLogInsert.module';    
import { PFPchangeStatusTranUpdateLogInsertWithContinueProcessModule } from './pfd/PFPchangeStatusTranUpdateLogInsertWithContinueProcess/v1/PFPchangeStatusTranUpdateLogInsertWithContinueProcess.module';    
import { PFPmanualInitiationSaveModule } from './pfd/PFPmanualInitiationSave/v1/PFPmanualInitiationSave.module';    
import { PFPmanualInitiationGetCustDetailsApiModule } from './pfd/PFPmanualInitiationGetCustDetailsApi/v1/PFPmanualInitiationGetCustDetailsApi.module';    
import { PFPmanualInitiationModifyExchangeRateModule } from './pfd/PFPmanualInitiationModifyExchangeRate/v1/PFPmanualInitiationModifyExchangeRate.module';    
import { PFPmanualInitiationSplFXRateApiModule } from './pfd/PFPmanualInitiationSplFXRateApi/v1/PFPmanualInitiationSplFXRateApi.module';    
import { PFPmanualInitiationChargeCalulationApiModule } from './pfd/PFPmanualInitiationChargeCalulationApi/v1/PFPmanualInitiationChargeCalulationApi.module';    
import { PFPTranDtlChangeStatusTranUpdateLogInsertModule } from './pfd/PFPTranDtlChangeStatusTranUpdateLogInsert/v1/PFPTranDtlChangeStatusTranUpdateLogInsert.module';    
import { PFPoutboundRetunExchangeRateBindProcessModule } from './pfd/PFPoutboundRetunExchangeRateBindProcess/v1/PFPoutboundRetunExchangeRateBindProcess.module';    
import { PFPoutboundApplySplRateModule } from './pfd/PFPoutboundApplySplRate/v1/PFPoutboundApplySplRate.module';    
import { PFPinboundApplySplRateExchangeRateBindProcessModule } from './pfd/PFPinboundApplySplRateExchangeRateBindProcess/v1/PFPinboundApplySplRateExchangeRateBindProcess.module';    
import { PFPenquiryContinueProcessModule } from './pfd/PFPenquiryContinueProcess/v1/PFPenquiryContinueProcess.module';    
import { PFPinboundRetunrBindProcessModule } from './pfd/PFPinboundRetunrBindProcess/v1/PFPinboundRetunrBindProcess.module';    
import { PFPoutboundReturnBindProcessModule } from './pfd/PFPoutboundReturnBindProcess/v1/PFPoutboundReturnBindProcess.module';    
import { PFPinboundApplySplRateBindProcessModule } from './pfd/PFPinboundApplySplRateBindProcess/v1/PFPinboundApplySplRateBindProcess.module';    
import { PFPnfchangeStatusTranUpdateLogInsertModule } from './pfd/PFPnfchangeStatusTranUpdateLogInsert/v1/PFPnfchangeStatusTranUpdateLogInsert.module';    
import { PFPnfchangeStatusTranUpdateLogInsertWithContinueProcessModule } from './pfd/PFPnfchangeStatusTranUpdateLogInsertWithContinueProcess/v1/PFPnfchangeStatusTranUpdateLogInsertWithContinueProcess.module';    
import { PFPnfTranmainInitiationSaveModule } from './pfd/PFPnfTranmainInitiationSave/v1/PFPnfTranmainInitiationSave.module';    
import { PFPnfBindTranProcessModule } from './pfd/PFPnfBindTranProcess/v1/PFPnfBindTranProcess.module';    
import { PFPackSimulatorModule } from './pfd/PFPackSimulator/v1/PFPackSimulator.module';    
import { EncryptInterceptor } from './encryptInterceptor';
import { DecryptInterceptor } from './decryptInterceptor';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';
import { PersistenceService } from './persistence.service';
import { SwaggerGuard } from './swagger.guard';
import { AuthGuard } from './auth.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { getRedisConnectionOptions } from './redis.config';
import { FusionAuthModule } from './Torus/v1/fusionauth/fusionauth.module';


@Module({
  imports: [
    BullModule.forRoot({
      connection: getRedisConnectionOptions(),
    }),
  CacheModule.register({isGlobal:true}),
   ThrottlerModule.forRoot({
    throttlers: [
      { name: 'default', ttl: 10_000, limit: 120 }
    ],
  }),
  ScheduleModule.forRoot(),UfModule, FusionAuthModule, TeModule,EnvDataModule,DFtransactionModule,DFchannelComboSearchModule,DFprocessStatusComboSearchModule,DFcurrencyComboModule,DFbeneficiaryListQueryModule,DFpurposeComboModule,DFcountryComboModule,DFcrBankCodeComboModule,DFdrBankCodeComboModule,DFchargeTypeComboModule,DFpaymentMethodComboModule,DFinitiationInstructionPriorityComboModule,DFcategoryPurposeComboModule,DFcorrespondentBankComboModule,DFmanualInitiationUIMappingQueryModule,DFserviceLevelComboModule,DFjourneyModule,DFreturnReasonModule,DFtransactionDetailQueryModule,DFenquiryPaymentTypeComboModule,DFenquiryMessageTypeComboModule,DFnfTransactionModule,DFnfTranMainTransactionModule,DFnfCancelReasonComboModule,DFnfInvestigationTypeComboModule,DFnfInvestigationReasonComboModule,DFnfResponseTypeComboModule,DFnfResponseReasonComboModule,DFnfViewAllTransactionModule,DFmessageTypeSimulatorComboModule,DFstatusSimulatorComboModule,DFipmessageTypeStimulatorComboModule,DFnfSimulatorMessageModule,DFnfReqTypeModule,DFnfReqReasonModule,DFnfRespReasonModule,DFnfRespTypeModule,DFrejectReasonSimulatorComboModule,DFchannelDashboard_dashboardModule,DFcurrencyDashboard_dashboardModule,DFtransaction_dashboardModule,DFonlineOfflineDashboard_dashboardModule,DFprocessCategoryDashboard_dashboardModule,DFtransactionCountVphDashboard_dashboardModule,DFchannelCountVphDashboard_dashboardModule,DFchannelChartDashboard_dashboardModule,DFonlineOfflineCountVPHDashboard_dashboardModule,PFPchangeStatusTranUpdateLogInsertModule,PFPchangeStatusTranUpdateLogInsertWithContinueProcessModule,PFPmanualInitiationSaveModule,PFPmanualInitiationGetCustDetailsApiModule,PFPmanualInitiationModifyExchangeRateModule,PFPmanualInitiationSplFXRateApiModule,PFPmanualInitiationChargeCalulationApiModule,PFPTranDtlChangeStatusTranUpdateLogInsertModule,PFPoutboundRetunExchangeRateBindProcessModule,PFPoutboundApplySplRateModule,PFPinboundApplySplRateExchangeRateBindProcessModule,PFPenquiryContinueProcessModule,PFPinboundRetunrBindProcessModule,PFPoutboundReturnBindProcessModule,PFPinboundApplySplRateBindProcessModule,PFPnfchangeStatusTranUpdateLogInsertModule,PFPnfchangeStatusTranUpdateLogInsertWithContinueProcessModule,PFPnfTranmainInitiationSaveModule,PFPnfBindTranProcessModule,PFPackSimulatorModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,JwtServices,RedisService,ConfigService,EnvData,PersistenceService,SwaggerGuard, {
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
    { provide: APP_INTERCEPTOR, useClass: DecryptInterceptor },
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard
    }],
})
export class AppModule implements NestModule {
  configure() {}
}
