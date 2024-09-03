<?php

namespace App\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

use App\Resolver\Category\AllCategoryResolver;
use App\Resolver\Category\ClothesCategoryResolver;
use App\Resolver\Category\TechCategoryResolver;
use App\Resolver\Product\TechProductResolver;
use App\Resolver\Product\ClothesProductResolver;
use App\Type\CategoryType;

class QueryType extends ObjectType {
    public function __construct(){
        $categoryType = new CategoryType();
        $productType = new ProductType();
        parent::__construct([
            'name' => 'Query',
            'fields' =>[
                'allCategory' => [
                'type' => Type::listOf($categoryType),
                'resolve' => [new AllCategoryResolver(), 'resolve'],
                ],
                'techCategory' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => [new TechCategoryResolver(), 'resolve'],
                ],
                'clothesCategory' => [
                    'type' => Type::listOf($categoryType),
                    'resolve' => [new ClothesCategoryResolver(), 'resolve'],
                ],
                'techProduct' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::id())],
                    ],
                    'resolve' => function ($rootValue, $args): array {
                        $resolver = new TechProductResolver($args['id']);
                        return $resolver->resolve();
                    }
                ],
                'clothesProduct' => [
                    'type' => Type::listOf($productType),
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::id())],
                    ],
                    'resolve' => function ($rootValue, $args): array {
                        $resolver = new ClothesProductResolver($args['id']);
                        return $resolver->resolve();
                    }
                ],
            ],
        ]);
    }
}