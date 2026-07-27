

SELECT tam.create_version_triggers(
    'ct006_hrm',
    ARRAY[
    'hrm_employees',    'hrm_job_positions',    'hrm_job_grades',    'hrm_leave_policies',    'hrm_leave_requests',    'hrm_performance_cycles',    'hrm_performance_reviews',    'hrm_separation_checklists',    'hrm_employee_access_requests',    'hrm_employee_background_checks',    'hrm_employee_nda'        ]
    );
