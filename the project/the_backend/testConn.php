<?php

// $db = 'connectDB.php';
// $sql = file_get_contents('sql/main_page_fetch.sql');
// if (!file_exists($db)) {
//     die('file not found');
// } else require_once $db;


// $objDB = new connectDB;
// $conn = $objDB-> connect();

// $getLastId = "
//                 select MAX(item_id) as max_id from order_items
//             ";


// $statement = $conn->prepare($getLastId);
// $statement->execute();
// $result = $statement->fetch(PDO::FETCH_ASSOC);

// echo $result['max_id'];

$newID = isset($result['max_id']) ? ((int) $result['max_id']) + 1 : 1;

// $category = 'tech';
// $stmt->bindParam(1, $category);

// $stmt->execute();
// $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo json_encode($products);



// use GraphQL\Type\Definition\ObjectType;
// use GraphQL\Type\Definition\Type;

// $productType = new ObjectType([
//     'name' => 'Product',
//     'fields' => [
//         'id' => Type::string(),
//         'name' => Type::string(),
//         'image_url' => Type::string(),
//         'price' => Type::string(),
//     ]
// ]);

// $queryType = new ObjectType([
//     'name' => 'Query',
//     'fields' => [
//         'products' => [
//             'type' => Type::listOf($productType), // Define $productType elsewhere
//             'resolve' => function () {
//                 $db = 'connectDB.php';
//                 $sql = file_get_contents('sql/main_page_fetch.sql');
//                 if (!file_exists($db)) {
//                     die('file not found');
//                 } else require_once $db;


//                 $objDB = new connectDB;
//                 $conn = $objDB-> connect();

//                 $stmt = $conn -> prepare($sql);

//                 $category = 'tech';
//                 $stmt->bindParam(1, $category);

//                 $stmt->execute();
//                 $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
//                 return $products;
//             }
//         ]
//     ]
// ]);
