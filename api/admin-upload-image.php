<?php
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

header('Content-Type: application/json');

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'No image uploaded or upload error']);
    exit;
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$fileType = mime_content_type($_FILES['image']['tmp_name']);

if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(['success' => false, 'message' => 'Invalid file type. Only JPG, PNG, WEBP, GIF allowed.']);
    exit;
}

$maxSize = 2 * 1024 * 1024; // 2MB
if ($_FILES['image']['size'] > $maxSize) {
    echo json_encode(['success' => false, 'message' => 'File too large. Max 2MB.']);
    exit;
}

$uploadDir = __DIR__ . '/../ASSETS/images/products/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
$filename = 'product_' . time() . '_' . mt_rand(1000, 9999) . '.' . $ext;
$destination = $uploadDir . $filename;

if (!move_uploaded_file($_FILES['image']['tmp_name'], $destination)) {
    echo json_encode(['success' => false, 'message' => 'Failed to save image']);
    exit;
}

echo json_encode([
    'success' => true,
    'filename' => $filename,
    'path' => 'ASSETS/images/products/' . $filename
]);