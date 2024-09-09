<?php

namespace App\Type\Order;


use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class OrderAttributesType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderAttributes',
            'fields' => [
                'item_attribute_name' => Type::nonNull(Type::string()),
                'item_attribute_value' => Type::nonNull(Type::string()),
            ]
        ]);
    }
}