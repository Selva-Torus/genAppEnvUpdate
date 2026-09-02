import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



     
  export class revenue_api_typeEntity {
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
          
  export class tob_revenue_summaryEntity {
        @ApiProperty()
        id: string;
        @ApiProperty()
        summary_id: string;
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
        @ApiPropertyOptional({type :() => revenue_api_typeEntity}) 
        @IsOptional()
        revenue_by_api_type? : revenue_api_typeEntity
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
          

  export class  tob_revenue_summary_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiProperty()
        summary_id: string;
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
        @ApiPropertyOptional({type :() => revenue_api_typeEntity}) 
        @IsOptional()
        revenue_by_api_type? : revenue_api_typeEntity
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

    