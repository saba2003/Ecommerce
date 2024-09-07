<?php

namespace App\Model\Order;

use App\Model\connectDB;
use PDO;

class Order extends connectDB {
    public function insertOrder($item_count, $total){
        $getLastId = "
            select MAX(id) from orders
        ";

        $statement = $this->connect()->prepare($getLastId);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        $newID = isset($result['max_id']) ? ((int) $result['max_id']) + 1 : 1;

        $insertOrderSQL = "
            INSERT INTO orders (id, item_count, total) VALUES (:id, :item_count, :total)
        ";

        $statement = $this->connect()->prepare($insertOrderSQL);
        $statement->bindParam(':id', $newID, PDO::PARAM_INT);
        $statement->bindParam(':item_count', $item_count, PDO::PARAM_INT);
        $statement->bindParam(':total', $total, PDO::PARAM_STR);
        $statement->execute();

        return $newID;
    }
}