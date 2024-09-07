<?php

namespace App\Type;

use App\Type\Order\OrderInputType;
use App\Resolver\Order\OrderItemAttributesResolver;
use App\Resolver\Order\OrderItemsResolver;
use App\Resolver\Order\OrderResolver;
use App\Type\Order\OrderType;
use GraphQL\Type\Definition\ObjectType;

class MutationType extends ObjectType {
    public function __construct(){
        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'PlaceOrder' => [
                    'type' => new OrderType(),
                    'args' => [
                        'input' => [
                            'type' => new OrderInputType()
                        ]
                    ],
                    'resolve' => function ($rootValue, $args) {
                        $item_count = $args['input']['item_count'];
                        $total = $args['input']['total'];
                        $item_name = $args['input']['item_name'];
                        $item_amount = $args['input']['item_amount'];
                        $item_attribute_name = $args['input']['item_attribute_name'];
                        $item_attribute_value = $args['input']['item_attribute_value'];

                        $orderResolver = new OrderResolver($item_count, $total);
                        $order_id = $orderResolver->resolve();
                        // $orderItemsResolver = new OrderItemsResolver($item_name, $item_amount, $order_id);
                        // $item_id = $orderItemsResolver->resolve();
                        // $orderItemAttributesResolver = new OrderItemAttributesResolver($item_attribute_name, $item_attribute_value, $item_id);
                        // $orderItemAttributesResolver->resolve();

                        // Return the newly inserted product
                        return [
                            'id' => $order_id,
                            'item_count' => $item_count,
                            'total' => $total,
                            'item_name' => $item_name,
                            'item_amount' => $item_amount,
                            'item_attribute_name' => $item_attribute_name,
                            'item_attribute_value' => $item_attribute_value,
                        ];
                    }
                ],
            ],
        ]);
    }
}