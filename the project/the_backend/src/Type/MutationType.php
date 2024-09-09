<?php

namespace App\Type;

use App\Type\Order\Input\OrderInputType;
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
                        $order_items = $args['input']['order_items'];

                        // Insert the main order using OrderResolver
                        $orderResolver = new OrderResolver($item_count, $total);
                        $order_id = $orderResolver->resolve();

                        // Loop through each order item and insert
                        foreach ($order_items as $item) {
                            $item_name = $item['item_name'];
                            $item_amount = $item['item_amount'];

                            // Insert the order item using OrderItemsResolver
                            $orderItemsResolver = new OrderItemsResolver($item_name, $item_amount, $order_id);
                            $item_id = $orderItemsResolver->resolve();

                            // If there are attributes, insert them as well
                            if (isset($item['attributes'])) {
                                foreach ($item['attributes'] as $attribute) {
                                    $item_attribute_name = $attribute['item_attribute_name'];
                                    $item_attribute_value = $attribute['item_attribute_value'];

                                    // Insert each attribute using OrderItemAttributesResolver
                                    $orderItemAttributesResolver = new OrderItemAttributesResolver($item_attribute_name, $item_attribute_value, $item_id);
                                    $orderItemAttributesResolver->resolve();
                                }
                            }
                        }

                        // Return the newly inserted product
                        return [
                            'item_count' => $item_count,
                            'total' => $total,
                        ];
                    }
                ],
            ],
        ]);
    }
}