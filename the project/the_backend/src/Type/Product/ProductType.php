<?php

namespace App\Type\Product;

use App\Type\Attribute\AttributeType;
use App\Resolver\Attribute\AttributeResolver;
use App\Resolver\Product\GalleryResolver;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class ProductType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => [
                    'type' => Type::nonNull(Type::id()),
                ],
                'name' => [
                    'type' => Type::nonNull(Type::string()),
                ],
                'description' => [
                    'type' => Type::string(),
                ],
                'brand' => [
                    'type' => Type::string(),
                ],
                'currency_symbol' => [
                    'type' => Type::nonNull(Type::string()),
                ],
                'amount' => [
                    'type' => Type::nonNull(Type::int()),
                ],
                'stock' => [
                    'type' => Type::nonNull(Type::boolean()),
                ],
                'gallery' => [
                    'type' => Type::listOf(new GalleryType()),
                    'resolve' => function ($product, $args): array {
                        $resolver = new GalleryResolver($product['id']);
                        return $resolver->resolve();
                    }
                ],
                'attribute' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function ($product, $args): array {
                        $resolver = new AttributeResolver($product['id']);
                        return $resolver->resolve();
                    }
                ]
            ]
        ]);
    }
}