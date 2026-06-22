
import { ams_assets } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  ams_assetsEntity implements Omit<ams_assets,"purchase_cost"|"purchase_value"|"current_value"|"depreciation_rate"|"salvage_value">{
    @ApiProperty({example:"bigint"})
    asset_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    ci_id:bigint;
    @ApiProperty({example:"string"})
    asset_tag:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    asset_code:string;
    @ApiProperty({example:"string"})
    asset_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    description:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    serial_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    model_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    manufacturer:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    purchase_date:Date;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    purchase_cost: number | null;
    @ApiProperty({example:"string"})
    currency:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    vendor_id:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    warranty_expiry:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    warranty_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    insurance_status:string;
    @ApiProperty({example:"string"})
    asset_type:string;
    @ApiProperty({example:"string"})
    classification:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    data_classification:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    ownership_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    lifecycle_stage:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    asset_condition:string;
    @ApiProperty({example:"boolean"})
    is_critical:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    compliance_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    risk_level:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    purchase_value: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    current_value: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    depreciation_rate: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    salvage_value: number | null;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    disposal_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    disposal_method:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    disposal_ref:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    asset_metadata:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    additional_details:any;
    @ApiPropertyOptional({example:"string[]"})
    @IsOptional()
    doc_url:string[];
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
    acat_id: bigint;
}
      
export class  ams_assets_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    asset_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    ci_id:bigint;
    @ApiProperty({example:"string"})
    asset_tag:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    asset_code:string;
    @ApiProperty({example:"string"})
    asset_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    description:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    serial_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    model_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    manufacturer:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    purchase_date:Date;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    purchase_cost: number | null;
    @ApiProperty({example:"string"})
    currency:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    vendor_id:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    warranty_expiry:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    warranty_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    insurance_status:string;
    @ApiProperty({example:"string"})
    asset_type:string;
    @ApiProperty({example:"string"})
    classification:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    data_classification:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    ownership_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    lifecycle_stage:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    asset_condition:string;
    @ApiProperty({example:"boolean"})
    is_critical:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    compliance_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    risk_level:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    purchase_value: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    current_value: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    depreciation_rate: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    salvage_value: number | null;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    disposal_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    disposal_method:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    disposal_ref:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    asset_metadata:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    additional_details:any;
    @ApiPropertyOptional({example:"string[]"})
    @IsOptional()
    doc_url:string[];
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


export { ams_assets };