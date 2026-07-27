
import { hrm_employee_access_requests } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  hrm_employee_access_requestsEntity implements hrm_employee_access_requests{
    @ApiProperty({example:"bigint"})
    access_req_id:bigint;
    @ApiProperty({example:"string"})
    request_number:string;
    @ApiProperty({example:"string"})
    request_type:string;
    @ApiProperty({example:"string"})
    system_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    access_role:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    access_level:string;
    @ApiProperty({example:"string"})
    business_justification:string;
    @ApiProperty({example:"string"})
    request_priority:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    risk_level:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    approval_comments:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    rejection_reason:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_from:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_to:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    access_expiry_date:Date;
    @ApiProperty({example:"string"})
    provisioning_status:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    provisioned_at:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    provisioning_reference:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    ticket_reference:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    revoked_at:Date;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    revoked_by:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    revoked_reason:string;
    @ApiProperty({example:"boolean"})
    access_review_required:boolean;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    last_reviewed_at:Date;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    reviewed_by:bigint;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    attachments_json:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    audit_metadata:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    additional_details:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    secure_data:any;
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
}
      
export class  hrm_employee_access_requests_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    access_req_id:bigint;
    @ApiProperty({example:"string"})
    request_number:string;
    @ApiProperty({example:"string"})
    request_type:string;
    @ApiProperty({example:"string"})
    system_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    access_role:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    access_level:string;
    @ApiProperty({example:"string"})
    business_justification:string;
    @ApiProperty({example:"string"})
    request_priority:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    risk_level:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    approval_comments:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    rejection_reason:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_from:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    valid_to:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    access_expiry_date:Date;
    @ApiProperty({example:"string"})
    provisioning_status:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    provisioned_at:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    provisioning_reference:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    ticket_reference:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    revoked_at:Date;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    revoked_by:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    revoked_reason:string;
    @ApiProperty({example:"boolean"})
    access_review_required:boolean;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    last_reviewed_at:Date;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    reviewed_by:bigint;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    attachments_json:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    audit_metadata:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    additional_details:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    secure_data:any;
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


export { hrm_employee_access_requests };