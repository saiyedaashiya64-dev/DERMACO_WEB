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

if (!$product_id) {
    echo json_encode(['success' => false, 'message' => 'Missing product ID']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ? AND product_id = ?");
$stmt->bind_param("is", $user_id, $product_id);
$stmt->execute();
$stmt->close();

echo json_encode(['success' => true]);