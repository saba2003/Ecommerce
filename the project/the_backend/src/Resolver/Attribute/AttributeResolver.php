<?php

namespace App\Resolver\Attribute;

use App\Model\Attribute\Attribute;

class AttributeResolver
{
    private $attributeModel;
    private $attribute_id;

    public function __construct($attribute_id)
    {
        $this->attributeModel = new Attribute();
        $this->attribute_id = $attribute_id;
    }

    public function resolve()
    {
        return $this->attributeModel->getProductAttributes($this->attribute_id);
    }
}
