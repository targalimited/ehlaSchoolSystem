<?php

function json($result){
    if (isset($_SERVER['HTTP_POSTMAN_TOKEN'])){
        dump($result);
    }

  $error_code = 200;

  if(isset($result['debug']['err_code']) && $result['debug']['err_code']==401)
     $error_code = $result['debug']['err_code'];

    return Response()->json($result,$error_code);
}

function error_json($result){
    if (isset($_SERVER['HTTP_POSTMAN_TOKEN'])){
        dump($result);
        abort(500, 'Die in action.');
    }
    return Response()->json($result,500);
}

function return_success(){

    $result = [
        'status' => true,
        'code' => '',
        'message' => 'success'
    ];

    if (isset($_SERVER['HTTP_POSTMAN_TOKEN'])){
        var_dump('success');
    }

    return Response()->json($result,200);
}

function success(){

  $result = [
    'status' => true,
    'code' => '',
    'message' => 'success'
  ];

  if (isset($_SERVER['HTTP_POSTMAN_TOKEN'])){
    var_dump('success');
  }

  return Response()->json($result,200);
}