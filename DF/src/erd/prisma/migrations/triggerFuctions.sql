

SELECT tam.create_version_triggers(
    'ct006_lap',
    ARRAY[
    'attorneys',    'creditors',    'venues',    'venue_special_rules',    'document_types',    'checklist_items',    'status_lookup',    'priority_lookup',    'rejection_reason_lookup',    'accounts',    'account_documents',    'amr_checklist_status',    'amr_review_sessions',    'activity_log'        ]
    );
