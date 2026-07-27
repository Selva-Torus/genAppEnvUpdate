
import { hrm_job_positions } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  hrm_job_positionsEntity implements Omit<hrm_job_positions,"salary_range_min"|"salary_range_max">{
    @ApiProperty({example:"bigint"})
    position_id:bigint;
    @ApiProperty({example:"string"})
    position_code:string;
    @ApiProperty({example:"string"})
    position_title:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    description:string;
    @ApiProperty({example:"string"})
    employment_type:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    experience_required:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    salary_range_min: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    salary_range_max: number | null;
    @ApiProperty({example:"number"})
    headcount:number;
    @ApiProperty({example:"number"})
    approved_headcount:number;
    @ApiProperty({example:"number"})
    filled_headcount:number;
    @ApiProperty({example:"boolean"})
    is_open:boolean;
    @ApiProperty({example:"string"})
    vacancy_status:string;
    @ApiProperty({example:"boolean"})
    remote_allowed:boolean;
    @ApiProperty({example:"boolean"})
    travel_required:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    job_family:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    job_level:string;
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
    grade_id: bigint;
}
      
export class  hrm_job_positions_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    position_id:bigint;
    @ApiProperty({example:"string"})
    position_code:string;
    @ApiProperty({example:"string"})
    position_title:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    description:string;
    @ApiProperty({example:"string"})
    employment_type:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    experience_required:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    salary_range_min: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    salary_range_max: number | null;
    @ApiProperty({example:"number"})
    headcount:number;
    @ApiProperty({example:"number"})
    approved_headcount:number;
    @ApiProperty({example:"number"})
    filled_headcount:number;
    @ApiProperty({example:"boolean"})
    is_open:boolean;
    @ApiProperty({example:"string"})
    vacancy_status:string;
    @ApiProperty({example:"boolean"})
    remote_allowed:boolean;
    @ApiProperty({example:"boolean"})
    travel_required:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    job_family:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    job_level:string;
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


export { hrm_job_positions };