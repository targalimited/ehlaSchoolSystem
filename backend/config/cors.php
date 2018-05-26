<?php

return [
    /*
     |--------------------------------------------------------------------------
     | Laravel CORS
     |--------------------------------------------------------------------------
     |
     | allowedOrigins, allowedHeaders and allowedMethods can be set to array('*')
     | to accept any value.
     |
     */
    'supportsCredentials' => true,
     'allowedOrigins' => ['http://school-system-frontend.ap-southeast-1.elasticbeanstalk.com','http://school-system-backend.ap-southeast-1.elasticbeanstalk.com','http://localhost:3000','http://schoolsystem.com','http://www.schoolsystem.com'],
    //'allowedOrigins' => ['*'],
    'allowedHeaders' => ['*'],
    'allowedMethods' => ['*'],
    'exposedHeaders' => [],
    'maxAge' => 0,
];

