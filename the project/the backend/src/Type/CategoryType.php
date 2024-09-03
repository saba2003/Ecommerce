<?php

namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class CategoryType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Category',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::id()),
                ],
                'name' => [
                    'type' => Type::nonNull(Type::string()),
                ],
                'image_url' => [
                    'type' => Type::string(),
                ],
                'stock' => [
                    'type' => Type::nonNull(Type::boolean()),
                ],
                'symbol' => [
                    'type' => Type::nonNull(Type::string()),
                ],
                'amount' => [
                    'type' => Type::nonNull(Type::int()),
                ],
            ]
            
        ]);
    }
}
