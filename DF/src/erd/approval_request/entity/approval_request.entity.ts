
import { approval_request } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  approval_requestEntity implements approval_request{
    @ApiProperty({example:"bigint"})
    approval_request_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    request_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    subject_table:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    subject_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    stage_code:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    stage_seq:number;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    requested_by_user_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    requested_by_agent_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    assigned_role_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    assigned_user_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    summary:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    status:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    due_at:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    decided_at:Date;
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
    @ApiProperty({example:"bigint"})
    certification_id: bigint;
}
      
export class  approval_request_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    approval_request_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    request_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    subject_table:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    subject_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    stage_code:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    stage_seq:number;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    requested_by_user_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    requested_by_agent_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    assigned_role_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    assigned_user_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    summary:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    status:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    due_at:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    decided_at:Date;
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


export { approval_request };