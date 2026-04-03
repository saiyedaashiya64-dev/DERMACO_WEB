<?php
session_start();
include '../includes/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id    = $_SESSION['user_id'];
$product_id = $_POST['product_id'] ?? '';

$stmt = $conn->prepare("DELETE FROM wishlist WHERE user_id = ? AND product_id = ?");
$stmt->bind_param("is", $user_id, $product_id);
$stmt->execute();
$stmt->close();

echo json_encode(['success' => true, 'message' => 'Removed from wishlist']);