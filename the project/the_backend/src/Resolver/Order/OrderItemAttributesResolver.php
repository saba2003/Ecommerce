<?php

namespace App\Resolver\Order;

use App\Model\Order\OrderItemAttributes;

class OrderItemAttributesResolver
{
    private $OrderItemAttributesModel;
    private $name;
    private $value;
    private $item_id;

    public function __construct($name, $value, $item_id)
    {
        $this->OrderItemAttributesModel = new OrderItemAttributes();
        $this->name = $name;
        $this->value = $value;
        $this->item_id = $item_id;
    }

    public function resolve()
    {
        $this->OrderItemAttributesModel->insertOrderItemAttributes($this->name, $this->value, $this->item_id);
    }
}
