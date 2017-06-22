<?php

function json($result){
    if (isset($_SERVER['HTTP_POSTMAN_TOKEN'])){
        dump($result);
    }
    return Response()->json($result);
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