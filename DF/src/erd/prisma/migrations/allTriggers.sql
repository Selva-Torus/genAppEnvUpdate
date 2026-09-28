

SELECT tam.create_version_triggers(
    'ct003_tag',
    ARRAY[
    'ai_asset',    'ai_asset_model',    'ai_asset_version',    'ai_asset_tier_assessment',    'ai_asset_data_class',    'ai_asset_dependency',    'ai_agent_control',    'ai_agent_action',    'audit_event',    'cert_template',    'cert_template_stage',    'certification',    'certification_condition',    'certification_stage',    'discovery_staging',    'evidence_export',    'evidence_export_item',    'evidence_item',    'integration_field_map',    'integration_run',    'integration_source',    'risk_rule',    'risk_rule_condition',    'sys_code_type',    'sys_code_value'        ]
    );
