
import { Prisma } from '@prisma/client';
import { IsEnum,IsOptional,IsString,IsDateString,IsBoolean,IsInt,IsNumber,IsArray,IsNotEmpty } from 'class-validator';
import { ApiProperty,ApiPropertyOptional } from '@nestjs/swagger';


export class  Createagent_log_eventDto {
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        log_event_id?: number;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        event_time?: Date;
        @ApiPropertyOptional()
        @IsOptional()
        event_uid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        spec_version?: string;
        @ApiPropertyOptional()
        @IsOptional()
        event_type?: string;
        @ApiPropertyOptional()
        @IsOptional()
        event_source?: string;
        @ApiPropertyOptional()
        @IsOptional()
        agent_urn?: string;
        @ApiPropertyOptional()
        @IsOptional()
        agent_version?: string;
        @ApiPropertyOptional()
        @IsOptional()
        session_uid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trace_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        span_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        parent_span_id?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        seq_no?: number;
        @ApiPropertyOptional()
        @IsOptional()
        severity?: string;
        @ApiPropertyOptional()
        @IsOptional()
        operation_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        gen_ai_provider?: string;
        @ApiPropertyOptional()
        @IsOptional()
        gen_ai_model?: string;
        @ApiPropertyOptional()
        @IsOptional()
        tool_name?: string;
        @ApiPropertyOptional()
        @IsOptional()
        mcp_server_urn?: string;
        @ApiPropertyOptional()
        @IsOptional()
        target_agent_urn?: string;
        @ApiPropertyOptional()
        @IsOptional()
        side_effect_class?: string;
        @ApiPropertyOptional()
        @IsOptional()
        outcome?: string;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        duration_ms?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        input_tokens?: number;
        @ApiPropertyOptional({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        output_tokens?: number;
        @ApiPropertyOptional()
        @IsOptional()
        cost_amount?: string;
        @ApiPropertyOptional()
        @IsOptional()
        policy_decision_uid?: string;
        @ApiPropertyOptional()
        @IsOptional()
        capture_mode?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payload_ref?: string;
        @ApiPropertyOptional()
        @IsOptional()
        payload_sha256?: string;
        @ApiPropertyOptional()
        @IsOptional()
        attributes?: Prisma.InputJsonValue;
        @ApiPropertyOptional()
        @IsOptional()
        prev_event_hash?: string;
        @ApiPropertyOptional()
        @IsOptional()
        event_hash?: string;
        @ApiPropertyOptional()
        @IsOptional()
        ingest_validation?: string;
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
        trs_locked_by?: string;
        @ApiPropertyOptional({
            type: `string`,
            format: `date-time`,
        })
        @IsOptional()
        trs_locked_time?: Date;
        @ApiProperty()
        @IsString()
        trs_tenant_id: string;
        @ApiProperty()
        @IsString()
        trs_app_code: string;
        @ApiProperty()
        @IsString()
        trs_product_code: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_process_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_event_status?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_token_id?: string;
        @ApiPropertyOptional()
        @IsOptional()
        trs_version?: string;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        ai_asset_id: number;
        @ApiProperty({
            type: `integer`,
            format: `int32`,
        })
        @IsOptional()
        stream_id: number;

        
}

