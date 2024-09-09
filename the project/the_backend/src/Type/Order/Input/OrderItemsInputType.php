<?php

namespace App\Type\Order\Input;


use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class OrderItemsInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderItemsInput',
            'fields' => [
                'item_name' => Type::nonNull(Type::string()),
                'item_amount' => Type::nonNull(Type::int()),
                'attributes' => Type::listOf(new OrderAttributesInputType()),
            ],
        ]);
    }
}