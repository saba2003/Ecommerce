<?php

namespace App\Resolver\Category;

use App\Model\Category\TechCategory;

class TechCategoryResolver
{
    protected $techCategoryModel;

    public function __construct()
    {
        $this->techCategoryModel = new TechCategory();
    }

    public function resolve()
    {
        return $this->techCategoryModel->getProducts();
    }
}
