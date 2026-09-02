import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString,IsOptional } from 'class-validator';
import { tob_api_process_logsEntity} from 'src/erd/tob_api_process_logs/entity/tob_api_process_logs.entity';



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


export class  Updatetob_psuidentifiersDto {
        @ApiPropertyOptional()
        @IsOptional()
        userid?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_decodedssaDto {
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

export class  Updatetob_tppDto {
        @ApiPropertyOptional()
        @IsOptional()
        clientid?: string;
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
        @ApiPropertyOptional({type : Updatetob_decodedssaDto}) 
        @IsOptional()
        @Type(() => Updatetob_decodedssaDto) 
        decodedssa? : Updatetob_decodedssaDto
        @ApiPropertyOptional()
        @IsOptional()
        orgid?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_ctbody_openfinancebillingDto {
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

export class  Updatetob_ctbody_onbehalfofDto {
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

export class  Updatetob_ctbody_dataDto {
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
        @ApiPropertyOptional({type : Updatetob_ctbody_onbehalfofDto}) 
        @IsOptional()
        @Type(() => Updatetob_ctbody_onbehalfofDto) 
        onbehalfof? : Updatetob_ctbody_onbehalfofDto
        @ApiPropertyOptional({enum :status_tob_ctbody_data,enumName:"status",type:"string"})  
        @IsOptional()
        status? : status_tob_ctbody_data
        @ApiPropertyOptional({enum :purpose_tob_ctbody_data,isArray: true}) 
        @IsOptional()
        purpose? : purpose_tob_ctbody_data
        @ApiPropertyOptional({enum :revokedby_tob_ctbody_data,enumName:"revokedby",type:"string"})  
        @IsOptional()
        revokedby? : revokedby_tob_ctbody_data
        @ApiPropertyOptional({type : Updatetob_ctbody_openfinancebillingDto}) 
        @IsOptional()
        @Type(() => Updatetob_ctbody_openfinancebillingDto) 
        openfinancebilling? : Updatetob_ctbody_openfinancebillingDto
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

export class  Updatetob_multiauth_totalreqDto {
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

export class  Updatetob_multiauthDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        totalrequired?: number;
        @ApiPropertyOptional({type : [Updatetob_multiauth_totalreqDto]})
        @IsOptional()
        @Type(() => Updatetob_multiauth_totalreqDto)
        authorizations? : Updatetob_multiauth_totalreqDto[]
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_conbody_multipleauthDto {
        @ApiPropertyOptional({type : Updatetob_multiauthDto}) 
        @IsOptional()
        @Type(() => Updatetob_multiauthDto) 
        multipleauthorizers? : Updatetob_multiauthDto
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_sub_webhookDto {
        @ApiPropertyOptional()
        @IsOptional()
        url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        isactive?: boolean;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_subscription_consentbodyDto {
        @ApiPropertyOptional({type : Updatetob_sub_webhookDto}) 
        @IsOptional()
        @Type(() => Updatetob_sub_webhookDto) 
        webhook? : Updatetob_sub_webhookDto
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_consentbodyDto {
        @ApiPropertyOptional({type : Updatetob_ctbody_dataDto}) 
        @IsOptional()
        @Type(() => Updatetob_ctbody_dataDto) 
        data? : Updatetob_ctbody_dataDto
        @ApiPropertyOptional({type : Updatetob_conbody_multipleauthDto}) 
        @IsOptional()
        @Type(() => Updatetob_conbody_multipleauthDto) 
        meta? : Updatetob_conbody_multipleauthDto
        @ApiPropertyOptional({type : Updatetob_subscription_consentbodyDto}) 
        @IsOptional()
        @Type(() => Updatetob_subscription_consentbodyDto) 
        subscription? : Updatetob_subscription_consentbodyDto
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_subscription_webhookDto {
        @ApiPropertyOptional()
        @IsOptional()
        url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        isactive?: boolean;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_subscription_consentreqDto {
        @ApiPropertyOptional({type : Updatetob_subscription_webhookDto}) 
        @IsOptional()
        @Type(() => Updatetob_subscription_webhookDto) 
        webhook? : Updatetob_subscription_webhookDto
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_openfinance_billingDto {
        @ApiPropertyOptional({enum :usertype_tob_openfinance_billing,enumName:"usertype",type:"string"})  
        @IsOptional()
        usertype? : usertype_tob_openfinance_billing
        @ApiPropertyOptional({enum :purpose_tob_openfinance_billing,enumName:"purpose",type:"string"})  
        @IsOptional()
        purpose? : purpose_tob_openfinance_billing
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_request_onbehalfofDto {
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

export class  Updatetob_request_consentDto {
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
        @ApiPropertyOptional({type : Updatetob_request_onbehalfofDto}) 
        @IsOptional()
        @Type(() => Updatetob_request_onbehalfofDto) 
        onbehalfof? : Updatetob_request_onbehalfofDto
        @ApiPropertyOptional()
        @IsOptional()
        consentid?: string;
        @ApiPropertyOptional({enum :permissions_tob_request_consent,isArray: true}) 
        @IsOptional()
        permissions? : permissions_tob_request_consent
        @ApiPropertyOptional({type : Updatetob_openfinance_billingDto}) 
        @IsOptional()
        @Type(() => Updatetob_openfinance_billingDto) 
        openfinancebilling? : Updatetob_openfinance_billingDto
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_consent_reqDto {
        @ApiPropertyOptional()
        @IsOptional()
        type?: string;
        @ApiPropertyOptional({type : Updatetob_request_consentDto}) 
        @IsOptional()
        @Type(() => Updatetob_request_consentDto) 
        consent? : Updatetob_request_consentDto
        @ApiPropertyOptional({type : Updatetob_subscription_consentreqDto}) 
        @IsOptional()
        @Type(() => Updatetob_subscription_consentreqDto) 
        subscription? : Updatetob_subscription_consentreqDto
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];

}

export class  Updatetob_consent_requestDto {
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
        @ApiPropertyOptional({type : Updatetob_consent_reqDto}) 
        @IsOptional()
        @Type(() => Updatetob_consent_reqDto) 
        request? : Updatetob_consent_reqDto
        @ApiPropertyOptional({type : Updatetob_consentbodyDto}) 
        @IsOptional()
        @Type(() => Updatetob_consentbodyDto) 
        consentbody? : Updatetob_consentbodyDto
        @ApiPropertyOptional({enum :authorizationchannel_tob_consent_request,enumName:"authorizationchannel",type:"string"})  
        @IsOptional()
        authorizationchannel? : authorizationchannel_tob_consent_request
        @ApiPropertyOptional()
        @IsOptional()
        interactionid?: string;
        @ApiPropertyOptional({type : Updatetob_tppDto}) 
        @IsOptional()
        @Type(() => Updatetob_tppDto) 
        tpp? : Updatetob_tppDto
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
        @ApiPropertyOptional({type : Updatetob_psuidentifiersDto}) 
        @IsOptional()
        @Type(() => Updatetob_psuidentifiersDto) 
        psuidentifiers? : Updatetob_psuidentifiersDto
        @ApiPropertyOptional()
        @IsOptional()
        connecttoken?: string;
        @ApiPropertyOptional()
        @IsOptional()
        account_id?: string;
        @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
        tob_api_process_logs?: tob_api_process_logsEntity[];
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
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
        trs_locked_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_locked_time?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_tenant_id?: string;      
        @ApiPropertyOptional()
        @IsOptional()
        trs_app_code?: string;      
        @ApiPropertyOptional()
        @IsOptional()
        trs_product_code?: string;      
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_process_status?: string;      
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_status?: string;

}




