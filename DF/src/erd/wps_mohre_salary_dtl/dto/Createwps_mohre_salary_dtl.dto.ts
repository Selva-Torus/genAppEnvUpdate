
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createwps_mohre_salary_dtlDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        wpsmsd_id: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        wpsmac_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        employer_eid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employer_mol_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employer_reg_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_eid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_mol_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_unified_number?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        fixed_income?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        variable_income?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        total_leaves?: number;
        @ApiPropertyOptional()
        @IsOptional()
        salary_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_passport_number?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        from_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        to_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        agent_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        salary_year?: string;
        @ApiPropertyOptional()
        @IsOptional()
        salary_payment_date?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        total_benefits?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        total_deductions?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        total_allowance?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        total_incentives?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        days_paid?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        total_salary?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        is_inside_country?: string;
        @ApiPropertyOptional()
        @IsOptional()
        period?: string;
        @ApiPropertyOptional()
        @IsOptional()
        remarks?: string;
        @ApiPropertyOptional()
        @IsOptional()
        allowance?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        deduction?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        incentives?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        benefits?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        channel_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_iban?: string;
        @ApiPropertyOptional()
        @IsOptional()
        process_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employer_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_name?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        net_pay?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        bonus?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        sif_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        sal_tran_ref_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        work_permit_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        wps_status?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        employee_count?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        refund_amount?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        refund_reason?: string;
        @ApiPropertyOptional()
        @IsOptional()
        refund_tran_ref_no?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        refund_tran_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_modified_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_modified_by?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_process_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_access_profile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_role_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_ps_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_grp_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_sub_org_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_locked_time?: Date;
        @ApiProperty()
        @IsString()
        trs_tenant_id: string;
        @ApiProperty()
        @IsString()
        trs_app_code: string;
        @ApiProperty()
        @IsString()
        trs_product_code: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_token_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_version?: string;

        
}

