<?php
session_start();
include '../includes/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($order = $result->fetch_assoc()) {
    // Get order items
    $stmt2 = $conn->prepare("SELECT * FROM order_items WHERE order_id = ?");
    $stmt2->bind_param("i", $order['id']);
    $stmt2->execute();
    $items = $stmt2->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt2->close();

    $order['items'] = $items;
    $orders[] = $order;
}
$stmt->close();

echo json_encode(['success' => true, 'orders' => $orders]);