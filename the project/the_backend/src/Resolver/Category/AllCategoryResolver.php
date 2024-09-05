<?php

namespace App\Resolver\Category;

use App\Model\Category\AllCategory;

class AllCategoryResolver
{
    protected $allCategoryModel;

    public function __construct()
    {
        $this->allCategoryModel = new AllCategory();
    }

    public function resolve()
    {
        return $this->allCategoryModel->getProducts();
    }
}
