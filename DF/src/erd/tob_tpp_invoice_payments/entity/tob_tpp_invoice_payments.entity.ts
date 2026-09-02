import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



     
  export class tob_tpp_invoice_paymentsEntity {
        @ApiProperty()
        id: string;
        @ApiProperty()
        invoice_payment_id: string;
        @ApiPropertyOptional()
        @IsOptional()
        invoice_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        invoice_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_name?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        invoice_date?: Date;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        invoice_amount?: number;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        payment_date?: Date;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        paid_amount?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        pending_amount?: number;
        @ApiPropertyOptional()
        @IsOptional()
        payment_method?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_reference?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        notes?: string;
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
          

  export class  tob_tpp_invoice_payments_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiProperty()
        invoice_payment_id: string;
        @ApiPropertyOptional()
        @IsOptional()
        invoice_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        invoice_number?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_name?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        invoice_date?: Date;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        invoice_amount?: number;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        payment_date?: Date;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        paid_amount?: number;
        @ApiPropertyOptional({
          type: `number`,
          format: `float`,
        })
        @IsOptional()
        pending_amount?: number;
        @ApiPropertyOptional()
        @IsOptional()
        payment_method?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_reference?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payment_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        currency?: string;
        @ApiPropertyOptional()
        @IsOptional()
        notes?: string;
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

    