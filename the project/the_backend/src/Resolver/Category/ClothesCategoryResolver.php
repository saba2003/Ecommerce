<?php

namespace App\Resolver\Category;

use App\Model\Category\ClothesCategory;

class ClothesCategoryResolver
{
    protected $clothesCategoryModel;

    public function __construct()
    {
        $this->clothesCategoryModel = new ClothesCategory();
    }

    public function resolve()
    {
        return $this->clothesCategoryModel->getProducts();
    }
}
