<?php

use Illuminate\Database\Capsule\Manager;

$capsule = new Manager;

$env = 'development';

$database = $env !== 'development'?'id16186378_phpcrud':'phpcrud';
$username = $env !== 'development'?'id16186378_root':'root';
$password = $env !== 'development'?'\7~yktJb!a>m)oWF':'root';
$host = $env !== 'development'?'localhost':'db';

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => $host ,
    'database'  => $database,
    'username'  => $username,
    'password'  => $password,
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

