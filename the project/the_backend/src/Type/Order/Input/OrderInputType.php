<?php

namespace App\Type\Order\Input;


use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class OrderInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderInput',
            'fields' => [
                'item_count' => Type::nonNull(Type::int()),
                'total' => Type::nonNull(Type::string()),
                'order_items' => Type::listOf(new OrderItemsInputType()),
            ],
        ]);
    }
}