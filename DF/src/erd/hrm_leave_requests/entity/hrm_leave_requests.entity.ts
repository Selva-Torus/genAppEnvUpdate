
import { hrm_leave_requests } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  hrm_leave_requestsEntity implements Omit<hrm_leave_requests,"days_requested"|"leave_balance_before"|"leave_balance_afterd">{
    @ApiProperty({example:"bigint"})
    leave_req_id:bigint;
    @ApiProperty({example:"string"})
    leave_request_number:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiProperty({example:"date"})
    start_date:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiProperty({example:"date"})
    end_date:Date;
    @ApiProperty({example:"decimal"})
    days_requested: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    reason:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    leave_reason_category:string;
    @ApiPropertyOptional({example:"boolean"})
    @IsOptional()
    half_day_flag:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    half_day_session:string;
    @ApiProperty({example:"boolean"})
    emergency_leave:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    contact_during_leave:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    handover_notes:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    attachment_urls:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    cancellation_reason:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    cancelled_by:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    cancelled_at:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    rejection_reason:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    approval_comments:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    leave_balance_before: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    leave_balance_afterd: number | null;
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
    employee_id: bigint;
    @ApiProperty({example:"bigint"})
    policy_id: bigint;
}
      
export class  hrm_leave_requests_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    leave_req_id:bigint;
    @ApiProperty({example:"string"})
    leave_request_number:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiProperty({example:"date"})
    start_date:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiProperty({example:"date"})
    end_date:Date;
    @ApiProperty({example:"decimal"})
    days_requested: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    reason:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    leave_reason_category:string;
    @ApiPropertyOptional({example:"boolean"})
    @IsOptional()
    half_day_flag:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    half_day_session:string;
    @ApiProperty({example:"boolean"})
    emergency_leave:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    contact_during_leave:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    handover_notes:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    attachment_urls:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    cancellation_reason:string;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    cancelled_by:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    cancelled_at:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    rejection_reason:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    approval_comments:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    leave_balance_before: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    leave_balance_afterd: number | null;
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


export { hrm_leave_requests };