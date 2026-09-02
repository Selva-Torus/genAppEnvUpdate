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



 
export enum api_roles_tob_tpp_registry {
    AIS="AIS",
    PIS="PIS",
}

export class Createtob_tpp_registryDto{
    @ApiProperty()
    @IsString()
    tpp_id : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tpp_name? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    legal_name? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    client_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    org_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    software_statement_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    pricing_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tier_name? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    status? : string;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    onboarding_date? : Date;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    directory_record_url? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    jwks_url? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    redirect_uris? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    logo_uri? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    contact_email? : string;
    @ApiPropertyOptional() 
    @IsOptional()
    is_large_corporate? : boolean;                      
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    country? : string;
    @ApiPropertyOptional()
    @IsOptional()
    billing_currency?: number;
    @ApiPropertyOptional({enum :api_roles_tob_tpp_registry,enumName:"api_roles",type:"string"}) 
    @IsOptional()
    api_roles? : api_roles_tob_tpp_registry;

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







