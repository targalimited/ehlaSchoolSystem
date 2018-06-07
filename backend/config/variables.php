<?php

return [
	'loginUrl' => env('USERMODEL_URL').'v1/userApi/login?encode=1',
	'logoutUrl' => env('USERMODEL_URL').'v1/userApi/logout?access-token=',
	// school items
	'schoolApiGetSchoolItemSummaryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_item_summary?encode=1&access-token=',
	'schoolApiGetByCategoryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_by_category?encode=1&access-token=',
	'schoolApiGetSelectedItemByCategoryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_selected_item_by_category?encode=1&access-token=',
	'schoolApiChooseItemsUrl' => env('USERMODEL_URL').'v1/schoolApi/choose_items?encode=1&access-token=',
]

?>