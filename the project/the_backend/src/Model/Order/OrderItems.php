<?php

namespace App\Model\Order;

use App\Model\connectDB;
use PDO;

class OrderItems extends connectDB {
    public function insertOrderItems($name, $amount, $order_id){

        $getLastId = "
            select MAX(item_id) from order_items
        ";

        $statement = $this->connect()->prepare($getLastId);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        $newID = isset($result['max_id']) ? ((int) $result['max_id']) + 1 : 1;

        $insertOrderItemsSQL = "
            INSERT INTO order_items (
                item_id, 
                name, 
                amount, 
                order_id) 
            VALUES (:id , :name, :amount, :order_id)
        ";

        $statement = $this->connect()->prepare($insertOrderItemsSQL);
        $statement->bindParam(':id', $newID, PDO::PARAM_INT);
        $statement->bindParam(':name', $name, PDO::PARAM_STR);
        $statement->bindParam(':amount', $amount, PDO::PARAM_INT);
        $statement->bindParam(':order_id', $order_id, PDO::PARAM_INT);
        $statement->execute();

        return $newID;
    }
}