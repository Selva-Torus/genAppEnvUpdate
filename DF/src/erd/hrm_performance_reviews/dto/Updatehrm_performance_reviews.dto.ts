
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Updatehrm_performance_reviewsDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        review_id?: number;
        @ApiPropertyOptional()
        @IsOptional()
        review_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        review_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        review_status?: string;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        self_rating?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        manager_rating?:  Prisma.Decimal;
        @ApiPropertyOptional({
            type: `number`,
            format: `decimal`,
        })
        @IsOptional()
        final_rating?:  Prisma.Decimal;
        @ApiPropertyOptional()
        @IsOptional()
        improvements?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        completed_at?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        additional_details?: Prisma.InputJsonValue;
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
        employee_id: number;












        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        cycle_id: number;

}

