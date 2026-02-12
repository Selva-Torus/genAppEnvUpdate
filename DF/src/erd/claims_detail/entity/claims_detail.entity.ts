import { claims_detail } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  claims_detailEntity implements  claims_detail {
    @ApiProperty({example:"number"})
    claim_detail_id:number;
    @ApiProperty({example:"string"})
    expense_category:string;
    @ApiProperty({example:"string"})
    expense_description:string;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiProperty({example:"date"})
    expense_date:Date;
    @ApiProperty({example:"number"})
    expense_amount:number;
    @ApiProperty({example:"string"})
    name:string;
    @ApiProperty({example:"string"})
    attachment:string;
    @ApiProperty({example:"string"})
    claim_category:string;
    @ApiProperty({example:"number"})
    claim_id: number;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_created_date: Date;
    @ApiProperty({example:"string"})
    trs_created_by: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_modified_date: Date;
    @ApiProperty({example:"string"})
    trs_modified_by: string;
    @ApiProperty({example:"string"})
    trs_status: string;
    @ApiProperty({example:"string"})
    trs_next_status: string;
    @ApiProperty({example:"string"})
    trs_process_id: string;
    @ApiProperty({example:"string"})
    trs_access_profile: string;
    @ApiProperty({example:"string"})
    trs_org_grp_code: string;
    @ApiProperty({example:"string"})
    trs_org_code: string;
    @ApiProperty({example:"string"})
    trs_role_grp_code: string;
    @ApiProperty({example:"string"})
    trs_role_code: string;
    @ApiProperty({example:"string"})
    trs_ps_grp_code: string;
    @ApiProperty({example:"string"})
    trs_ps_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_grp_code: string;
}
      
export class  claims_detail_OnlyParentEntity {
    @ApiProperty({example:"number"})
    claim_detail_id:number;
    @ApiProperty({example:"string"})
    expense_category:string;
    @ApiProperty({example:"string"})
    expense_description:string;
    @Transform(({ value }) => value?.toISOString().split('T')[0])
    @ApiProperty({example:"date"})
    expense_date:Date;
    @ApiProperty({example:"number"})
    expense_amount:number;
    @ApiProperty({example:"string"})
    name:string;
    @ApiProperty({example:"string"})
    attachment:string;
    @ApiProperty({example:"string"})
    claim_category:string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_created_date: Date;
    @ApiProperty({example:"string"})
    trs_created_by: string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    trs_modified_date: Date;
    @ApiProperty({example:"string"})
    trs_modified_by: string;
    @ApiProperty({example:"string"})
    trs_status: string;
    @ApiProperty({example:"string"})
    trs_next_status: string;
    @ApiProperty({example:"string"})
    trs_process_id: string;
    @ApiProperty({example:"string"})
    trs_access_profile: string;
    @ApiProperty({example:"string"})
    trs_org_grp_code: string;
    @ApiProperty({example:"string"})
    trs_org_code: string;
    @ApiProperty({example:"string"})
    trs_role_grp_code: string;
    @ApiProperty({example:"string"})
    trs_role_code: string;
    @ApiProperty({example:"string"})
    trs_ps_grp_code: string;
    @ApiProperty({example:"string"})
    trs_ps_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_code: string;
    @ApiProperty({example:"string"})
    trs_sub_org_grp_code: string;
}


export { claims_detail };