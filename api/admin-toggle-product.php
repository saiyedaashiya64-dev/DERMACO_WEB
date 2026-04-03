<?php
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

$input  = json_decode(file_get_contents('php://input'), true);
$id     = trim($input['id']     ?? '');
$status = trim($input['status'] ?? '');

if (empty($id) || !in_array($status, ['active', 'inactive'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

$jsonPath = __DIR__ . '/../products.json';
$products = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : [];

if (!isset($products[$id])) {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
    exit;
}

$products[$id]['status'] = $status;

file_put_contents($jsonPath, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo json_encode(['success' => true, 'message' => $status === 'active' ? 'Product is now visible on store' : 'Product hidden from store']);