<?php
session_start();
include '../includes/db.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id         = $_SESSION['user_id'];
$current         = $_POST['current_password'] ?? '';
$new_pass        = $_POST['new_password'] ?? '';
$confirm         = $_POST['confirm_password'] ?? '';

if (!$current || !$new_pass || !$confirm) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

if ($new_pass !== $confirm) {
    echo json_encode(['success' => false, 'message' => 'New passwords do not match.']);
    exit;
}

if (strlen($new_pass) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters.']);
    exit;
}

$stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!password_verify($current, $user['password'])) {
    echo json_encode(['success' => false, 'message' => 'Current password is incorrect.']);
    exit;
}

$hashed = password_hash($new_pass, PASSWORD_DEFAULT);
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
$stmt->bind_param("si", $hashed, $user_id);
$stmt->execute();
$stmt->close();

echo json_encode(['success' => true, 'message' => 'Password updated successfully!']);