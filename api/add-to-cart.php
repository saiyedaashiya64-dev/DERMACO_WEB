<?php
session_start();
include '../includes/db.php';

header('Content-Type: application/json');

// Must be logged in
if (!isset($_SESSION['user_name'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id = $_SESSION['user_id'];

$product_id    = $_POST['product_id'] ?? '';
$product_name  = $_POST['product_name'] ?? '';
$product_price = floatval($_POST['product_price'] ?? 0);
$product_image = $_POST['product_image'] ?? '';

if (!$product_id || !$product_name || !$product_price) {
    echo json_encode(['success' => false, 'message' => 'Missing product data']);
    exit;
}

// Insert or increment quantity
$stmt = $conn->prepare("
    INSERT INTO cart (user_id, product_id, product_name, product_price, product_image, quantity)
    VALUES (?, ?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE quantity = quantity + 1
");
$stmt->bind_param("issds", $user_id, $product_id, $product_name, $product_price, $product_image);
$stmt->execute();
$stmt->close();

echo json_encode(['success' => true, 'message' => 'Added to cart']);