<?php

use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Exception\HttpNotFoundException;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$app->options('/{routes:.+}', function ($request, $response) {
  return $response;
});

$app->add(function ($request, $handler) {
  $response = $handler->handle($request);
  return $response
    ->withHeader('Access-Control-Allow-Origin', '*')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function (Request $request, Response $response, array $args): Response {
  $domain = 'https://api.boardgameatlas.com';
  $path = '/' . $args['routes'];
  $query = '?' . $request->getUri()->getQuery();
  $method = $request->getMethod();

  $client = new Client(['verify' => false, 'http_errors' => false]);
  $gbRequest = new \GuzzleHttp\Psr7\Request($method, $domain .$path . $query);

  return $client->send($gbRequest);
});
$app->run();
