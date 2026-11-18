
import { authority_grant } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  authority_grantEntity implements authority_grant{
    @ApiProperty({example:"bigint"})
    authority_grant_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    grant_code:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    delegator_user_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    action_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    resource_scope:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    max_amount_per_txn:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    currency:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    daily_amount_limit:number;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    max_txn_per_day:number;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    hitl_threshold_amount:number;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    conditions:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    status:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_from:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_to:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    revoked_at:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    revocation_reason:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiProperty({example:"datetime"})
    trs_created_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_created_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_modified_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_modified_by:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_access_profile:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_locked_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_locked_time:Date;
    @ApiProperty({example:"string"})
    trs_tenant_id:string;
    @ApiProperty({example:"string"})
    trs_app_code:string;
    @ApiProperty({example:"string"})
    trs_product_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_token_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_version:string;
    @ApiProperty({example:"bigint"})
    ai_asset_id: bigint;
}
      
export class  authority_grant_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    authority_grant_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    grant_code:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    delegator_user_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    action_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    resource_scope:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    max_amount_per_txn:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    currency:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    daily_amount_limit:number;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    max_txn_per_day:number;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    hitl_threshold_amount:number;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    conditions:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    status:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_from:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_to:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    revoked_at:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    revocation_reason:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiProperty({example:"datetime"})
    trs_created_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_created_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_modified_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_modified_by:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_access_profile:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_locked_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_locked_time:Date;
    @ApiProperty({example:"string"})
    trs_tenant_id:string;
    @ApiProperty({example:"string"})
    trs_app_code:string;
    @ApiProperty({example:"string"})
    trs_product_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_token_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_version:string;
}


export { authority_grant };