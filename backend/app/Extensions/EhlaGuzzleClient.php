<?php

namespace App\Extensions;

use GuzzleHttp\Client;

class EhlaGuzzleClient {
	
	public function __construct(){

	}

	public function post($path, $input){
		$client = new Client();
		try{
			$result = $client->request('POST', $path,
				[
					'auth' => ['ehl_api', '27150900'],
					'headers' => [
						'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
					],
					'form_params' => [
						'params' => $input
					]
				]
		    );
		    $data = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);
			return $data;
		} catch (\Exception $e) {
			return \GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true);
		}
	}
} 

?>