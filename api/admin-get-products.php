<?php
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$jsonPath = __DIR__ . '/../products.json';

if (!file_exists($jsonPath)) {
    echo json_encode(['success' => false, 'message' => 'products.json not found']);
    exit;
}

$raw      = json_decode(file_get_contents($jsonPath), true);
$products = [];

foreach ($raw as $key => $p) {
    // Inject slug from object key if not present
    if (empty($p['slug'])) {
        $p['slug'] = $key;
    }
    // Default status to active if missing
    if (empty($p['status'])) {
        $p['status'] = 'active';
    }
    // Normalize bestFor -> bestfor
    if (isset($p['bestFor']) && !isset($p['bestfor'])) {
        $p['bestfor'] = $p['bestFor'];
        unset($p['bestFor']);
    }
    // Strip leading slash from image path so BASE prefix works cleanly
    if (!empty($p['image'])) {
        $p['image'] = ltrim($p['image'], '/');
    }
    $products[] = $p;
}

echo json_encode(['success' => true, 'products' => $products]);