SELECT tam.create_version_triggers(
    'ct001_ta',
    ARRAY[
    'claims',    'claims_detail',    'codedescription',    'users',    'employee_details',    'employee_expense_claims',    'communication',    'combo_table',    'test_erd',    'dynamic_table'        ]::text[]
    );
