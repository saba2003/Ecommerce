<?php

namespace App\Controller;

use App\Type\QueryType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Server\StandardServer;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
        
            $mutationType = new ObjectType([
                'name' => 'Mutation',
                'fields' => [
                    'sum' => [
                        'type' => Type::int(),
                        'args' => [
                            'x' => ['type' => Type::int()],
                            'y' => ['type' => Type::int()],
                        ],
                        'resolve' => static fn ($calc, array $args): int => $args['x'] + $args['y'],
                    ],
                ],
            ]);
        
            // See docs on schema options:
            // https://webonyx.github.io/graphql-php/schema-definition/#configuration-options
            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery(new QueryType())
                ->setMutation($mutationType)
            );

            $server = new StandardServer(['schema' => $schema]);
        
            // $rawInput = file_get_contents('php://input');
            // if ($rawInput === false) {
            //     throw new RuntimeException('Failed to get php://input');
            // }
        
            // $input = json_decode($rawInput, true);
            // $query = $input['query'];
            // $variableValues = $input['variables'] ?? null;
        
            // $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            // $output = $result->toArray();
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