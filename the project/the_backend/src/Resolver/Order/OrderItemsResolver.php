<?php

namespace App\Resolver\Order;

use App\Model\Order\OrderItems;

class OrderItemsResolver
{
    private $OrderItemsModel;
    private $name;
    private $amount;
    private $order_id;

    public function __construct($name, $amount, $order_id)
    {
        $this->OrderItemsModel = new OrderItems();
        $this->name = $name;
        $this->amount = $amount;
        $this->order_id = $order_id;
    }

    public function resolve()
    {
        $this->OrderItemsModel->insertOrderItems($this->name, $this->amount, $this->order_id);
    }
}
