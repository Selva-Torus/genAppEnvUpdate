import { claims } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';



export class  claimsEntity implements  claims {
    @ApiProperty({example:"number"})
    claim_id:number;
    @ApiProperty({example:"number"})
    employee_id:number;
    @ApiProperty({example:"string"})
    employee_name:string;
    @ApiProperty({example:"string"})
    department_name:string;
    @ApiProperty({example:"string"})
    employee_grade:string;
    @ApiProperty({example:"string"})
    receipt_image:string;
    @ApiProperty({example:"number"})
    total_amount:number;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    from_date:Date;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    to_date:Date;
    @ApiProperty({example:"string"})
    email:string;
    @ApiProperty({example:"string"})
    claim_category:string;
    @ApiProperty({example:"string"})
    comments:string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    expense_date:Date;
    @ApiProperty({example:"boolean"})
    is_comment_enabled:boolean;
    @ApiProperty({example:"string"})
    expense_name:string;
    @ApiProperty({example:"string"})
    manager_comments:string;
    @ApiProperty({example:"string"})
    expense_description:string;
    @ApiProperty({example:"number"})
    expense_amount:number;
    @ApiProperty({example:"number"})
    category_total_amount:number;
    @ApiProperty({example:"string"})
    claim_expense_type:string;
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
      
export class  claims_OnlyParentEntity {
    @ApiProperty({example:"number"})
    claim_id:number;
    @ApiProperty({example:"number"})
    employee_id:number;
    @ApiProperty({example:"string"})
    employee_name:string;
    @ApiProperty({example:"string"})
    department_name:string;
    @ApiProperty({example:"string"})
    employee_grade:string;
    @ApiProperty({example:"string"})
    receipt_image:string;
    @ApiProperty({example:"number"})
    total_amount:number;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    from_date:Date;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    to_date:Date;
    @ApiProperty({example:"string"})
    email:string;
    @ApiProperty({example:"string"})
    claim_category:string;
    @ApiProperty({example:"string"})
    comments:string;
    @Transform(({ value }) => value?.toISOString())
    @ApiProperty({example:"datetime"})
    expense_date:Date;
    @ApiProperty({example:"boolean"})
    is_comment_enabled:boolean;
    @ApiProperty({example:"string"})
    expense_name:string;
    @ApiProperty({example:"string"})
    manager_comments:string;
    @ApiProperty({example:"string"})
    expense_description:string;
    @ApiProperty({example:"number"})
    expense_amount:number;
    @ApiProperty({example:"number"})
    category_total_amount:number;
    @ApiProperty({example:"string"})
    claim_expense_type:string;
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


export { claims };