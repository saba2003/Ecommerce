<?php

namespace App\Resolver\Product;

use App\Model\Product\TechProduct;

class TechProductResolver
{
    private $techProductModel;
    private $product_id;

    public function __construct($product_id)
    {
        $this->techProductModel = new TechProduct();
        $this->product_id = $product_id;
    }

    public function resolve()
    {
        return $this->techProductModel->getProduct($this->product_id);
    }
}
