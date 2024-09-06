<?php

namespace App\Resolver\Product;

use App\Model\Product\ClothesProduct;

class ClothesProductResolver
{
    private $clothesProductModel;
    private $product_id;

    public function __construct($product_id)
    {
        $this->clothesProductModel = new ClothesProduct();
        $this->product_id = $product_id;
    }

    public function resolve()
    {
        return $this->clothesProductModel->getProduct($this->product_id);
    }
}
