<?php

namespace App\Resolver\Order;

use App\Model\Order\Order;

class OrderResolver
{
    private $OrderModel;
    private $item_count;
    private $total;

    public function __construct($item_count, $total)
    {
        $this->OrderModel = new Order();
        $this->item_count = $item_count;
        $this->total = $total;
    }

    public function resolve()
    {
        return $this->OrderModel->insertOrder($this->item_count, $this->total);
    }
}
