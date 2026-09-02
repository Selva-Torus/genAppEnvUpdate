import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';



        export enum api_roles_tob_tpp_registry{
            AIS="AIS",
            PIS="PIS",
        }
     
  export class tob_tpp_registryEntity {
        @ApiProperty()
        id: string;
        @ApiProperty()
        tpp_id: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        legal_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        client_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        org_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        software_statement_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        pricing_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tier_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        onboarding_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        directory_record_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        jwks_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        redirect_uris?: string;
        @ApiPropertyOptional()
        @IsOptional()
        logo_uri?: string;
        @ApiPropertyOptional()
        @IsOptional()
        contact_email?: string;
        @ApiPropertyOptional()
        @IsOptional()
        is_large_corporate?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        country?: string;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        billing_currency?: number;
        @ApiPropertyOptional({enum :api_roles_tob_tpp_registry,enumName:"api_roles",type:"string"}) 
        @IsOptional()
        api_roles? : api_roles_tob_tpp_registry
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
          

  export class  tob_tpp_registry_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiProperty()
        tpp_id: string;
        @ApiPropertyOptional()
        @IsOptional()
        tpp_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        legal_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        client_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        org_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        software_statement_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        pricing_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tier_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        onboarding_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        directory_record_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        jwks_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        redirect_uris?: string;
        @ApiPropertyOptional()
        @IsOptional()
        logo_uri?: string;
        @ApiPropertyOptional()
        @IsOptional()
        contact_email?: string;
        @ApiPropertyOptional()
        @IsOptional()
        is_large_corporate?: boolean;
        @ApiPropertyOptional()
        @IsOptional()
        country?: string;
        @ApiPropertyOptional({
          type: `integer`,
          format: `int32`,
        })
        @IsOptional()
        billing_currency?: number;
        @ApiPropertyOptional({enum :api_roles_tob_tpp_registry,enumName:"api_roles",type:"string"})
        @IsOptional()
        api_roles? : api_roles_tob_tpp_registry
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

    