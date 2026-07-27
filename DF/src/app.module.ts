
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
import { CdcPrismaService } from './erd/cdc_prisma.service';
import { DFhrmDashboardModule } from './dfd/DFhrmDashboard/v1/DFhrmDashboard.module';    
import { DFemployeesModule } from './dfd/DFemployees/v1/DFemployees.module';    
import { DFaccessRequestModule } from './dfd/DFaccessRequest/v1/DFaccessRequest.module';    
import { DFbloodGroupComboModule } from './dfd/DFbloodGroupCombo/v1/DFbloodGroupCombo.module';    
import { DFmaritalStatusComboModule } from './dfd/DFmaritalStatusCombo/v1/DFmaritalStatusCombo.module';    
import { DFemploymentTypeComboModule } from './dfd/DFemploymentTypeCombo/v1/DFemploymentTypeCombo.module';    
import { DFemployeeStatusComboModule } from './dfd/DFemployeeStatusCombo/v1/DFemployeeStatusCombo.module';    
import { DFgradeCodeComboModule } from './dfd/DFgradeCodeCombo/v1/DFgradeCodeCombo.module';    
import { DFvacancyStatusComboModule } from './dfd/DFvacancyStatusCombo/v1/DFvacancyStatusCombo.module';    
import { DFpositionCodeComboModule } from './dfd/DFpositionCodeCombo/v1/DFpositionCodeCombo.module';    
import { DFempWorkModeComboModule } from './dfd/DFempWorkModeCombo/v1/DFempWorkModeCombo.module';    
import { DFgenderComboModule } from './dfd/DFgenderCombo/v1/DFgenderCombo.module';    
import { DFskillJsonModule } from './dfd/DFskillJson/v1/DFskillJson.module';    
import { DFfamilyJsonModule } from './dfd/DFfamilyJson/v1/DFfamilyJson.module';    
import { DFeducationJsonModule } from './dfd/DFeducationJson/v1/DFeducationJson.module';    
import { DFcertifyJsonModule } from './dfd/DFcertifyJson/v1/DFcertifyJson.module';    
import { DFcountryComboModule } from './dfd/DFcountryCombo/v1/DFcountryCombo.module';    
import { DFstateComboModule } from './dfd/DFstateCombo/v1/DFstateCombo.module';    
import { DFcurrencyComboModule } from './dfd/DFcurrencyCombo/v1/DFcurrencyCombo.module';    
import { DFemployeeDocTableModule } from './dfd/DFemployeeDocTable/v1/DFemployeeDocTable.module';    
import { DFgradeDocTableModule } from './dfd/DFgradeDocTable/v1/DFgradeDocTable.module';    
import { DFpositionDocTableModule } from './dfd/DFpositionDocTable/v1/DFpositionDocTable.module';    
import { DFaccessReqDocTableModule } from './dfd/DFaccessReqDocTable/v1/DFaccessReqDocTable.module';    
import { DFleaveManageDocTableModule } from './dfd/DFleaveManageDocTable/v1/DFleaveManageDocTable.module';    
import { DFleavePolicyDocTableModule } from './dfd/DFleavePolicyDocTable/v1/DFleavePolicyDocTable.module';    
import { DFbackgroundCheckDocTableModule } from './dfd/DFbackgroundCheckDocTable/v1/DFbackgroundCheckDocTable.module';    
import { DFperformanceReviewDocTableModule } from './dfd/DFperformanceReviewDocTable/v1/DFperformanceReviewDocTable.module';    
import { DFaccessLevelComboModule } from './dfd/DFaccessLevelCombo/v1/DFaccessLevelCombo.module';    
import { DFaddAccessRequestModifyModule } from './dfd/DFaddAccessRequestModify/v1/DFaddAccessRequestModify.module';    
import { DFrequestPriorityComboModule } from './dfd/DFrequestPriorityCombo/v1/DFrequestPriorityCombo.module';    
import { DFrequestTypeComboModule } from './dfd/DFrequestTypeCombo/v1/DFrequestTypeCombo.module';    
import { DFriskLevelComboModule } from './dfd/DFriskLevelCombo/v1/DFriskLevelCombo.module';    
import { DFprovisioningStatusComboModule } from './dfd/DFprovisioningStatusCombo/v1/DFprovisioningStatusCombo.module';    
import { DFemployeeNameComboModule } from './dfd/DFemployeeNameCombo/v1/DFemployeeNameCombo.module';    
import { DFpolicyNameComboModule } from './dfd/DFpolicyNameCombo/v1/DFpolicyNameCombo.module';    
import { DFleaveReasonCategoryComboModule } from './dfd/DFleaveReasonCategoryCombo/v1/DFleaveReasonCategoryCombo.module';    
import { DFapplyLeaveModule } from './dfd/DFapplyLeave/v1/DFapplyLeave.module';    
import { DFindividualLeaveReqTableModule } from './dfd/DFindividualLeaveReqTable/v1/DFindividualLeaveReqTable.module';    
import { DFleavePieChartModule } from './dfd/DFleavePieChart/v1/DFleavePieChart.module';    
import { DFindividualLeaveReqCardsModule } from './dfd/DFindividualLeaveReqCards/v1/DFindividualLeaveReqCards.module';    
import { DFleaveRequestTabModule } from './dfd/DFleaveRequestTab/v1/DFleaveRequestTab.module';    
import { DFleaveApprovalPendingTabModule } from './dfd/DFleaveApprovalPendingTab/v1/DFleaveApprovalPendingTab.module';    
import { DFbackgroundCheckModule } from './dfd/DFbackgroundCheck/v1/DFbackgroundCheck.module';    
import { DFaddBackgroundCheckModifyModule } from './dfd/DFaddBackgroundCheckModify/v1/DFaddBackgroundCheckModify.module';    
import { DFcheckTypeComboModule } from './dfd/DFcheckTypeCombo/v1/DFcheckTypeCombo.module';    
import { DFbgCheckResultComboModule } from './dfd/DFbgCheckResultCombo/v1/DFbgCheckResultCombo.module';    
import { DFcheckVerificationStatusComboModule } from './dfd/DFcheckVerificationStatusCombo/v1/DFcheckVerificationStatusCombo.module';    
import { DFperformanceReviewsModule } from './dfd/DFperformanceReviews/v1/DFperformanceReviews.module';    
import { DFaddPerformanceReviewModifyModule } from './dfd/DFaddPerformanceReviewModify/v1/DFaddPerformanceReviewModify.module';    
import { DFcycleNameComboModule } from './dfd/DFcycleNameCombo/v1/DFcycleNameCombo.module';    
import { DFreviewStatusComboModule } from './dfd/DFreviewStatusCombo/v1/DFreviewStatusCombo.module';    
import { DFreviewTypeComboModule } from './dfd/DFreviewTypeCombo/v1/DFreviewTypeCombo.module';    
import { DFperformanceCycleModule } from './dfd/DFperformanceCycle/v1/DFperformanceCycle.module';    
import { DFjobGradeModule } from './dfd/DFjobGrade/v1/DFjobGrade.module';    
import { DFappraisalCycleComboModule } from './dfd/DFappraisalCycleCombo/v1/DFappraisalCycleCombo.module';    
import { DFjobPositionsModule } from './dfd/DFjobPositions/v1/DFjobPositions.module';    
import { DFgradeNameComboModule } from './dfd/DFgradeNameCombo/v1/DFgradeNameCombo.module';    
import { DFleavePolicyModule } from './dfd/DFleavePolicy/v1/DFleavePolicy.module';    
import { DFaddLeavePolicyModifyModule } from './dfd/DFaddLeavePolicyModify/v1/DFaddLeavePolicyModify.module';    
import { DFleaveTypeComboModule } from './dfd/DFleaveTypeCombo/v1/DFleaveTypeCombo.module';    
import { DFaccrualFrequencyComboModule } from './dfd/DFaccrualFrequencyCombo/v1/DFaccrualFrequencyCombo.module';    
import { DFaddPerformanceCycleModifyModule } from './dfd/DFaddPerformanceCycleModify/v1/DFaddPerformanceCycleModify.module';    
import { DFcycleTypeComboModule } from './dfd/DFcycleTypeCombo/v1/DFcycleTypeCombo.module';    
import { DFreviewFrequencyComboModule } from './dfd/DFreviewFrequencyCombo/v1/DFreviewFrequencyCombo.module';    
import { addEmployeeModifyModule } from './pfd/addEmployeeModify/v1/addEmployeeModify.module';    
import { addEmployeeModule } from './pfd/addEmployee/v1/addEmployee.module';    
import { employeesDocumentModule } from './pfd/employeesDocument/v1/employeesDocument.module';    
import { accessRequestModifyModule } from './pfd/accessRequestModify/v1/accessRequestModify.module';    
import { newAccessRequestModule } from './pfd/newAccessRequest/v1/newAccessRequest.module';    
import { accessReqDocumentModule } from './pfd/accessReqDocument/v1/accessReqDocument.module';    
import { approveNewAccessRequestModule } from './pfd/approveNewAccessRequest/v1/approveNewAccessRequest.module';    
import { addLeaveRequestModule } from './pfd/addLeaveRequest/v1/addLeaveRequest.module';    
import { leaveManageDocumentModule } from './pfd/leaveManageDocument/v1/leaveManageDocument.module';    
import { addLeaveRequestApprovalModule } from './pfd/addLeaveRequestApproval/v1/addLeaveRequestApproval.module';    
import { backgroundCheckModifyModule } from './pfd/backgroundCheckModify/v1/backgroundCheckModify.module';    
import { addBackgroundCheckModule } from './pfd/addBackgroundCheck/v1/addBackgroundCheck.module';    
import { backgroundCheckDocumentModule } from './pfd/backgroundCheckDocument/v1/backgroundCheckDocument.module';    
import { addPerformanceReviewModifyModule } from './pfd/addPerformanceReviewModify/v1/addPerformanceReviewModify.module';    
import { addPerformanceReviewModule } from './pfd/addPerformanceReview/v1/addPerformanceReview.module';    
import { performanceReviewDocumentModule } from './pfd/performanceReviewDocument/v1/performanceReviewDocument.module';    
import { addJobGradeModifyModule } from './pfd/addJobGradeModify/v1/addJobGradeModify.module';    
import { addJobGradeModule } from './pfd/addJobGrade/v1/addJobGrade.module';    
import { addGradeDocumentModule } from './pfd/addGradeDocument/v1/addGradeDocument.module';    
import { addJobPositionModifyModule } from './pfd/addJobPositionModify/v1/addJobPositionModify.module';    
import { addJobPositionModule } from './pfd/addJobPosition/v1/addJobPosition.module';    
import { addPositionDocumentModule } from './pfd/addPositionDocument/v1/addPositionDocument.module';    
import { addLeavePolicyModifyModule } from './pfd/addLeavePolicyModify/v1/addLeavePolicyModify.module';    
import { newLeavePolicyModule } from './pfd/newLeavePolicy/v1/newLeavePolicy.module';    
import { leavePolicyDocumentModule } from './pfd/leavePolicyDocument/v1/leavePolicyDocument.module';    
import { addPerformanceCycleModifyModule } from './pfd/addPerformanceCycleModify/v1/addPerformanceCycleModify.module';    
import { addPerformanceCycleModule } from './pfd/addPerformanceCycle/v1/addPerformanceCycle.module';    
//import { DecryptPayloadMiddleware } from './decryptPayloadMiddleware';
import { EncryptInterceptor } from './encryptInterceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { BullModule } from '@nestjs/bullmq';
import { EnvDataModule } from './envData/envData.module';
import { EnvData } from './envData/envData.service';
//import { PersistenceService } from './persistence.service';


@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT)       
      },
    }),
  CacheModule.register({isGlobal:true}),
  ScheduleModule.forRoot(),UfModule,TeModule,EnvDataModule,DFhrmDashboardModule,DFemployeesModule,DFaccessRequestModule,DFbloodGroupComboModule,DFmaritalStatusComboModule,DFemploymentTypeComboModule,DFemployeeStatusComboModule,DFgradeCodeComboModule,DFvacancyStatusComboModule,DFpositionCodeComboModule,DFempWorkModeComboModule,DFgenderComboModule,DFskillJsonModule,DFfamilyJsonModule,DFeducationJsonModule,DFcertifyJsonModule,DFcountryComboModule,DFstateComboModule,DFcurrencyComboModule,DFemployeeDocTableModule,DFgradeDocTableModule,DFpositionDocTableModule,DFaccessReqDocTableModule,DFleaveManageDocTableModule,DFleavePolicyDocTableModule,DFbackgroundCheckDocTableModule,DFperformanceReviewDocTableModule,DFaccessLevelComboModule,DFaddAccessRequestModifyModule,DFrequestPriorityComboModule,DFrequestTypeComboModule,DFriskLevelComboModule,DFprovisioningStatusComboModule,DFemployeeNameComboModule,DFpolicyNameComboModule,DFleaveReasonCategoryComboModule,DFapplyLeaveModule,DFindividualLeaveReqTableModule,DFleavePieChartModule,DFindividualLeaveReqCardsModule,DFleaveRequestTabModule,DFleaveApprovalPendingTabModule,DFbackgroundCheckModule,DFaddBackgroundCheckModifyModule,DFcheckTypeComboModule,DFbgCheckResultComboModule,DFcheckVerificationStatusComboModule,DFperformanceReviewsModule,DFaddPerformanceReviewModifyModule,DFcycleNameComboModule,DFreviewStatusComboModule,DFreviewTypeComboModule,DFperformanceCycleModule,DFjobGradeModule,DFappraisalCycleComboModule,DFjobPositionsModule,DFgradeNameComboModule,DFleavePolicyModule,DFaddLeavePolicyModifyModule,DFleaveTypeComboModule,DFaccrualFrequencyComboModule,DFaddPerformanceCycleModifyModule,DFcycleTypeComboModule,DFreviewFrequencyComboModule,addEmployeeModifyModule,addEmployeeModule,employeesDocumentModule,accessRequestModifyModule,newAccessRequestModule,accessReqDocumentModule,approveNewAccessRequestModule,addLeaveRequestModule,leaveManageDocumentModule,addLeaveRequestApprovalModule,backgroundCheckModifyModule,addBackgroundCheckModule,backgroundCheckDocumentModule,addPerformanceReviewModifyModule,addPerformanceReviewModule,performanceReviewDocumentModule,addJobGradeModifyModule,addJobGradeModule,addGradeDocumentModule,addJobPositionModifyModule,addJobPositionModule,addPositionDocumentModule,addLeavePolicyModifyModule,newLeavePolicyModule,leavePolicyDocumentModule,addPerformanceCycleModifyModule,addPerformanceCycleModule,ErdModule,], 
  controllers: [AppController],
  providers: [AppService,CommonService,RuleService,CodeService,JwtService,RedisService,ConfigService,EnvData,{
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },CdcPrismaService ],
})
export class AppModule implements NestModule {
  configure() {}
}
