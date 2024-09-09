<?php

namespace App\Type\Order;


use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class OrderType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'item_count' => Type::nonNull(Type::int()),
                'total' => Type::nonNull(Type::string()),
                'order_items' => Type::listOf(new OrderItemsType()),
            ]
        ]);
    }
}