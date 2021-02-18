<?php

use Illuminate\Database\Capsule\Manager;

$capsule = new Manager;

  
$is_development = @file_get_contents('development')!==false;

$database = !$is_development?'sql10393817':'phpcrud';
$username = !$is_development?'sql10393817':'root';
$password = !$is_development?'FeWCITfUUr':'root';
$host =     !$is_development?'sql10.freemysqlhosting.net':'db';

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

