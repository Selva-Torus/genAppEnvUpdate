
import { hrm_job_grades } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  hrm_job_gradesEntity implements Omit<hrm_job_grades,"min_salary"|"max_salary"|"bonus_percentage">{
    @ApiProperty({example:"bigint"})
    grade_id:bigint;
    @ApiProperty({example:"string"})
    grade_code:string;
    @ApiProperty({example:"string"})
    grade_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    grade_description:string;
    @ApiProperty({example:"number"})
    grade_level:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    min_salary: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    max_salary: number | null;
    @ApiProperty({example:"string"})
    currency:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    bonus_percentage: number | null;
    @ApiProperty({example:"boolean"})
    promotion_eligible:boolean;
    @ApiProperty({example:"boolean"})
    overtime_eligible:boolean;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    notice_period_days:number;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    probation_period_days:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    appraisal_cycle:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    grade_metadata:any;
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
      
export class  hrm_job_grades_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    grade_id:bigint;
    @ApiProperty({example:"string"})
    grade_code:string;
    @ApiProperty({example:"string"})
    grade_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    grade_description:string;
    @ApiProperty({example:"number"})
    grade_level:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    min_salary: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    max_salary: number | null;
    @ApiProperty({example:"string"})
    currency:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    bonus_percentage: number | null;
    @ApiProperty({example:"boolean"})
    promotion_eligible:boolean;
    @ApiProperty({example:"boolean"})
    overtime_eligible:boolean;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    notice_period_days:number;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    probation_period_days:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    appraisal_cycle:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    grade_metadata:any;
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


export { hrm_job_grades };