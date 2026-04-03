<?php
session_start();
include '../includes/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT * FROM wishlist WHERE user_id = ? ORDER BY created_at DESC");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$items = [];
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}
$stmt->close();

echo json_encode(['success' => true, 'items' => $items]);