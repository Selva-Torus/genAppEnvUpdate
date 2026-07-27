
import { hrm_separation_checklists } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  hrm_separation_checklistsEntity implements Omit<hrm_separation_checklists,"exit_interview_rating">{
    @ApiProperty({example:"bigint"})
    checklist_id:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiProperty({example:"date"})
    resignation_date:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    last_working_day:Date;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    checklist_items:any;
    @ApiProperty({example:"boolean"})
    access_revoked:boolean;
    @ApiProperty({example:"boolean"})
    assets_returned:boolean;
    @ApiProperty({example:"boolean"})
    hr_clearance:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    separation_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    resignation_reason:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    exit_interview_rating: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    final_settlement_status:string;
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
}
      
export class  hrm_separation_checklists_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    checklist_id:bigint;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiProperty({example:"date"})
    resignation_date:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    last_working_day:Date;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    checklist_items:any;
    @ApiProperty({example:"boolean"})
    access_revoked:boolean;
    @ApiProperty({example:"boolean"})
    assets_returned:boolean;
    @ApiProperty({example:"boolean"})
    hr_clearance:boolean;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    separation_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    resignation_reason:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    exit_interview_rating: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    final_settlement_status:string;
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


export { hrm_separation_checklists };