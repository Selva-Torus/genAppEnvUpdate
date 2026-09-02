import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString,IsOptional } from 'class-validator';





export class  Updaterevenue_api_typeDto {
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        aisp?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        pisp?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        cbpii?: number;

}

export class  Updatetob_revenue_summaryDto {
        @ApiPropertyOptional()
        @IsOptional()
        summary_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        org_code?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        summary_month?: Date;
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        total_revenue?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        ytd_revenue?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        invoices_raised?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        invoices_settled?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        invoices_pending?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        active_tpp_count?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        avg_revenue_per_tpp?: number;
        @ApiPropertyOptional({
            type: `number`,
            format: `float`,
        })
        @IsOptional()
        mom_growth_pct?: number;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional({type : Updaterevenue_api_typeDto}) 
        @IsOptional()
        @Type(() => Updaterevenue_api_typeDto) 
        revenue_by_api_type? : Updaterevenue_api_typeDto
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

}




