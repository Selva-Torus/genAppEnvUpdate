import { Prisma } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class  UpdateclaimsDto {
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        employee_id?: number;
        @ApiProperty()
        employee_name?: string;
        @ApiProperty()
        department_name?: string;
        @ApiProperty()
        employee_grade?: string;
        @ApiProperty()
        receipt_image?: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        total_amount?: number;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        from_date?: Date;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        to_date?: Date;
        @ApiProperty()
        email?: string;
        @ApiProperty()
        claim_category?: string;
        @ApiProperty()
        comments?: string;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        expense_date?: Date;
        @ApiProperty()
        is_comment_enabled?: boolean;
        @ApiProperty()
        expense_name?: string;
        @ApiProperty()
        manager_comments?: string;
        @ApiProperty()
        expense_description?: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        expense_amount?: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        category_total_amount?: number;
        @ApiProperty()
        claim_expense_type?: string;


        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        trs_created_date?: Date;
        @ApiProperty()
        trs_created_by?: string;
        @ApiProperty({
            type: `string`,
            format: `date-time`,
        })
        trs_modified_date?: Date;
        @ApiProperty()
        trs_modified_by?: string;
        @ApiProperty()
        trs_status?: string;
        @ApiProperty()
        trs_next_status?: string;
        @ApiProperty()
        trs_process_id?: string;
        @ApiProperty()
        trs_access_profile?: string;
        @ApiProperty()
        trs_org_grp_code?: string;
        @ApiProperty()
        trs_org_code?: string;
        @ApiProperty()
        trs_role_grp_code?: string;
        @ApiProperty()
        trs_role_code?: string;
        @ApiProperty()
        trs_ps_grp_code?: string;
        @ApiProperty()
        trs_ps_code?: string;
        @ApiProperty()
        trs_sub_org_code?: string;
        @ApiProperty()
        trs_sub_org_grp_code?: string;

}

