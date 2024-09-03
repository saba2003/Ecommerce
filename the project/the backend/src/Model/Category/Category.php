<?php

namespace App\Model\Category;

use App\Model\connectDB;

abstract class Category extends connectDB{
    abstract public function getProducts();
}