<?php

namespace App\Model\Order;

use App\Model\connectDB;
use PDO;

class OrderItemAttributes extends connectDB {
    public function insertOrderItemAttributes($name, $value, $item_id){
        $insertOrderItemAttributesSQL = "
            INSERT INTO order_item_attributes (
                name,
                value,
                item_id) 
            VALUES (:name , :value, :item_id);
        ";

        $statement = $this->connect()->prepare($insertOrderItemAttributesSQL);
        $statement->bindParam(':name', $name, PDO::PARAM_STR);
        $statement->bindParam(':value', $value, PDO::PARAM_STR);
        $statement->bindParam(':item_id', $item_id, PDO::PARAM_STR);
        $statement->execute();
    }
}