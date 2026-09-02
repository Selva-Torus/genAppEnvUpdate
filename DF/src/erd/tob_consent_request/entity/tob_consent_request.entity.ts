import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { tob_api_process_logsEntity } from '../../tob_api_process_logs/entity/tob_api_process_logs.entity';



        export enum usertype_tob_ctbody_openfinancebilling{
            Retail="Retail",
            SME="SME",
            Corporate="Corporate",
        }
        export enum purpose_tob_ctbody_openfinancebilling{
            AccountAggregation="AccountAggregation",
            RiskAssessment="RiskAssessment",
            TaxFiling="TaxFiling",
            Onboarding="Onboarding",
            Verification="Verification",
            QuoteComparison="QuoteComparison",
            BudgetingAnalysis="BudgetingAnalysis",
            FinancialAdvice="FinancialAdvice",
            AuditReconciliation="AuditReconciliation",
        }
        export enum identifiertype_tob_ctbody_onbehalfof{
            Other="Other",
        }
        export enum accounttype_tob_ctbody_data{
            Retail="Retail",
            SME="SME",
        }
        export enum accountsubtype_tob_ctbody_data{
            CurrentAccount="CurrentAccount",
            Savings="Savings",
        }
        export enum status_tob_ctbody_data{
            Authorized="Authorized",
            Rejected="Rejected",
            Revoked="Revoked",
            Expired="Expired",
            Consumed="Consumed",
            Suspended="Suspended",
        }
        export enum purpose_tob_ctbody_data{
            Account_Aggregation="Account_Aggregation",
            Personal_Finance_Manager="Personal_Finance_Manager",
            Other="Other",
        }
        export enum revokedby_tob_ctbody_data{
            LFI="LFI",
            TPP="TPP",
            LFIInitiatedByUser="LFIInitiatedByUser",
            TPPInitiatedByUser="TPPInitiatedByUser",
        }
        export enum permissions_tob_ctbody_data{
            ReadAccountsBasic="ReadAccountsBasic",
            ReadAccountsDetail="ReadAccountsDetail",
            ReadBalances="ReadBalances",
            ReadParty="ReadParty",
            ReadProduct="ReadProduct",
            ReadDirectDebits="ReadDirectDebits",
        }
        export enum authorizationstatus_tob_multiauth_totalreq{
            Pending="Pending",
            Approved="Approved",
            Rejected="Rejected",
        }
        export enum usertype_tob_openfinance_billing{
            Retail="Retail",
            SME="SME",
            Corporate="Corporate",
        }
        export enum purpose_tob_openfinance_billing{
            AccountAggregation="AccountAggregation",
            RiskAssessment="RiskAssessment",
            TaxFiling="TaxFiling",
            Onboarding="Onboarding",
            Verification="Verification",
            QuoteComparison="QuoteComparison",
            BudgetingAnalysis="BudgetingAnalysis",
            FinancialAdvice="FinancialAdvice",
            AuditReconciliation="AuditReconciliation",
        }
        export enum identifiertype_tob_request_onbehalfof{
            Other="Other",
        }
        export enum accounttype_tob_request_consent{
            Retail="Retail",
            SME="SME",
            Corporate="Corporate",
        }
        export enum accountsubtype_tob_request_consent{
            CurrentAccount="CurrentAccount",
            Savings="Savings",
        }
        export enum permissions_tob_request_consent{
            ReadAccountsBasic="ReadAccountsBasic",
            ReadParty="ReadParty",
            ReadBalances="ReadBalances",
            ReadAccountsDetail="ReadAccountsDetail",
            ReadProduct="ReadProduct",
            ReadDirectDebits="ReadDirectDebits",
        }
        export enum authorizationchannel_tob_consent_request{
            App="App",
            Web="Web",
        }
     
  export class tob_psuidentifiersEntity {
        @ApiPropertyOptional()
        @IsOptional()
        userid?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_decodedssaEntity {
        @ApiProperty({type : [String]})  
        redirect_uris: String[]                  
        @ApiPropertyOptional()
        @IsOptional()
        client_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        client_uri?: string;
        @ApiPropertyOptional()
        @IsOptional()
        logo_uri?: string;
        @ApiPropertyOptional()
        @IsOptional()
        jwks_uri?: string;
        @ApiPropertyOptional()
        @IsOptional()
        client_id?: string;
        @ApiProperty({type : [String]})  
        roles: String[]                  
        @ApiPropertyOptional()
        @IsOptional()
        sector_identifier_uri?: string;
        @ApiPropertyOptional()
        @IsOptional()
        application_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        organisation_id?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_tppEntity {
        @ApiProperty()
        clientid: string;
        @ApiPropertyOptional()
        @IsOptional()
        tppid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tppname?: string;
        @ApiPropertyOptional()
        @IsOptional()
        softwarestatementid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        directoryrecord?: string;
        @ApiPropertyOptional({type :() => tob_decodedssaEntity}) 
        @IsOptional()
        decodedssa? : tob_decodedssaEntity
        @ApiPropertyOptional()
        @IsOptional()
        orgid?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_ctbody_openfinancebillingEntity {
        @ApiPropertyOptional()
        @IsOptional()
        islargecorporate?: boolean;
        @ApiPropertyOptional({enum :usertype_tob_ctbody_openfinancebilling,enumName:"usertype",type:"string"}) 
        @IsOptional()
        usertype? : usertype_tob_ctbody_openfinancebilling
        @ApiPropertyOptional({enum :purpose_tob_ctbody_openfinancebilling,enumName:"purpose",type:"string"}) 
        @IsOptional()
        purpose? : purpose_tob_ctbody_openfinancebilling
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_ctbody_onbehalfofEntity {
        @ApiPropertyOptional()
        @IsOptional()
        tradingname?: string;
        @ApiPropertyOptional()
        @IsOptional()
        legalname?: string;
        @ApiPropertyOptional({enum :identifiertype_tob_ctbody_onbehalfof,enumName:"identifiertype",type:"string"}) 
        @IsOptional()
        identifiertype? : identifiertype_tob_ctbody_onbehalfof
        @ApiPropertyOptional()
        @IsOptional()
        identifier?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_ctbody_dataEntity {
        @ApiPropertyOptional()
        @IsOptional()
        baseconsentid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        expirationdatetime?: string;
        @ApiPropertyOptional()
        @IsOptional()
        transactionfromdatetime?: string;
        @ApiPropertyOptional()
        @IsOptional()
        transactiontodatetime?: string;
        @ApiPropertyOptional({enum :accounttype_tob_ctbody_data,isArray: true}) 
        @IsOptional()
        accounttype? : accounttype_tob_ctbody_data
        @ApiPropertyOptional({enum :accountsubtype_tob_ctbody_data,isArray: true}) 
        @IsOptional()
        accountsubtype? : accountsubtype_tob_ctbody_data
        @ApiPropertyOptional({type :() => tob_ctbody_onbehalfofEntity}) 
        @IsOptional()
        onbehalfof? : tob_ctbody_onbehalfofEntity
        @ApiPropertyOptional({enum :status_tob_ctbody_data,enumName:"status",type:"string"}) 
        @IsOptional()
        status? : status_tob_ctbody_data
        @ApiPropertyOptional({enum :purpose_tob_ctbody_data,isArray: true}) 
        @IsOptional()
        purpose? : purpose_tob_ctbody_data
        @ApiPropertyOptional({enum :revokedby_tob_ctbody_data,enumName:"revokedby",type:"string"}) 
        @IsOptional()
        revokedby? : revokedby_tob_ctbody_data
        @ApiPropertyOptional({type :() => tob_ctbody_openfinancebillingEntity}) 
        @IsOptional()
        openfinancebilling? : tob_ctbody_openfinancebillingEntity
        @ApiPropertyOptional()
        @IsOptional()
        creationdatetime?: string;
        @ApiPropertyOptional()
        @IsOptional()
        consentid?: string;
        @ApiPropertyOptional({enum :permissions_tob_ctbody_data,isArray: true}) 
        @IsOptional()
        permissions? : permissions_tob_ctbody_data
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_multiauth_totalreqEntity {
        @ApiPropertyOptional()
        @IsOptional()
        authorizerid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        authorizertype?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        authorizationdate?: Date;
        @ApiPropertyOptional({enum :authorizationstatus_tob_multiauth_totalreq,enumName:"authorizationstatus",type:"string"}) 
        @IsOptional()
        authorizationstatus? : authorizationstatus_tob_multiauth_totalreq
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_multiauthEntity {
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        totalrequired?: number;
        @ApiPropertyOptional({type :() => [tob_multiauth_totalreqEntity]})  
        @IsOptional()
        authorizations? : tob_multiauth_totalreqEntity[]
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_conbody_multipleauthEntity {
        @ApiPropertyOptional({type :() => tob_multiauthEntity}) 
        @IsOptional()
        multipleauthorizers? : tob_multiauthEntity
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_sub_webhookEntity {
        @ApiPropertyOptional()
        @IsOptional()
        url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        isactive?: boolean;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_subscription_consentbodyEntity {
        @ApiPropertyOptional({type :() => tob_sub_webhookEntity}) 
        @IsOptional()
        webhook? : tob_sub_webhookEntity
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_consentbodyEntity {
        @ApiPropertyOptional({type :() => tob_ctbody_dataEntity}) 
        @IsOptional()
        data? : tob_ctbody_dataEntity
        @ApiPropertyOptional({type :() => tob_conbody_multipleauthEntity}) 
        @IsOptional()
        meta? : tob_conbody_multipleauthEntity
        @ApiPropertyOptional({type :() => tob_subscription_consentbodyEntity}) 
        @IsOptional()
        subscription? : tob_subscription_consentbodyEntity
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_subscription_webhookEntity {
        @ApiPropertyOptional()
        @IsOptional()
        url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        isactive?: boolean;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_subscription_consentreqEntity {
        @ApiPropertyOptional({type :() => tob_subscription_webhookEntity}) 
        @IsOptional()
        webhook? : tob_subscription_webhookEntity
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_openfinance_billingEntity {
        @ApiPropertyOptional({enum :usertype_tob_openfinance_billing,enumName:"usertype",type:"string"}) 
        @IsOptional()
        usertype? : usertype_tob_openfinance_billing
        @ApiPropertyOptional({enum :purpose_tob_openfinance_billing,enumName:"purpose",type:"string"}) 
        @IsOptional()
        purpose? : purpose_tob_openfinance_billing
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_request_onbehalfofEntity {
        @ApiPropertyOptional()
        @IsOptional()
        tradingname?: string;
        @ApiPropertyOptional()
        @IsOptional()
        legalname?: string;
        @ApiPropertyOptional({enum :identifiertype_tob_request_onbehalfof,enumName:"identifiertype",type:"string"}) 
        @IsOptional()
        identifiertype? : identifiertype_tob_request_onbehalfof
        @ApiPropertyOptional()
        @IsOptional()
        identifier?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_request_consentEntity {
        @ApiPropertyOptional()
        @IsOptional()
        baseconsentid?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        expirationdatetime?: Date;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        transactionfromdatetime?: Date;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        transactiontodatetime?: Date;
        @ApiPropertyOptional({enum :accounttype_tob_request_consent,isArray: true}) 
        @IsOptional()
        accounttype? : accounttype_tob_request_consent
        @ApiPropertyOptional({enum :accountsubtype_tob_request_consent,isArray: true}) 
        @IsOptional()
        accountsubtype? : accountsubtype_tob_request_consent
        @ApiPropertyOptional({type :() => tob_request_onbehalfofEntity}) 
        @IsOptional()
        onbehalfof? : tob_request_onbehalfofEntity
        @ApiPropertyOptional()
        @IsOptional()
        consentid?: string;
        @ApiPropertyOptional({enum :permissions_tob_request_consent,isArray: true}) 
        @IsOptional()
        permissions? : permissions_tob_request_consent
        @ApiPropertyOptional({type :() => tob_openfinance_billingEntity}) 
        @IsOptional()
        openfinancebilling? : tob_openfinance_billingEntity
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_consent_reqEntity {
        @ApiPropertyOptional()
        @IsOptional()
        type?: string;
        @ApiPropertyOptional({type :() => tob_request_consentEntity}) 
        @IsOptional()
        consent? : tob_request_consentEntity
        @ApiPropertyOptional({type :() => tob_subscription_consentreqEntity}) 
        @IsOptional()
        subscription? : tob_subscription_consentreqEntity
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
      }
          
  export class tob_consent_requestEntity {
        @ApiProperty()
        id: string;
        @ApiPropertyOptional()
        @IsOptional()
        ids?: string;
        @ApiPropertyOptional()
        @IsOptional()
        consentgroupid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        requesturl?: string;
        @ApiPropertyOptional()
        @IsOptional()
        consenttype?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
        @ApiPropertyOptional({type :() => tob_consent_reqEntity}) 
        @IsOptional()
        request? : tob_consent_reqEntity
        @ApiPropertyOptional({type :() => tob_consentbodyEntity}) 
        @IsOptional()
        consentbody? : tob_consentbodyEntity
        @ApiPropertyOptional({enum :authorizationchannel_tob_consent_request,enumName:"authorizationchannel",type:"string"}) 
        @IsOptional()
        authorizationchannel? : authorizationchannel_tob_consent_request
        @ApiPropertyOptional()
        @IsOptional()
        interactionid?: string;
        @ApiPropertyOptional({type :() => tob_tppEntity}) 
        @IsOptional()
        tpp? : tob_tppEntity
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        updatedat?: number;
        @ApiPropertyOptional()
        @IsOptional()
        parid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        rartype?: string;
        @ApiPropertyOptional()
        @IsOptional()
        standardversion?: string;
        @ApiPropertyOptional({type :() => tob_psuidentifiersEntity}) 
        @IsOptional()
        psuidentifiers? : tob_psuidentifiersEntity
        @ApiProperty({type : [String]})  
        accountids: String[]                  
        @ApiPropertyOptional()
        @IsOptional()
        connecttoken?: string;
        @ApiPropertyOptional()
        @IsOptional()
        account_id?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_modified_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_modified_by?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_process_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_access_profile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_code?: string;    
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_by?:  string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_time?:  Date;
        @ApiProperty({example:"string"})
        trs_tenant_id: string;
        @ApiProperty({example:"string"})
        trs_app_code: string;
        @ApiProperty({example:"string"})
        trs_product_code: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_status?: string;
      }
          

  export class  tob_consent_request_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ids?: string;
        @ApiPropertyOptional()
        @IsOptional()
        consentgroupid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        requesturl?: string;
        @ApiPropertyOptional()
        @IsOptional()
        consenttype?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
        @ApiPropertyOptional({type :() => tob_consent_reqEntity}) 
        @IsOptional()
        request? : tob_consent_reqEntity
        @ApiPropertyOptional({type :() => tob_consentbodyEntity}) 
        @IsOptional()
        consentbody? : tob_consentbodyEntity
        @ApiPropertyOptional({enum :authorizationchannel_tob_consent_request,enumName:"authorizationchannel",type:"string"})
        @IsOptional()
        authorizationchannel? : authorizationchannel_tob_consent_request
        @ApiPropertyOptional()
        @IsOptional()
        interactionid?: string;
        @ApiPropertyOptional({type :() => tob_tppEntity}) 
        @IsOptional()
        tpp? : tob_tppEntity
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        updatedat?: number;
        @ApiPropertyOptional()
        @IsOptional()
        parid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        rartype?: string;
        @ApiPropertyOptional()
        @IsOptional()
        standardversion?: string;
        @ApiPropertyOptional({type :() => tob_psuidentifiersEntity}) 
        @IsOptional()
        psuidentifiers? : tob_psuidentifiersEntity
        @ApiProperty({type : [String]})  
        accountids : String[]                  
        @ApiPropertyOptional()
        @IsOptional()
        connecttoken?: string;
        @ApiPropertyOptional()
        @IsOptional()
        account_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_modified_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_modified_by?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_process_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_access_profile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_code?: string;    
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_by?:  string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_time?:  Date;
        @ApiProperty({example:"string"})
        trs_tenant_id: string;
        @ApiProperty({example:"string"})
        trs_app_code: string;
        @ApiProperty({example:"string"})
        trs_product_code: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_status?: string;
      }

    