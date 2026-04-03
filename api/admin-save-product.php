<?php
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

$jsonPath = __DIR__ . '/../products.json';
$products = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : [];

// Helper: parse comma-separated string into array
function parseList($val) {
    if (is_array($val)) return array_values(array_filter(array_map('trim', $val)));
    if (empty($val)) return [];
    return array_values(array_filter(array_map('trim', explode(',', $val))));
}

$isEdit = isset($input['id']) && $input['id'] !== '' && $input['id'] !== null;

// Build product object
$product = [
    'id'          => $isEdit ? $input['id'] : (count($products) > 0 ? max(array_column($products, 'id')) + 1 : 1),
    'slug'        => trim($input['slug'] ?? ''),
    'title'       => trim($input['title'] ?? ''),
    'description' => trim($input['description'] ?? ''),
    'image'       => trim($input['image'] ?? ''),
    'size'        => trim($input['size'] ?? ''),
    'price'       => floatval($input['price'] ?? 0),
    'status'      => $input['status'] ?? 'active',
    'bestfor'     => parseList($input['bestfor'] ?? []),
    'concerns'    => parseList($input['concerns'] ?? []),
    'ingredients' => parseList($input['ingredients'] ?? []),
    'treatments'  => parseList($input['treatments'] ?? []),
];

if (empty($product['title']) || empty($product['slug']) || $product['price'] <= 0) {
    echo json_encode(['success' => false, 'message' => 'Title, slug, and price are required']);
    exit;
}

if ($isEdit) {
    $found = false;
    foreach ($products as $i => $p) {
        if ($p['id'] == $product['id']) {
            $products[$i] = $product;
            $found = true;
            break;
        }
    }
    if (!$found) {
        echo json_encode(['success' => false, 'message' => 'Product not found']);
        exit;
    }
    $message = 'Product updated successfully';
} else {
    $products[] = $product;
    $message = 'Product added successfully';
}

file_put_contents($jsonPath, json_encode($products, JSON_PRETTY_PRINT));
echo json_encode(['success' => true, 'message' => $message, 'product' => $product]);