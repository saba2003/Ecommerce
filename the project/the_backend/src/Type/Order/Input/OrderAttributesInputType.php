<?php

namespace App\Type\Order\Input;


use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\InputObjectType;

class OrderAttributesInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderAttributesInput',
            'fields' => [
                'item_attribute_name' => Type::nonNull(Type::string()),
                'item_attribute_value' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}