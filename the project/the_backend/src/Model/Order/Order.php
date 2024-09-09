<?php

namespace App\Model\Order;

use App\Model\connectDB;
use Exception;
use PDO;
use PDOException;

class Order extends connectDB {
    public function insertOrder($item_count, $total){
        try {
            // Get the last inserted ID from orders table
            $getLastId = "
                SELECT MAX(id) as max_id FROM orders
            ";
        
            $statement = $this->connect()->prepare($getLastId);
            $statement->execute();
            $result = $statement->fetch(PDO::FETCH_ASSOC);
        
            // Determine new ID, defaulting to 1 if there are no rows
            $newID = isset($result['max_id']) ? ((int) $result['max_id']) + 1 : 1;
        
            // Insert a new order with the calculated ID
            $insertOrderSQL = "
                INSERT INTO orders (id, item_count, total) 
                VALUES (:id, :item_count, :total)
            ";
        
            $statement = $this->connect()->prepare($insertOrderSQL);
            $statement->bindParam(':id', $newID, PDO::PARAM_INT);
            $statement->bindParam(':item_count', $item_count, PDO::PARAM_INT);
            $statement->bindParam(':total', $total, PDO::PARAM_STR);
            $statement->execute();
        
            return $newID;
        
        } catch (PDOException $e) {
            // Handle PDO errors
            echo "Database error: " . $e->getMessage();
        } catch (Exception $e) {
            // Handle general errors
            echo "Error: " . $e->getMessage();
        }
    }
}