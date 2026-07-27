
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatehrm_employeesDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        employee_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        employee_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        emp_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        first_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        middle_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        last_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        full_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        preferred_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        gender?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        date_of_birth?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        marital_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        personal_email?: string;
        @ApiPropertyOptional()
        @IsOptional()
        work_email?: string;
        @ApiPropertyOptional()
        @IsOptional()
        mobile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        alternate_mobile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        address_line1?: string;
        @ApiPropertyOptional()
        @IsOptional()
        address_line2?: string;
        @ApiPropertyOptional()
        @IsOptional()
        city?: string;
        @ApiPropertyOptional()
        @IsOptional()
        state?: string;
        @ApiPropertyOptional()
        @IsOptional()
        country?: string;
        @ApiPropertyOptional()
        @IsOptional()
        postal_code?: string;
        @ApiPropertyOptional()
        @IsOptional()
        nationality?: string;
        @ApiPropertyOptional()
        @IsOptional()
        national_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        passport_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        blood_group?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employment_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        employee_status?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        hire_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        confirmation_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        probation_end?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        resignation_date?: Date;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        termination_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        exit_reason?: string;
        @ApiPropertyOptional()
        @IsOptional()
        work_mode?: string;
        @ApiPropertyOptional()
        @IsOptional()
        timezone?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        reporting_manager_id?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        hr_manager_id?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        current_salary?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        annual_ctc?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        salary_currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_account?: string;
        @ApiPropertyOptional()
        @IsOptional()
        bank_ifsc?: string;
        @ApiPropertyOptional()
        @IsOptional()
        emergency_contact_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        emergency_contact_phone?: string;
        @ApiPropertyOptional()
        @IsOptional()
        emergency_contact_relation?: string;
        @ApiPropertyOptional()
        @IsOptional()
        biometric_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        profile_photo_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        linkedin_profile?: string;
        @ApiPropertyOptional()
        @IsOptional()
        skills_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        education_history_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        certifications_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        family_details_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        additional_details?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        custom_attributes_json?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        secure_data?: Prisma.InputJsonValue;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        deleted_at?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        doc_url?: string[];
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














        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        position_id: number;


        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        grade_id: number;







}

