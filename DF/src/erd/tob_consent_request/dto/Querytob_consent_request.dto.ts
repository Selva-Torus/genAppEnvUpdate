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

export class Querytob_psuidentifiersDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    userid? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_decodedssaDto{
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
export class Querytob_decodedssaWapperDto {
    @ApiProperty({ type:Querytob_decodedssaDto })
    @ValidateNested()
    @Type(() => Querytob_decodedssaDto)
    is: Querytob_decodedssaDto;
}
export class Querytob_tppDto{
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
    @ApiProperty({ type:Querytob_decodedssaWapperDto })
    @ValidateNested()
    @Type(() => Querytob_decodedssaWapperDto)
     decodedssa?: Querytob_decodedssaWapperDto;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    orgid? : string;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_ctbody_openfinancebillingDto{
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
export class Querytob_ctbody_onbehalfofDto{
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
export class Querytob_ctbody_onbehalfofWapperDto {
    @ApiProperty({ type:Querytob_ctbody_onbehalfofDto })
    @ValidateNested()
    @Type(() => Querytob_ctbody_onbehalfofDto)
    is: Querytob_ctbody_onbehalfofDto;
}
export class Querytob_ctbody_openfinancebillingWapperDto {
    @ApiProperty({ type:Querytob_ctbody_openfinancebillingDto })
    @ValidateNested()
    @Type(() => Querytob_ctbody_openfinancebillingDto)
    is: Querytob_ctbody_openfinancebillingDto;
}
export class Querytob_ctbody_dataDto{
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
    @ApiPropertyOptional({enum :accounttype_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    accounttype? : accounttype_tob_ctbody_data[];

    @ApiPropertyOptional({enum :accountsubtype_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    accountsubtype? : accountsubtype_tob_ctbody_data[];

    @ApiProperty({ type:Querytob_ctbody_onbehalfofWapperDto })
    @ValidateNested()
    @Type(() => Querytob_ctbody_onbehalfofWapperDto)
     onbehalfof?: Querytob_ctbody_onbehalfofWapperDto;
    @ApiPropertyOptional({enum :status_tob_ctbody_data,enumName:"status",type:"string"}) 
    @IsOptional()
    status? : status_tob_ctbody_data;

    @ApiPropertyOptional({enum :purpose_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    purpose? : purpose_tob_ctbody_data[];

    @ApiPropertyOptional({enum :revokedby_tob_ctbody_data,enumName:"revokedby",type:"string"}) 
    @IsOptional()
    revokedby? : revokedby_tob_ctbody_data;

    @ApiProperty({ type:Querytob_ctbody_openfinancebillingWapperDto })
    @ValidateNested()
    @Type(() => Querytob_ctbody_openfinancebillingWapperDto)
     openfinancebilling?: Querytob_ctbody_openfinancebillingWapperDto;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    creationdatetime? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    consentid? : string;
    @ApiPropertyOptional({enum :permissions_tob_ctbody_data,isArray: true}) 
    @IsOptional()
    permissions? : permissions_tob_ctbody_data[];

    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_multiauth_totalreqDto{
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
export class Querytob_multiauth_totalreqWapperDto {

    @ApiProperty({ type:Querytob_multiauth_totalreqDto })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Querytob_multiauth_totalreqWapperDto)
    some: Querytob_multiauth_totalreqDto;
}
export class Querytob_multiauthDto{
    @ApiPropertyOptional()
    @IsOptional()
    totalrequired?: number;

    @ApiProperty({ type:Querytob_multiauth_totalreqWapperDto })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Querytob_multiauth_totalreqWapperDto)
     authorizations?: Querytob_multiauth_totalreqWapperDto[];
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_multiauthWapperDto {
    @ApiProperty({ type:Querytob_multiauthDto })
    @ValidateNested()
    @Type(() => Querytob_multiauthDto)
    is: Querytob_multiauthDto;
}
export class Querytob_conbody_multipleauthDto{
    @ApiProperty({ type:Querytob_multiauthWapperDto })
    @ValidateNested()
    @Type(() => Querytob_multiauthWapperDto)
     multipleauthorizers?: Querytob_multiauthWapperDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_sub_webhookDto{
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
export class Querytob_sub_webhookWapperDto {
    @ApiProperty({ type:Querytob_sub_webhookDto })
    @ValidateNested()
    @Type(() => Querytob_sub_webhookDto)
    is: Querytob_sub_webhookDto;
}
export class Querytob_subscription_consentbodyDto{
    @ApiProperty({ type:Querytob_sub_webhookWapperDto })
    @ValidateNested()
    @Type(() => Querytob_sub_webhookWapperDto)
     webhook?: Querytob_sub_webhookWapperDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_ctbody_dataWapperDto {
    @ApiProperty({ type:Querytob_ctbody_dataDto })
    @ValidateNested()
    @Type(() => Querytob_ctbody_dataDto)
    is: Querytob_ctbody_dataDto;
}
export class Querytob_conbody_multipleauthWapperDto {
    @ApiProperty({ type:Querytob_conbody_multipleauthDto })
    @ValidateNested()
    @Type(() => Querytob_conbody_multipleauthDto)
    is: Querytob_conbody_multipleauthDto;
}
export class Querytob_subscription_consentbodyWapperDto {
    @ApiProperty({ type:Querytob_subscription_consentbodyDto })
    @ValidateNested()
    @Type(() => Querytob_subscription_consentbodyDto)
    is: Querytob_subscription_consentbodyDto;
}
export class Querytob_consentbodyDto{
    @ApiProperty({ type:Querytob_ctbody_dataWapperDto })
    @ValidateNested()
    @Type(() => Querytob_ctbody_dataWapperDto)
     data?: Querytob_ctbody_dataWapperDto;
    @ApiProperty({ type:Querytob_conbody_multipleauthWapperDto })
    @ValidateNested()
    @Type(() => Querytob_conbody_multipleauthWapperDto)
     meta?: Querytob_conbody_multipleauthWapperDto;
    @ApiProperty({ type:Querytob_subscription_consentbodyWapperDto })
    @ValidateNested()
    @Type(() => Querytob_subscription_consentbodyWapperDto)
     subscription?: Querytob_subscription_consentbodyWapperDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_subscription_webhookDto{
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
export class Querytob_subscription_webhookWapperDto {
    @ApiProperty({ type:Querytob_subscription_webhookDto })
    @ValidateNested()
    @Type(() => Querytob_subscription_webhookDto)
    is: Querytob_subscription_webhookDto;
}
export class Querytob_subscription_consentreqDto{
    @ApiProperty({ type:Querytob_subscription_webhookWapperDto })
    @ValidateNested()
    @Type(() => Querytob_subscription_webhookWapperDto)
     webhook?: Querytob_subscription_webhookWapperDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_openfinance_billingDto{
    @ApiPropertyOptional({enum :usertype_tob_openfinance_billing,enumName:"usertype",type:"string"}) 
    @IsOptional()
    usertype? : usertype_tob_openfinance_billing;

    @ApiPropertyOptional({enum :purpose_tob_openfinance_billing,enumName:"purpose",type:"string"}) 
    @IsOptional()
    purpose? : purpose_tob_openfinance_billing;

    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_request_onbehalfofDto{
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
export class Querytob_request_onbehalfofWapperDto {
    @ApiProperty({ type:Querytob_request_onbehalfofDto })
    @ValidateNested()
    @Type(() => Querytob_request_onbehalfofDto)
    is: Querytob_request_onbehalfofDto;
}
export class Querytob_openfinance_billingWapperDto {
    @ApiProperty({ type:Querytob_openfinance_billingDto })
    @ValidateNested()
    @Type(() => Querytob_openfinance_billingDto)
    is: Querytob_openfinance_billingDto;
}
export class Querytob_request_consentDto{
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
    @ApiPropertyOptional({enum :accounttype_tob_request_consent,isArray: true}) 
    @IsOptional()
    accounttype? : accounttype_tob_request_consent[];

    @ApiPropertyOptional({enum :accountsubtype_tob_request_consent,isArray: true}) 
    @IsOptional()
    accountsubtype? : accountsubtype_tob_request_consent[];

    @ApiProperty({ type:Querytob_request_onbehalfofWapperDto })
    @ValidateNested()
    @Type(() => Querytob_request_onbehalfofWapperDto)
     onbehalfof?: Querytob_request_onbehalfofWapperDto;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    consentid? : string;
    @ApiPropertyOptional({enum :permissions_tob_request_consent,isArray: true}) 
    @IsOptional()
    permissions? : permissions_tob_request_consent[];

    @ApiProperty({ type:Querytob_openfinance_billingWapperDto })
    @ValidateNested()
    @Type(() => Querytob_openfinance_billingWapperDto)
     openfinancebilling?: Querytob_openfinance_billingWapperDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_request_consentWapperDto {
    @ApiProperty({ type:Querytob_request_consentDto })
    @ValidateNested()
    @Type(() => Querytob_request_consentDto)
    is: Querytob_request_consentDto;
}
export class Querytob_subscription_consentreqWapperDto {
    @ApiProperty({ type:Querytob_subscription_consentreqDto })
    @ValidateNested()
    @Type(() => Querytob_subscription_consentreqDto)
    is: Querytob_subscription_consentreqDto;
}
export class Querytob_consent_reqDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    type? : string;
    @ApiProperty({ type:Querytob_request_consentWapperDto })
    @ValidateNested()
    @Type(() => Querytob_request_consentWapperDto)
     consent?: Querytob_request_consentWapperDto;
    @ApiProperty({ type:Querytob_subscription_consentreqWapperDto })
    @ValidateNested()
    @Type(() => Querytob_subscription_consentreqWapperDto)
     subscription?: Querytob_subscription_consentreqWapperDto;
    @ApiProperty({ type: [tob_api_process_logsEntity], required: false})
    tob_api_process_logs?: tob_api_process_logsEntity[];
}
export class Querytob_consent_reqWapperDto {
    @ApiProperty({ type:Querytob_consent_reqDto })
    @ValidateNested()
    @Type(() => Querytob_consent_reqDto)
    is: Querytob_consent_reqDto;
}
export class Querytob_consentbodyWapperDto {
    @ApiProperty({ type:Querytob_consentbodyDto })
    @ValidateNested()
    @Type(() => Querytob_consentbodyDto)
    is: Querytob_consentbodyDto;
}
export class Querytob_tppWapperDto {
    @ApiProperty({ type:Querytob_tppDto })
    @ValidateNested()
    @Type(() => Querytob_tppDto)
    is: Querytob_tppDto;
}
export class Querytob_psuidentifiersWapperDto {
    @ApiProperty({ type:Querytob_psuidentifiersDto })
    @ValidateNested()
    @Type(() => Querytob_psuidentifiersDto)
    is: Querytob_psuidentifiersDto;
}
export class Querytob_consent_requestDto{
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
    @ApiProperty({ type:Querytob_consent_reqWapperDto })
    @ValidateNested()
    @Type(() => Querytob_consent_reqWapperDto)
     request?: Querytob_consent_reqWapperDto;
    @ApiProperty({ type:Querytob_consentbodyWapperDto })
    @ValidateNested()
    @Type(() => Querytob_consentbodyWapperDto)
     consentbody?: Querytob_consentbodyWapperDto;
    @ApiPropertyOptional({enum :authorizationchannel_tob_consent_request,enumName:"authorizationchannel",type:"string"}) 
    @IsOptional()
    authorizationchannel? : authorizationchannel_tob_consent_request;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    interactionid? : string;
    @ApiProperty({ type:Querytob_tppWapperDto })
    @ValidateNested()
    @Type(() => Querytob_tppWapperDto)
     tpp?: Querytob_tppWapperDto;
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
    @ApiProperty({ type:Querytob_psuidentifiersWapperDto })
    @ValidateNested()
    @Type(() => Querytob_psuidentifiersWapperDto)
     psuidentifiers?: Querytob_psuidentifiersWapperDto;
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
    @ApiProperty()
    trs_app_code:  string;
    @ApiPropertyOptional()
    @IsOptional()
    trs_locked_by?:  string;
    @ApiPropertyOptional({
    type: `string`,
    format: `date-time`,
    })
    @IsOptional()
    trs_locked_time?:  Date;
    @ApiProperty({example:"string"})
    trs_tenant_id: string;
    @ApiProperty({example:"string"})
    trs_product_code: string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_process_status?: string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_status?: string;
}
