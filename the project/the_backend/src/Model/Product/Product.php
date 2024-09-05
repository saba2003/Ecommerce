<?php

namespace App\Model\Product;

use App\Model\connectDB;

abstract class Product extends connectDB {
    abstract public function getProduct($product_id);
}