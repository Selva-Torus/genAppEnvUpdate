import { Prisma } from '@prisma/client';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { tob_api_process_logs_OnlyParentEntity } from '../../tob_api_process_logs/entity/tob_api_process_logs.entity';            



     
  export class tob_api_repositoryEntity {
        @ApiProperty()
        id: string;
        @ApiPropertyOptional()
        @IsOptional()
        apiname?: string;
        @ApiPropertyOptional()
        @IsOptional()
        version?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        release_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        api_category?: string;
        @ApiPropertyOptional()
        @IsOptional()
        server_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        api_resourcepath?: string;
        @ApiProperty({ type: [tob_api_process_logs_OnlyParentEntity], required: false})
        tob_api_process_logs?: tob_api_process_logs_OnlyParentEntity[];               
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
          

  export class  tob_api_repository_OnlyParentEntity {
        @ApiProperty()
        id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        apiname?: string;
        @ApiPropertyOptional()
        @IsOptional()
        version?: string;
        @ApiPropertyOptional({
          type: `string`,
          format: `date-time`,
        })
        @IsOptional()
        release_date?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        api_category?: string;
        @ApiPropertyOptional()
        @IsOptional()
        server_url?: string;
        @ApiPropertyOptional()
        @IsOptional()
        status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        api_resourcepath?: string;
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

    