<?php

namespace App\Controller;

use App\Type\MutationType;
use App\Type\QueryType;
use GraphQL\Server\StandardServer;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery(new QueryType())
                ->setMutation(new MutationType())
            );

            $server = new StandardServer(['schema' => $schema]);

        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
            return json_encode($output);

        }

        header('Content-Type: application/json; charset=UTF-8');
        return $server->handleRequest();
    }
}