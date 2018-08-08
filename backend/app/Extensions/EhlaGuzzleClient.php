<?php

namespace App\Extensions;

use GuzzleHttp\Client;

class EhlaGuzzleClient {

	private $options;
	
	public function __construct(){
		$this->options = [
			'auth' => ['ehl_api', '27150900'],
			'headers' => [
				'User-Agent' => filter_input(INPUT_SERVER, 'HTTP_USER_AGENT')
			]
		];
	}

	public function post($path, $input){
		$client = new Client();
		if($input) {
			$this->options['form_params']['params'] = $input;
		}
		try{
			$result = $client->request('POST', $path, $this->options);

//      $data = (string)$result->getBody()->getContents();
//      print_r($data);

		    $data = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);

		    if($result->getStatusCode() == 401)
        {
          return Response()->json($data,401);
        }

			return $data;
		} catch (\Exception $e) {
		    if ($e->hasResponse()) {
		        $exception = (string) $e->getResponse()->getBody();
		        $exception = json_decode($exception);
		        return Response()->json($exception, $e->getCode());
		    } else {
		        return Response()->json($e->getMessage(), 503);
		    }
			// return \GuzzleHttp\json_decode($e->hasResponse()->getBody()->getContents(), true);
		}
	}


	public function get($path){
		$client = new Client();
		try{
			$result = $client->request('GET', $path, $this->options);
		    $data = \GuzzleHttp\json_decode($result->getBody()->getContents(), true);
      if($result->getStatusCode() == 401)
      {
        return Response()->json($data,401);
      }
			return $data;
		} catch (\Exception $e) {
			return \GuzzleHttp\json_decode($e->getResponse()->getBody()->getContents(), true);
		}
	}

} 

?>