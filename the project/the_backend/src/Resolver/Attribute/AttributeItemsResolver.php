<?php

namespace App\Resolver\Attribute;

use App\Model\Attribute\AttributeItems;

class AttributeItemsResolver
{
    private $attributeItemsModel;
    private $attribute_id;

    public function __construct($attribute_id)
    {
        $this->attributeItemsModel = new AttributeItems();
        $this->attribute_id = $attribute_id;
    }

    public function resolve()
    {
        return $this->attributeItemsModel->getAttributesItems($this->attribute_id);
    }
}
