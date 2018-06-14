<?php

return [
	'loginUrl' => env('USERMODEL_URL').'v1/userApi/login?encode=1',
	'logoutUrl' => env('USERMODEL_URL').'v1/userApi/logout?access-token=',
	'changePWUrl' => env('USERMODEL_URL').'v1/userApi/changepw?encode=1&access-token=',
	// school items
	'schoolApiGetSchoolItemSummaryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_item_summary',
	
	'schoolApiGetSchoolCategoryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_category/subject_id/',
	
	'schoolApiGetByCategoryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_by_category',
	'schoolApiGetSelectedItemByCategoryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_selected_item_by_category',
	'schoolApiGetSelectedItemsUrl' => env('USERMODEL_URL').'v1/schoolApi/get_selected_items',
	'schoolApiGetByIdsUrl' => env('USERMODEL_URL').'v1/schoolApi/get_by_ids',
	'schoolApiGetPreviewByIdUrl' => env('USERMODEL_URL').'v1/schoolApi/get_preview_by_id',
	
	'schoolApiChooseItemsUrl' => env('USERMODEL_URL').'v1/schoolApi/choose_items',
	'schoolApiChooseItemsForLevelUrl' => env('USERMODEL_URL').'v1/schoolApi/choose_items_for_level',
	'schoolApiChooseItemForLevelUrl' => env('USERMODEL_URL').'v1/schoolApi/choose_item_for_level',
	
	'schoolApiSetAssignmentsUrl' => env('USERMODEL_URL').'v1/schoolApi/set_assignments',
	'schoolApiPublishAssignmentsUrl' => env('USERMODEL_URL').'v1/schoolApi/publish_assignments',
	'schoolApiGetAssignmentByItemIdUrl' => env('USERMODEL_URL').'v1/schoolApi/get_assignment_by_item_id',
	
	'schoolApiGetSchoolResultSummaryReportUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_result_summary_report',
	'schoolApiGetSchoolResultReportUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_result_report',
	'schoolApiGetSchoolWeaknessReportUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_weakness_report',
]

?>