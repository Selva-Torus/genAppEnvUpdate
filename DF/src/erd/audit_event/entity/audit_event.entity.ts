
import { audit_event } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  audit_eventEntity implements audit_event{
    @ApiProperty({example:"bigint"})
    audit_event_id:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiProperty({example:"datetime"})
    event_timestamp:Date;
    @ApiProperty({example:"string"})
    event_type_code:string;
    @ApiProperty({example:"string"})
    entity_name:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    entity_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    actor_user_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    actor_login:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    actor_role_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    action_summary:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    old_value_json:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    new_value_json:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    source_ip:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    session_ref:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    correlation_ref:string;
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
      
export class  audit_event_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    audit_event_id:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiProperty({example:"datetime"})
    event_timestamp:Date;
    @ApiProperty({example:"string"})
    event_type_code:string;
    @ApiProperty({example:"string"})
    entity_name:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    entity_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    actor_user_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    actor_login:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    actor_role_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    action_summary:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    old_value_json:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    new_value_json:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    source_ip:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    session_ref:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    correlation_ref:string;
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


export { audit_event };