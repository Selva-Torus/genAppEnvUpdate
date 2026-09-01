
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsBoolean } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatewps_mohre_employee_dtlDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        wpsmed_id?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        wpsmac_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        employer_mol_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_mol_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employer_reg_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employer_eid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        mohre_reg_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_card_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_unified_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_eid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_is_active?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_passport_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_name_ar?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        total_salary?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        status_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        employee_iban?: string;
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
        @ApiPropertyOptional()
        @IsOptional()
        trs_tenant_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_app_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_product_code?: string;
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

