<?php

namespace App\Resolver\Product;

use App\Model\Product\Gallery;

class GalleryResolver
{
    private $GalleryModel;
    private $product_id;

    public function __construct($product_id)
    {
        $this->GalleryModel = new Gallery();
        $this->product_id = $product_id;
    }

    public function resolve()
    {
        return $this->GalleryModel->getGallery($this->product_id);
    }
}
