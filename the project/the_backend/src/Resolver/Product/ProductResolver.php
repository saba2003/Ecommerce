<?php

namespace App\Resolver\Product;

use App\Model\Product\Product;

class ProductResolver
{
    private $ProductModel;
    private $product_id;

    public function __construct($product_id)
    {
        $this->ProductModel = new Product();
        $this->product_id = $product_id;
    }

    public function resolve()
    {
        return $this->ProductModel->getProduct($this->product_id);
    }
}
