
import { user } from '@prisma/client';
import { IsEnum,IsOptional } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  userEntity implements user{
    @ApiProperty({example:"number"})
    id:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    name:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    onlydate:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    dateandtime:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_created_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_created_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_modified_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_modified_by:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_access_profile:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_locked_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_locked_time:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_tenant_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_app_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_product_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_token_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_version:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_prev_process_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_prev_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_prev_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_next_process_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_next_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_next_process_status:string;
}
      
export class  user_OnlyParentEntity {
    @ApiProperty({example:"number"})
    id:number;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    name:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString().split('T')[0] : value)
    @ApiPropertyOptional({example:"date"})
    @IsOptional()
    onlydate:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    dateandtime:Date;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_created_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_created_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_modified_date:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_modified_by:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_access_profile:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_role_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_ps_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_grp_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_sub_org_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_locked_by:string;
    @Transform(({ value }) => value instanceof Date ? value.toISOString() : value)
    @ApiPropertyOptional({example:"datetime"})
    @IsOptional()
    trs_locked_time:Date;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_tenant_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_app_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_product_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_event_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_token_id:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_version:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_prev_process_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_prev_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_prev_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_process_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_next_process_code:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_next_status:string;
    @ApiPropertyOptional({example:"string"})
    @IsOptional()
    trs_next_process_status:string;
}


export { user };