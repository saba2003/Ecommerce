<?php

namespace App\Model\Category;
use PDO;

class ClothesCategory extends Category {
    public function getProducts(){
        $getProductsSQL= "
            SELECT 
                p.id as id,
                p.name as name,
                MIN(g.url) as image_url, 
                p.inStock as stock, 
                pr.currency_symbol as symbol,
                pr.amount as amount
            FROM products p LEFT JOIN galleries g 
            ON p.id = g.product_id
            LEFT JOIN prices pr
            ON p.id = pr.product_id
            where p.category = 'clothes'
            GROUP BY id, stock, name, symbol, amount;
        ";
        
        $statement = $this->connect()->prepare($getProductsSQL);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
}