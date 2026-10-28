SELECT tam.create_version_triggers(
    'ct003_rf',
    ARRAY[
    'claims',    'claims_detail',    'codedescription'        ]::text[]
    );
