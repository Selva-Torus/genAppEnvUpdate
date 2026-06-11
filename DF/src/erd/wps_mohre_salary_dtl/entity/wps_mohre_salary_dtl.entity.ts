
import { wps_mohre_salary_dtl } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  wps_mohre_salary_dtlEntity implements Omit<wps_mohre_salary_dtl,"fixed_income"|"variable_income"|"total_benefits"|"total_deductions"|"total_allowance"|"total_incentives"|"total_salary"|"net_pay"|"bonus"|"refund_amount">{
    @ApiProperty({example:"bigint"})
    wpsmsd_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    wpsmac_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_eid:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_mol_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_reg_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_eid:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_mol_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_unified_number:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    fixed_income: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    variable_income: number | null;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    total_leaves:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    salary_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_passport_number:string;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    from_date:Date;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    to_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    agent_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    salary_year:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    salary_payment_date:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_benefits: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_deductions: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_allowance: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_incentives: number | null;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    days_paid:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_salary: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    is_inside_country:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    period:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    remarks:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    allowance:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    deduction:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    incentives:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    benefits:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    channel_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_iban:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    process_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_name:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    net_pay: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    bonus: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    sif_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    sal_tran_ref_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    work_permit_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    wps_status:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    employee_count:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    refund_amount: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    refund_reason:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    refund_tran_ref_no:string;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    refund_tran_date:Date;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_created_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_created_by:string;
    @Transform(({ value }) => value?.toISOString())
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
    @Transform(({ value }) => value?.toISOString())
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
      
export class  wps_mohre_salary_dtl_OnlyParentEntity {
    @ApiProperty({example:"bigint"})
    wpsmsd_id:bigint;
    @ApiPropertyOptional({example:"bigint"})
    @IsOptional()
    wpsmac_id:bigint;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_eid:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_mol_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_reg_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_eid:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_mol_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_unified_number:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    fixed_income: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    variable_income: number | null;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    total_leaves:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    salary_type:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_passport_number:string;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    from_date:Date;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    to_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    agent_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    salary_year:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    salary_payment_date:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_benefits: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_deductions: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_allowance: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_incentives: number | null;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    days_paid:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    total_salary: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    is_inside_country:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    period:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    remarks:string;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    allowance:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    deduction:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    incentives:any;
    @ApiPropertyOptional({example:"any"})
    @IsOptional()
    benefits:any;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    channel_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_iban:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    process_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employer_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    employee_name:string;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    net_pay: number | null;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    bonus: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    sif_name:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    sal_tran_ref_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    work_permit_number:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    wps_status:string;
    @ApiPropertyOptional({example:"number"})
    @IsOptional()
    employee_count:number;
    @ApiPropertyOptional({example:"decimal"})
    @IsOptional()
    refund_amount: number | null;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    refund_reason:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    refund_tran_ref_no:string;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    refund_tran_date:Date;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_created_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_created_by:string;
    @Transform(({ value }) => value?.toISOString())
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
    @Transform(({ value }) => value?.toISOString())
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


export { wps_mohre_salary_dtl };