<?php
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$id = isset($input['id']) ? intval($input['id']) : 0;

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
    exit;
}

$jsonPath = __DIR__ . '/../products.json';
$products = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : [];

$filtered = array_values(array_filter($products, function($p) use ($id) {
    return $p['id'] != $id;
}));

if (count($filtered) === count($products)) {
    echo json_encode(['success' => false, 'message' => 'Product not found']);
    exit;
}

file_put_contents($jsonPath, json_encode($filtered, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'message' => 'Product deleted successfully']);