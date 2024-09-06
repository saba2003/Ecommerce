<?php

namespace App\Model\Product;

use App\Model\connectDB;
use PDO;

class Product extends connectDB {
    public function getProduct($product_id){
        $getProductSQL = "
            SELECT 
                p.id as id, 
                p.name as name, 
                p.description as description,
                p.brand as brand,
                pr.currency_symbol as currency_symbol,
                pr.amount as amount
            FROM products p 
            LEFT JOIN prices pr ON p.id = pr.product_id
            WHERE p.id = :id
        ";

        $statement = $this->connect()->prepare($getProductSQL);
        $statement->bindParam(':id', $product_id, PDO::PARAM_STR);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}