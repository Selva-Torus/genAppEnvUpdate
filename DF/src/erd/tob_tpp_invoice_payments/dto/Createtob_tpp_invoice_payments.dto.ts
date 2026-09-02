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


 

export class Createtob_tpp_invoice_paymentsDto{
    @ApiProperty()
    @IsString()
    invoice_payment_id : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    invoice_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    invoice_number? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tpp_id? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    tpp_name? : string;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    invoice_date? : Date;
    @ApiPropertyOptional()
    @IsOptional()
    invoice_amount?: number;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    payment_date? : Date;
    @ApiPropertyOptional()
    @IsOptional()
    paid_amount?: number;
    @ApiPropertyOptional()
    @IsOptional()
    pending_amount?: number;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    payment_method? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    payment_reference? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    payment_status? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    currency? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    notes? : string;
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







