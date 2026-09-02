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
import { tob_api_process_logs_OnlyParentEntity} from 'src/erd/tob_api_process_logs/entity/tob_api_process_logs.entity';          


 

export class Createtob_api_repositoryDto{
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    apiname? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    version? : string;
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    @IsOptional()
    release_date? : Date;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    api_category? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    server_url? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    status? : string;
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    api_resourcepath? : string;
    @ApiProperty({ type: [tob_api_process_logs_OnlyParentEntity], required: false})
    tob_api_process_logs?: tob_api_process_logs_OnlyParentEntity[];               
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







