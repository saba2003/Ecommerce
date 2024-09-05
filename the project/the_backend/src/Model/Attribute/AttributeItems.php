<?php

namespace App\Model\Attribute;

use App\Model\connectDB;
use PDO;

class AttributeItems extends connectDB{
    
    public function getAttributesItems($attribute_id){
        $getProductSQL = "
            select
                ai.displayValue, 
                ai.value
            from attributes a left join attribute_items ai
            on a.id = ai.attribute_id 
            where ai.attribute_id = :id
        ";

        $statement = $this->connect()->prepare($getProductSQL);
        $statement->bindParam(':id', $attribute_id, PDO::PARAM_STR);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}