<?php

namespace App\Type\Order;


use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class OrderItemsType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItems',
            'fields' => [
                'item_name' => Type::nonNull(Type::string()),
                'item_amount' => Type::nonNull(Type::int()),
                'attributes' => Type::listOf(new OrderAttributesType()),
            ]
        ]);
    }
}