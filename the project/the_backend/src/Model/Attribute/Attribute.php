<?php

namespace App\Model\Attribute;

use App\Model\connectDB;
use PDO;

class Attribute extends connectDB {
    public function getProductAttributes($product_id){
        $getProductSQL = "
            select 
                a.id as id,
                a.name,
                a.type
            from attributes a 
            where a.product_id = :id
        ";

        $statement = $this->connect()->prepare($getProductSQL);
        $statement->bindParam(':id', $product_id, PDO::PARAM_STR);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}