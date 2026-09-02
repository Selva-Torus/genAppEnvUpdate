import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



     
  export class tob_pricing_masterEntity {
        @ApiProperty()
        id: string;
        @ApiProperty({
          type: `integer`,
          format: `int32`,
        })
        pricing_id: number;
        @ApiPropertyOptional()
        @IsOptional()
        tier_name?: string;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        api_call_min?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        api_call_max?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        monthly_fee?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        price_per_call?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        overage_price_per_call?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        tpp_limit?: number;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
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
          

  export class  tob_pricing_master_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiProperty({
          type: `integer`,
          format: `int32`,
        })
        pricing_id: number;
        @ApiPropertyOptional()
        @IsOptional()
        tier_name?: string;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        api_call_min?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        api_call_max?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        monthly_fee?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        price_per_call?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        overage_price_per_call?: number;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        tpp_limit?: number;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
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

    