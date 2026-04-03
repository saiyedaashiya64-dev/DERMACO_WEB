<?php
session_start();
include '../includes/db.php';

require '../ASSETS/plugins/phpmailer/src/Exception.php';
require '../ASSETS/plugins/phpmailer/src/PHPMailer.php';
require '../ASSETS/plugins/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'login_required']);
    exit;
}

$user_id = $_SESSION['user_id'];
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$address = trim($_POST['address'] ?? '');
$city    = trim($_POST['city']    ?? '');
$pincode = trim($_POST['pincode'] ?? '');

if (!$name || !$email || !$phone || !$address || !$city || !$pincode) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit;
}

// Get cart items
$stmt = $conn->prepare("SELECT * FROM cart WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$items = [];
$subtotal = 0;
while ($row = $result->fetch_assoc()) {
    $items[] = $row;
    $subtotal += $row['product_price'] * $row['quantity'];
}
$stmt->close();

if (empty($items)) {
    echo json_encode(['success' => false, 'message' => 'Your cart is empty.']);
    exit;
}

$delivery = $subtotal >= 399 ? 0 : 50;
$total    = $subtotal + $delivery;

// Insert order
$stmt = $conn->prepare("
    INSERT INTO orders (user_id, name, email, phone, address, city, payment_method, total, status)
    VALUES (?, ?, ?, ?, ?, ?, 'COD', ?, 'pending')
");
$stmt->bind_param("isssssd", $user_id, $name, $email, $phone, $address, $city, $total);
$stmt->execute();
$order_id = $stmt->insert_id;
$stmt->close();

// Insert order items
foreach ($items as $item) {
    $stmt = $conn->prepare("
        INSERT INTO order_items (order_id, product_id, product_name, product_price, product_image, quantity)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("issdsi", $order_id, $item['product_id'], $item['product_name'], $item['product_price'], $item['product_image'], $item['quantity']);
    $stmt->execute();
    $stmt->close();
}

// Clear cart
$stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->close();

// Send confirmation email
$itemsHtml = "";
foreach ($items as $item) {
    $itemsHtml .= "
    <tr>
        <td style='padding:8px; border-bottom:1px solid #f0f0f0'>{$item['product_name']}</td>
        <td style='padding:8px; border-bottom:1px solid #f0f0f0; text-align:center'>{$item['quantity']}</td>
        <td style='padding:8px; border-bottom:1px solid #f0f0f0; text-align:right'>₹" . number_format($item['product_price'] * $item['quantity'], 2) . "</td>
    </tr>";
}

$deliveryText = $delivery == 0 ? "FREE" : "₹50";

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'darmaco47@gmail.com';
    $mail->Password   = 'hzzt vwvs beob vnmk';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('darmaco47@gmail.com', 'DermaCo');
    $mail->addAddress($email, $name);
    $mail->isHTML(true);
    $mail->Subject = "Order Confirmed #" . $order_id . " — DermaCo";
    $mail->Body    = "
    <div style='font-family:Arial,sans-serif; max-width:600px; margin:auto; padding:30px; background:#fff'>
      <div style='background:#f4b400; padding:20px; border-radius:12px 12px 0 0; text-align:center'>
        <h1 style='color:#fff; margin:0; font-size:24px'>DermaCo</h1>
      </div>
      <div style='padding:30px; border:1px solid #f0f0f0; border-top:none; border-radius:0 0 12px 12px'>
        <h2 style='color:#222'>Order Confirmed! 🎉</h2>
        <p style='color:#555'>Hi {$name}, your order has been placed successfully.</p>
        <p style='color:#555'><strong>Order ID:</strong> #{$order_id}</p>
        <p style='color:#555'><strong>Payment:</strong> Cash on Delivery</p>
        <p style='color:#555'><strong>Delivery Address:</strong> {$address}, {$city} — {$pincode}</p>

        <table width='100%' style='border-collapse:collapse; margin-top:20px'>
          <thead>
            <tr style='background:#f9f9f9'>
              <th style='padding:10px; text-align:left'>Product</th>
              <th style='padding:10px; text-align:center'>Qty</th>
              <th style='padding:10px; text-align:right'>Price</th>
            </tr>
          </thead>
          <tbody>{$itemsHtml}</tbody>
        </table>

        <div style='margin-top:20px; text-align:right'>
          <p style='color:#555'>Delivery: {$deliveryText}</p>
          <h3 style='color:#f4b400'>Total: ₹" . number_format($total, 2) . "</h3>
        </div>

        <p style='color:#888; font-size:13px; margin-top:30px'>Thank you for shopping with DermaCo! 💛</p>
      </div>
    </div>";

    $mail->send();
} catch (Exception $e) {
    // Email failed but order still placed — don't return error
}

echo json_encode([
    'success'  => true,
    'order_id' => $order_id,
    'items'    => $items,
    'subtotal' => $subtotal,
    'delivery' => $deliveryText,
    'total'    => $total,
    'name'     => $name,
    'address'  => $address,
    'city'     => $city,
    'pincode'  => $pincode
]);