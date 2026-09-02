import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



     
  export class tob_tpp_api_pricingEntity {
        @ApiProperty()
        id: string;
        @ApiProperty()
        record_id: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        api_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        api_name?: string;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        total_calls?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        successful_calls?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        billable_calls?: number;
        @ApiPropertyOptional()
        @IsOptional()
        pricing_id?: string;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        base_fee?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        usage_charge?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        overage_charge?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        total_charge?: number;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        billing_month?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional()
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
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_time?:  Date;
        @ApiProperty({example:"string"})
        trs_tenant_id: string;
        @ApiProperty({example:"string"})
        trs_app_code: string;
        @ApiProperty({example:"string"})
        trs_product_code: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_status?: string;
      }
          

  export class  tob_tpp_api_pricing_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiProperty()
        record_id: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        api_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        api_name?: string;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        total_calls?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        successful_calls?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        billable_calls?: number;
        @ApiPropertyOptional()
        @IsOptional()
        pricing_id?: string;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        base_fee?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        usage_charge?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        overage_charge?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        total_charge?: number;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        billing_month?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        trs_created_by?: string;
        @ApiPropertyOptional()
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
        @ApiPropertyOptional()
        @IsOptional()
        trs_locked_time?:  Date;
        @ApiProperty({example:"string"})
        trs_tenant_id: string;
        @ApiProperty({example:"string"})
        trs_app_code: string;
        @ApiProperty({example:"string"})
        trs_product_code: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional({example:"string"})
        @IsOptional()
        trs_event_status?: string;
      }

    