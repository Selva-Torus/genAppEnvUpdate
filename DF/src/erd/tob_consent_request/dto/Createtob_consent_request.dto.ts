import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { tob_api_process_logsEntity} from 'src/erd/tob_api_process_logs/entity/tob_api_process_logs.entity';



















 
export enum usertype_tob_ctbody_openfinancebilling {
    Retail="Retail",
    SME="SME",
    Corporate="Corporate",
}
export enum purpose_tob_ctbody_openfinancebilling {
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
export enum identifiertype_tob_ctbody_onbehalfof {
    Other="Other",
}
export enum accounttype_tob_ctbody_data {
    Retail="Retail",
    SME="SME",
}
export enum accountsubtype_tob_ctbody_data {
    CurrentAccount="CurrentAccount",
    Savings="Savings",
}
export enum status_tob_ctbody_data {
    Authorized="Authorized",
    Rejected="Rejected",
    Revoked="Revoked",
    Expired="Expired",
    Consumed="Consumed",
    Suspended="Suspended",
}
export enum purpose_tob_ctbody_data {
    Account_Aggregation="Account_Aggregation",
    Personal_Finance_Manager="Personal_Finance_Manager",
    Other="Other",
}
export enum revokedby_tob_ctbody_data {
    LFI="LFI",
    TPP="TPP",
    LFIInitiatedByUser="LFIInitiatedByUser",
    TPPInitiatedByUser="TPPInitiatedByUser",
}
export enum permissions_tob_ctbody_data {
    ReadAccountsBasic="ReadAccountsBasic",
    ReadAccountsDetail="ReadAccountsDetail",
    ReadBalances="ReadBalances",
    ReadParty="ReadParty",
    ReadProduct="ReadProduct",
    ReadDirectDebits="ReadDirectDebits",
}
export enum authorizationstatus_tob_multiauth_totalreq {
    Pending="Pending",
    Approved="Approved",
    Rejected="Rejected",
}
export enum usertype_tob_openfinance_billing {
    Retail="Retail",
    SME="SME",
    Corporate="Corporate",
}
export enum purpose_tob_openfinance_billing {
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
export enum identifiertype_tob_request_onbehalfof {
    Other="Other",
}
export enum accounttype_tob_request_consent {
    Retail="Retail",
    SME="SME",
    Corporate="Corporate",
}
export enum accountsubtype_tob_request_consent {
    CurrentAccount="CurrentAccount",
    Savings="Savings",
}
export enum permissions_tob_request_consent {
    ReadAccountsBasic="ReadAccountsBasic",
    ReadParty="ReadParty",
    ReadBalances="ReadBalances",
    ReadAccountsDetail="ReadAccountsDetail",
    ReadProduct="ReadProduct",
    ReadDirectDebits="ReadDirectDebits",
}
export enum authorizationchannel_tob_consent_request {
    App="App",
    Web="Web",
}

export class Createtob_psuidentifiersDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    userid? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_decodedssaDto{
    @ApiProperty() 
    redirect_uris : String[];                      
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    client_name? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    client_uri? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    logo_uri? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    jwks_uri? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    client_id? : string;
    @ApiProperty() 
    roles : String[];                      
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    sector_identifier_uri? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    application_type? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    organisation_id? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_tppDto{
    @ApiProperty()
    @IsString()
    clientid : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tppid? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tppname? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    softwarestatementid? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    directoryrecord? : string;
    @ApiProperty({ type:Createtob_decodedssaDto })
    @ValidateNested()
    @Type(() => Createtob_decodedssaDto)
    decodedssa?: Createtob_decodedssaDto;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    orgid? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_ctbody_openfinancebillingDto{
    @ApiPropertyOptional() 
    @IsOptional()
    islargecorporate? : boolean;                      
    @ApiPropertyOptional({enum :usertype_tob_ctbody_openfinancebilling,enumName:"usertype",type:"string"}) 
    @IsOptional()
    usertype? : usertype_tob_ctbody_openfinancebilling;

    @ApiPropertyOptional({enum :purpose_tob_ctbody_openfinancebilling,enumName:"purpose",type:"string"}) 
    @IsOptional()
    purpose? : purpose_tob_ctbody_openfinancebilling;

    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_ctbody_onbehalfofDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tradingname? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    legalname? : string;
    @ApiPropertyOptional({enum :identifiertype_tob_ctbody_onbehalfof,enumName:"identifiertype",type:"string"}) 
    @IsOptional()
    identifiertype? : identifiertype_tob_ctbody_onbehalfof;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    identifier? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_ctbody_dataDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    baseconsentid? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    expirationdatetime? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    transactionfromdatetime? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    transactiontodatetime? : string;
    @ApiProperty({enum :accounttype_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    accounttype? : accounttype_tob_ctbody_data[];

    @ApiProperty({enum :accountsubtype_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    accountsubtype? : accountsubtype_tob_ctbody_data[];

    @ApiProperty({ type:Createtob_ctbody_onbehalfofDto })
    @ValidateNested()
    @Type(() => Createtob_ctbody_onbehalfofDto)
    onbehalfof?: Createtob_ctbody_onbehalfofDto;
    @ApiPropertyOptional({enum :status_tob_ctbody_data,enumName:"status",type:"string"}) 
    @IsOptional()
    status? : status_tob_ctbody_data;

    @ApiProperty({enum :purpose_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    purpose? : purpose_tob_ctbody_data[];

    @ApiPropertyOptional({enum :revokedby_tob_ctbody_data,enumName:"revokedby",type:"string"}) 
    @IsOptional()
    revokedby? : revokedby_tob_ctbody_data;

    @ApiProperty({ type:Createtob_ctbody_openfinancebillingDto })
    @ValidateNested()
    @Type(() => Createtob_ctbody_openfinancebillingDto)
    openfinancebilling?: Createtob_ctbody_openfinancebillingDto;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    creationdatetime? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    consentid? : string;
    @ApiProperty({enum :permissions_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    permissions? : permissions_tob_ctbody_data[];

    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_multiauth_totalreqDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    authorizerid? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    authorizertype? : string;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    authorizationdate? : Date;
    @ApiPropertyOptional({enum :authorizationstatus_tob_multiauth_totalreq,enumName:"authorizationstatus",type:"string"}) 
    @IsOptional()
    authorizationstatus? : authorizationstatus_tob_multiauth_totalreq;

    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_multiauthDto{
    @ApiPropertyOptional()
    @IsOptional()
    totalrequired?: number;

    @ApiProperty({ type:[Createtob_multiauth_totalreqDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Createtob_multiauth_totalreqDto)
    authorizations?: Createtob_multiauth_totalreqDto[];
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_conbody_multipleauthDto{
    @ApiProperty({ type:Createtob_multiauthDto })
    @ValidateNested()
    @Type(() => Createtob_multiauthDto)
    multipleauthorizers?: Createtob_multiauthDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_sub_webhookDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    url? : string;
    @ApiPropertyOptional() 
    @IsOptional()
    isactive? : boolean;                      
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_subscription_consentbodyDto{
    @ApiProperty({ type:Createtob_sub_webhookDto })
    @ValidateNested()
    @Type(() => Createtob_sub_webhookDto)
    webhook?: Createtob_sub_webhookDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_consentbodyDto{
    @ApiProperty({ type:Createtob_ctbody_dataDto })
    @ValidateNested()
    @Type(() => Createtob_ctbody_dataDto)
    data?: Createtob_ctbody_dataDto;
    @ApiProperty({ type:Createtob_conbody_multipleauthDto })
    @ValidateNested()
    @Type(() => Createtob_conbody_multipleauthDto)
    meta?: Createtob_conbody_multipleauthDto;
    @ApiProperty({ type:Createtob_subscription_consentbodyDto })
    @ValidateNested()
    @Type(() => Createtob_subscription_consentbodyDto)
    subscription?: Createtob_subscription_consentbodyDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_subscription_webhookDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    url? : string;
    @ApiPropertyOptional() 
    @IsOptional()
    isactive? : boolean;                      
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_subscription_consentreqDto{
    @ApiProperty({ type:Createtob_subscription_webhookDto })
    @ValidateNested()
    @Type(() => Createtob_subscription_webhookDto)
    webhook?: Createtob_subscription_webhookDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_openfinance_billingDto{
    @ApiPropertyOptional({enum :usertype_tob_openfinance_billing,enumName:"usertype",type:"string"}) 
    @IsOptional()
    usertype? : usertype_tob_openfinance_billing;

    @ApiPropertyOptional({enum :purpose_tob_openfinance_billing,enumName:"purpose",type:"string"}) 
    @IsOptional()
    purpose? : purpose_tob_openfinance_billing;

    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_request_onbehalfofDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tradingname? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    legalname? : string;
    @ApiPropertyOptional({enum :identifiertype_tob_request_onbehalfof,enumName:"identifiertype",type:"string"}) 
    @IsOptional()
    identifiertype? : identifiertype_tob_request_onbehalfof;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    identifier? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_request_consentDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    baseconsentid? : string;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    expirationdatetime? : Date;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    transactionfromdatetime? : Date;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    transactiontodatetime? : Date;
    @ApiProperty({enum :accounttype_tob_request_consent,isArray: true}) 
    @IsOptional()
    accounttype? : accounttype_tob_request_consent[];

    @ApiProperty({enum :accountsubtype_tob_request_consent,isArray: true}) 
    @IsOptional()
    accountsubtype? : accountsubtype_tob_request_consent[];

    @ApiProperty({ type:Createtob_request_onbehalfofDto })
    @ValidateNested()
    @Type(() => Createtob_request_onbehalfofDto)
    onbehalfof?: Createtob_request_onbehalfofDto;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    consentid? : string;
    @ApiProperty({enum :permissions_tob_request_consent,isArray: true}) 
    @IsOptional()
    permissions? : permissions_tob_request_consent[];

    @ApiProperty({ type:Createtob_openfinance_billingDto })
    @ValidateNested()
    @Type(() => Createtob_openfinance_billingDto)
    openfinancebilling?: Createtob_openfinance_billingDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_consent_reqDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    type? : string;
    @ApiProperty({ type:Createtob_request_consentDto })
    @ValidateNested()
    @Type(() => Createtob_request_consentDto)
    consent?: Createtob_request_consentDto;
    @ApiProperty({ type:Createtob_subscription_consentreqDto })
    @ValidateNested()
    @Type(() => Createtob_subscription_consentreqDto)
    subscription?: Createtob_subscription_consentreqDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Createtob_consent_requestDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    ids? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    consentgroupid? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    requesturl? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    consenttype? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    status? : string;
    @ApiProperty({ type:Createtob_consent_reqDto })
    @ValidateNested()
    @Type(() => Createtob_consent_reqDto)
    request?: Createtob_consent_reqDto;
    @ApiProperty({ type:Createtob_consentbodyDto })
    @ValidateNested()
    @Type(() => Createtob_consentbodyDto)
    consentbody?: Createtob_consentbodyDto;
    @ApiPropertyOptional({enum :authorizationchannel_tob_consent_request,enumName:"authorizationchannel",type:"string"}) 
    @IsOptional()
    authorizationchannel? : authorizationchannel_tob_consent_request;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    interactionid? : string;
    @ApiProperty({ type:Createtob_tppDto })
    @ValidateNested()
    @Type(() => Createtob_tppDto)
    tpp?: Createtob_tppDto;
    @ApiPropertyOptional()
    @IsOptional()
    updatedat?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    parid? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    rartype? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    standardversion? : string;
    @ApiProperty({ type:Createtob_psuidentifiersDto })
    @ValidateNested()
    @Type(() => Createtob_psuidentifiersDto)
    psuidentifiers?: Createtob_psuidentifiersDto;
    @ApiProperty() 
    accountids : String[];                      
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    connecttoken? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    account_id? : string;
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
    trs_locked_by?:  string;
    @ApiPropertyOptional({
    type: `string`,
    format: `date-time`,
    })
    @IsOptional()
    trs_locked_time?:  Date;
    @ApiProperty()
    trs_tenant_id: string;      
    @ApiProperty()
    trs_app_code: string;      
    @ApiProperty()
    trs_product_code: string;      
    @ApiPropertyOptional()
    @IsOptional()
    trs_event_process_status?: string;      
    @ApiPropertyOptional()
    @IsOptional()
    trs_event_status?: string;
}







