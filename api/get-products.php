<?php
require_once(__DIR__ . "/../includes/db.php");

$sql = "SELECT * FROM products WHERE status IS NULL OR status = 'active'";
$result = $conn->query($sql);

$products = [];

while ($row = $result->fetch_assoc()) {

    $product_id = $row['id'];

    // Ingredients
    $ingredients = [];
    $ing_result = $conn->query("SELECT ingredient FROM product_ingredients WHERE product_id = $product_id");
    while ($ing = $ing_result->fetch_assoc()) {
        $ingredients[] = $ing['ingredient'];
    }

    // Best For
    $bestFor = [];
    $bf_result = $conn->query("SELECT skin_type FROM product_bestfor WHERE product_id = $product_id");
    while ($bf = $bf_result->fetch_assoc()) {
        $bestFor[] = $bf['skin_type'];
    }

    // Concerns
    $concerns = [];
    $con_result = $conn->query("SELECT concern FROM product_concerns WHERE product_id = $product_id");
    while ($con = $con_result->fetch_assoc()) {
        $concerns[] = $con['concern'];
    }

    // Treatments
    $treatments = [];
    $tr_result = $conn->query("SELECT treatment FROM product_treatments WHERE product_id = $product_id");
    while ($tr = $tr_result->fetch_assoc()) {
        $treatments[] = $tr['treatment'];
    }

    $products[] = [
        "slug" => $row['slug'],
        "title" => $row['title'],
        "description" => $row['description'],
        "image" => $row['image'],
        "size" => $row['size'],
        "price" => $row['price'],
        "ingredients" => $ingredients,
        "bestFor" => $bestFor,
        "concerns" => $concerns,
        "treatments" => $treatments
    ];
}

echo json_encode($products);
?>