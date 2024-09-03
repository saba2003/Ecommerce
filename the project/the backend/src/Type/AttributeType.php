<?php

namespace App\Type;

use App\Resolver\Attribute\AttributeItemsResolver;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributeType extends ObjectType
{
    public function __construct()
    {
        $config = [
            'name' => 'Attribute',
            'fields' => function () {
                return [
                    'id' => [
                        'type' => Type::nonNull(Type::id()),
                    ],
                    'name' => [
                        'type' => Type::nonNull(Type::string()),
                    ],
                    'attribute_items' =>[
                        'type' => Type::listOf(new AttributeItemsType()),
                        'resolve'=> function ($attribute, $args): array {
                            $resolver = new AttributeItemsResolver($attribute['id']);
                            return $resolver->resolve();
                        }
                    ] 
                ];
            }
        ];

        parent::__construct($config);
    }
}