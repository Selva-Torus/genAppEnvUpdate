
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
import { DFcomboCurrencySearchModule } from './dfd/DFcomboCurrencySearch/v1/DFcomboCurrencySearch.module';    
import { DFtransactionModule } from './dfd/DFtransaction/v1/DFtransaction.module';    
import { DFjourneyModule } from './dfd/DFjourney/v1/DFjourney.module';    
import { DFtranJourneyModule } from './dfd/DFtranJourney/v1/DFtranJourney.module';    
import { DFemployeeListModule } from './dfd/DFemployeeList/v1/DFemployeeList.module';    
import { DFwpsNackFailureTransactionListModule } from './dfd/DFwpsNackFailureTransactionList/v1/DFwpsNackFailureTransactionList.module';    
import { DFsfJourneyViewTransactionModule } from './dfd/DFsfJourneyViewTransaction/v1/DFsfJourneyViewTransaction.module';    
import { DFsfJourneyListWithCountModule } from './dfd/DFsfJourneyListWithCount/v1/DFsfJourneyListWithCount.module';    
import { DFwpsNackFailureTransactionList_postingExceptionViewTransactionModule } from './dfd/DFwpsNackFailureTransactionList_postingExceptionViewTransaction/v1/DFwpsNackFailureTransactionList_postingExceptionViewTransaction.module';    
import { DFwpsNackFailureFileListModule } from './dfd/DFwpsNackFailureFileList/v1/DFwpsNackFailureFileList.module';    
import { DFwpsFileJourneyModule } from './dfd/DFwpsFileJourney/v1/DFwpsFileJourney.module';    
import { DFpostingExpectionFileListModule } from './dfd/DFpostingExpectionFileList/v1/DFpostingExpectionFileList.module';    
import { DFpostingExceptionProcessListModule } from './dfd/DFpostingExceptionProcessList/v1/DFpostingExceptionProcessList.module';    
import { DFwpsDashboardCompanyStructureComboModule } from './dfd/DFwpsDashboardCompanyStructureCombo/v1/DFwpsDashboardCompanyStructureCombo.module';    
import { DFwpsDashboardMolNumberComboModule } from './dfd/DFwpsDashboardMolNumberCombo/v1/DFwpsDashboardMolNumberCombo.module';    
import { DFwpsDashboardSuccessTabModule } from './dfd/DFwpsDashboardSuccessTab/v1/DFwpsDashboardSuccessTab.module';    
import { DFwpsDashboardFailureTabModule } from './dfd/DFwpsDashboardFailureTab/v1/DFwpsDashboardFailureTab.module';    
import { DFwpsDashboardSalaryTypeComboModule } from './dfd/DFwpsDashboardSalaryTypeCombo/v1/DFwpsDashboardSalaryTypeCombo.module';    
import { DFwpsDashboardEmployeesBarchartModule } from './dfd/DFwpsDashboardEmployeesBarchart/v1/DFwpsDashboardEmployeesBarchart.module';    
import { DFwpsDashboardSalaryProcessBarchartModule } from './dfd/DFwpsDashboardSalaryProcessBarchart/v1/DFwpsDashboardSalaryProcessBarchart.module';    
import { DFwpsDashboardMyqueueAllModule } from './dfd/DFwpsDashboardMyqueueAll/v1/DFwpsDashboardMyqueueAll.module';    
import { DFwpsDashboardMonthComboModule } from './dfd/DFwpsDashboardMonthCombo/v1/DFwpsDashboardMonthCombo.module';    
import { DFwpsDashboardYearComboModule } from './dfd/DFwpsDashboardYearCombo/v1/DFwpsDashboardYearCombo.module';    
import { DFwpsDashboardSuccessTabNonWpsModule } from './dfd/DFwpsDashboardSuccessTabNonWps/v1/DFwpsDashboardSuccessTabNonWps.module';    
import { DFwpsDashboardFailureNonWpsTabModule } from './dfd/DFwpsDashboardFailureNonWpsTab/v1/DFwpsDashboardFailureNonWpsTab.module';    
import { DFwpsDashboardMyqueueActionRequiredModule } from './dfd/DFwpsDashboardMyqueueActionRequired/v1/DFwpsDashboardMyqueueActionRequired.module';    
import { DFwpsDashboardMyqueueSalaryReturnRefundModule } from './dfd/DFwpsDashboardMyqueueSalaryReturnRefund/v1/DFwpsDashboardMyqueueSalaryReturnRefund.module';    
import { DFwpsDashboardMyqueueExceptionsModule } from './dfd/DFwpsDashboardMyqueueExceptions/v1/DFwpsDashboardMyqueueExceptions.module';    
import { DFreturnReasonModule } from './dfd/DFreturnReason/v1/DFreturnReason.module';    
import { DFreturnAgentfromTransactionListModule } from './dfd/DFreturnAgentfromTransactionList/v1/DFreturnAgentfromTransactionList.module';    
import { DFrequestReasonModule } from './dfd/DFrequestReason/v1/DFrequestReason.module';    
import { DFreturnFromAgentFileListModule } from './dfd/DFreturnFromAgentFileList/v1/DFreturnFromAgentFileList.module';    
import { DFrequestForRefundFileListModule } from './dfd/DFrequestForRefundFileList/v1/DFrequestForRefundFileList.module';    
import { DFenquiryGetRegEmployerEmployerListModule } from './dfd/DFenquiryGetRegEmployerEmployerList/v1/DFenquiryGetRegEmployerEmployerList.module';    
import { DFenquiryEmployerSalaryRPTModule } from './dfd/DFenquiryEmployerSalaryRPT/v1/DFenquiryEmployerSalaryRPT.module';    
import { DFenquiryGetEmployeeModule } from './dfd/DFenquiryGetEmployee/v1/DFenquiryGetEmployee.module';    
import { DFenquiryViewAllEmployersModule } from './dfd/DFenquiryViewAllEmployers/v1/DFenquiryViewAllEmployers.module';    
import { DFupdateRegEmployerModule } from './dfd/DFupdateRegEmployer/v1/DFupdateRegEmployer.module';    
import { DFRegEmployerModule } from './dfd/DFRegEmployer/v1/DFRegEmployer.module';    
import { DFdashboardViewAllSuccessModule } from './dfd/DFdashboardViewAllSuccess/v1/DFdashboardViewAllSuccess.module';    
import { DFdashboardViewAllFailureModule } from './dfd/DFdashboardViewAllFailure/v1/DFdashboardViewAllFailure.module';    
import { DFsifSummaryReportModule } from './dfd/DFsifSummaryReport/v1/DFsifSummaryReport.module';    
import { DFpifSummaryReportModule } from './dfd/DFpifSummaryReport/v1/DFpifSummaryReport.module';    
import { PFPchangeStatusTranUpdateLogInsertModule } from './pfd/PFPchangeStatusTranUpdateLogInsert/v1/PFPchangeStatusTranUpdateLogInsert.module';    
import { PFPwpsFileProcessRetryAlreadyPostedModule } from './pfd/PFPwpsFileProcessRetryAlreadyPosted/v1/PFPwpsFileProcessRetryAlreadyPosted.module';    
import { PFPwpsReturnAuthorizeProcessModule } from './pfd/PFPwpsReturnAuthorizeProcess/v1/PFPwpsReturnAuthorizeProcess.module';    
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
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFcomboCurrencySearchModule,DFtransactionModule,DFjourneyModule,DFtranJourneyModule,DFemployeeListModule,DFwpsNackFailureTransactionListModule,DFsfJourneyViewTransactionModule,DFsfJourneyListWithCountModule,DFwpsNackFailureTransactionList_postingExceptionViewTransactionModule,DFwpsNackFailureFileListModule,DFwpsFileJourneyModule,DFpostingExpectionFileListModule,DFpostingExceptionProcessListModule,DFwpsDashboardCompanyStructureComboModule,DFwpsDashboardMolNumberComboModule,DFwpsDashboardSuccessTabModule,DFwpsDashboardFailureTabModule,DFwpsDashboardSalaryTypeComboModule,DFwpsDashboardEmployeesBarchartModule,DFwpsDashboardSalaryProcessBarchartModule,DFwpsDashboardMyqueueAllModule,DFwpsDashboardMonthComboModule,DFwpsDashboardYearComboModule,DFwpsDashboardSuccessTabNonWpsModule,DFwpsDashboardFailureNonWpsTabModule,DFwpsDashboardMyqueueActionRequiredModule,DFwpsDashboardMyqueueSalaryReturnRefundModule,DFwpsDashboardMyqueueExceptionsModule,DFreturnReasonModule,DFreturnAgentfromTransactionListModule,DFrequestReasonModule,DFreturnFromAgentFileListModule,DFrequestForRefundFileListModule,DFenquiryGetRegEmployerEmployerListModule,DFenquiryEmployerSalaryRPTModule,DFenquiryGetEmployeeModule,DFenquiryViewAllEmployersModule,DFupdateRegEmployerModule,DFRegEmployerModule,DFdashboardViewAllSuccessModule,DFdashboardViewAllFailureModule,DFsifSummaryReportModule,DFpifSummaryReportModule,PFPchangeStatusTranUpdateLogInsertModule,PFPwpsFileProcessRetryAlreadyPostedModule,PFPwpsReturnAuthorizeProcessModule,], 
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
