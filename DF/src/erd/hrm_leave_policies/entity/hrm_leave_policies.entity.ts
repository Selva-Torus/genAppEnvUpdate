
import { hrm_leave_policies } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  hrm_leave_policiesEntity implements Omit<hrm_leave_policies,"days_per_year"|"carry_forward_days">{
    @ApiProperty({example:"bigint"})
    policy_id:bigint;
    @ApiProperty({example:"string"})
    policy_code:string;
    @ApiProperty({example:"string"})
    policy_name:string;
    @ApiProperty({example:"string"})
    leave_type:string;
    @ApiProperty({example:"decimal"})
    days_per_year: number | null;
    @ApiProperty({example:"decimal"})
    carry_forward_days: number | null;
    @ApiProperty({example:"string"})
    applicable_to:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    gender_applicability:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    accrual_frequency:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    max_consecutive_days:number;
    @ApiProperty({example:"boolean"})
    approval_required:boolean;
    @ApiProperty({example:"boolean"})
    encashment_allowed:boolean;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    carry_forward_expiry:number;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    applicable_locations:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    policy_rules_json:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    accrual_rules_json:any;
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
      
export class  hrm_leave_policies_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    policy_id:bigint;
    @ApiProperty({example:"string"})
    policy_code:string;
    @ApiProperty({example:"string"})
    policy_name:string;
    @ApiProperty({example:"string"})
    leave_type:string;
    @ApiProperty({example:"decimal"})
    days_per_year: number | null;
    @ApiProperty({example:"decimal"})
    carry_forward_days: number | null;
    @ApiProperty({example:"string"})
    applicable_to:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    gender_applicability:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    accrual_frequency:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    max_consecutive_days:number;
    @ApiProperty({example:"boolean"})
    approval_required:boolean;
    @ApiProperty({example:"boolean"})
    encashment_allowed:boolean;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    carry_forward_expiry:number;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    applicable_locations:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    policy_rules_json:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    accrual_rules_json:any;
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


export { hrm_leave_policies };