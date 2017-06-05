<?php

function json($result){
    if (isset($_SERVER['HTTP_POSTMAN_TOKEN'])){
        var_dump($result);
    }
    return Response()->json($result);
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