<?php

namespace App\Type;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeItemsType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'attribute_items',
            'fields' => function () {
                return [
                    'displayValue' => [
                        'type' => Type::nonNull(Type::string()),
                    ],
                    'value' => [
                        'type' => Type::nonNull(Type::string()),
                    ]
                ];
            }
        ];

        parent::__construct($config);
    }
}