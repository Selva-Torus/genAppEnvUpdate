import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';


 

export class Createrevenue_api_typeDto{
    @ApiPropertyOptional()
    @IsOptional()
    aisp?: number;
    @ApiPropertyOptional()
    @IsOptional()
    pisp?: number;
    @ApiPropertyOptional()
    @IsOptional()
    cbpii?: number;
}
export class Createtob_revenue_summaryDto{
    @ApiProperty()
    @IsString()
    summary_id : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    org_code? : string;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    summary_month? : Date;
    @ApiPropertyOptional()
    @IsOptional()
    total_revenue?: number;
    @ApiPropertyOptional()
    @IsOptional()
    ytd_revenue?: number;
    @ApiPropertyOptional()
    @IsOptional()
    invoices_raised?: number;
    @ApiPropertyOptional()
    @IsOptional()
    invoices_settled?: number;
    @ApiPropertyOptional()
    @IsOptional()
    invoices_pending?: number;
    @ApiPropertyOptional()
    @IsOptional()
    active_tpp_count?: number;
    @ApiPropertyOptional()
    @IsOptional()
    avg_revenue_per_tpp?: number;
    @ApiPropertyOptional()
    @IsOptional()
    mom_growth_pct?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    currency? : string;
    @ApiProperty({ type:Createrevenue_api_typeDto })
    @ValidateNested()
    @Type(() => Createrevenue_api_typeDto)
    revenue_by_api_type?: Createrevenue_api_typeDto;
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
    trs_locked_by?:  string;
    @ApiPropertyOptional({
    type: `string`,
    format: `date-time`,
    })
    @IsOptional()
    trs_locked_time?:  Date;
    @ApiProperty()
    trs_tenant_id: string;      
    @ApiProperty()
    trs_app_code: string;      
    @ApiProperty()
    trs_product_code: string;      
    @ApiPropertyOptional()
    @IsOptional()
    trs_event_process_status?: string;      
    @ApiPropertyOptional()
    @IsOptional()
    trs_event_status?: string;
}







