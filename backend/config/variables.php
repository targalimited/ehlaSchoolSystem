<?php

return [
	'loginUrl' => env('USERMODEL_URL').'v1/userApi/login?encode=1',
	'logoutUrl' => env('USERMODEL_URL').'v1/userApi/logout?access-token=',
	// school items
	'schItemSummaryUrl' => env('USERMODEL_URL').'v1/schoolApi/get_school_item_summary?encode=1&access-token=',
]

?>