<?php
session_start();
include '../includes/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id       = $_SESSION['user_id'];
$product_id    = $_POST['product_id'] ?? '';
$product_name  = $_POST['product_name'] ?? '';
$product_price = floatval($_POST['product_price'] ?? 0);
$product_image = $_POST['product_image'] ?? '';

if (!$product_id || !$product_name || !$product_price) {
    echo json_encode(['success' => false, 'message' => 'Missing product data']);
    exit;
}

$stmt = $conn->prepare("
    INSERT IGNORE INTO wishlist (user_id, product_id, product_name, product_price, product_image)
    VALUES (?, ?, ?, ?, ?)
");
$stmt->bind_param("issds", $user_id, $product_id, $product_name, $product_price, $product_image);
$stmt->execute();
$stmt->close();

echo json_encode(['success' => true, 'message' => 'Added to wishlist']);