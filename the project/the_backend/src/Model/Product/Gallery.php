<?php

namespace App\Model\Product;

use App\Model\connectDB;
use PDO;

class Gallery extends connectDB {
    public function getGallery($product_id){
        $getGallerySQL = "
            select 
                product_id, 
                url
            from galleries
            where product_id = :id
        ";
        
        $statement = $this->connect()->prepare($getGallerySQL);
        $statement->bindParam(':id', $product_id, PDO::PARAM_STR);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
        // $product_urls = [];

        // foreach ($rows as $row) {
        //     $product_id = $row['product_id'];
        //     $image_url = $row['url'];
            
        //     if (!isset($product_urls[$product_id])) {
        //         $product_urls[$product_id] = [];
        //     }
            
        //     $product_urls[$product_id][] = $image_url;
        // }

        // return $statement->$product_urls;
    }
}