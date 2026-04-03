<?php
session_start();

if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}

include "../includes/db.php";

$appointments = $conn->query("SELECT COUNT(*) as total FROM appointments")->fetch_assoc();
$jsonPath     = __DIR__ . '/../products.json';
$productsArr  = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : [];
$productCount = count($productsArr);
$pending      = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE status='pending'")->fetch_assoc();
$confirmed    = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE status='confirmed'")->fetch_assoc();
$cancelled    = $conn->query("SELECT COUNT(*) as total FROM appointments WHERE status='cancelled'")->fetch_assoc();
$totalOrders  = $conn->query("SELECT COUNT(*) as total FROM orders")->fetch_assoc();
$pendingOrders= $conn->query("SELECT COUNT(*) as total FROM orders WHERE status='pending'")->fetch_assoc();
$revenue      = $conn->query("SELECT SUM(total) as r FROM orders WHERE status != 'cancelled'")->fetch_assoc();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard – DermaCo Admin</title>
    <link rel="stylesheet" href="../ASSETS/plugins/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../ASSETS/css/admin.css">
    <style>
        .dash-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; padding:0 28px 28px; }
        .dash-card { background:#fff; border-radius:10px; border:1px solid #efefef; border-top:3px solid #f4b400; padding:22px 20px; }
        .dash-card.green  { border-top-color: #28a745; }
        .dash-card.red    { border-top-color: #dc3545; }
        .dash-card.blue   { border-top-color: #007bff; }
        .dash-card.yellow { border-top-color: #f4b400; }
        .dash-card .dc-label  { font-size:0.72rem; color:#999; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:10px; }
        .dash-card .dc-number { font-size:2.2rem; font-weight:700; color:#1a1a1a; line-height:1; display:block; margin-bottom:16px; }
        .dash-card .dc-sub    { font-size:0.75rem; color:#bbb; display:block; margin-top:-10px; margin-bottom:14px; }
        .dash-card.yellow .dc-number { color:#856404; }
        .dash-card.green  .dc-number { color:#155724; }
        .dash-card.red    .dc-number { color:#721c24; }
        .dash-card.blue   .dc-number { color:#004085; }
        .section-label { font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#aaa; padding:0 28px 12px; display:block; }
        .divider { border:none; border-top:1px solid #efefef; margin:4px 28px 20px; }
    </style>
</head>
<body>

<div class="admin-sidebar">
    <h3>DermaCo</h3>
    <a href="dashboard.php" style="background:#242424;color:#f4b400;border-left:3px solid #f4b400;font-weight:600;">Dashboard</a>
    <a href="appointments.php">Appointments</a>
    <a href="products.php">Products</a>
    <a href="orders.php">Orders</a>
    <a href="logout.php">Logout</a>
</div>

<div class="admin-main">

    <div class="admin-topbar">
        <h2>Dashboard</h2>
        <a href="logout.php" class="btn-admin">Logout</a>
    </div>

    <span class="section-label">Overview</span>
    <div class="dash-grid">
        <div class="dash-card">
            <span class="dc-label">Total Appointments</span>
            <span class="dc-number" style="color:#1a1a1a"><?= $appointments['total'] ?></span>
            <a href="appointments.php" class="btn-admin">View All</a>
        </div>
        <div class="dash-card">
            <span class="dc-label">Total Products</span>
            <span class="dc-number" style="color:#1a1a1a"><?= $productCount ?></span>
            <a href="products.php" class="btn-admin">Manage</a>
        </div>
        <div class="dash-card blue">
            <span class="dc-label">Total Orders</span>
            <span class="dc-number"><?= $totalOrders['total'] ?></span>
            <span class="dc-sub">&#8377;<?= number_format($revenue['r'] ?? 0, 2) ?> revenue</span>
            <a href="orders.php" class="btn-admin">View Orders</a>
        </div>
        <div class="dash-card yellow">
            <span class="dc-label">Pending Orders</span>
            <span class="dc-number"><?= $pendingOrders['total'] ?></span>
            <a href="orders.php" class="btn-admin">View</a>
        </div>
    </div>

    <hr class="divider">

    <span class="section-label">Appointment Status</span>
    <div class="dash-grid">
        <div class="dash-card yellow">
            <span class="dc-label">Pending</span>
            <span class="dc-number"><?= $pending['total'] ?></span>
            <a href="appointments.php" class="btn-admin">View</a>
        </div>
        <div class="dash-card green">
            <span class="dc-label">Confirmed</span>
            <span class="dc-number"><?= $confirmed['total'] ?></span>
            <a href="appointments.php" class="btn-admin">View</a>
        </div>
        <div class="dash-card red">
            <span class="dc-label">Cancelled</span>
            <span class="dc-number"><?= $cancelled['total'] ?></span>
            <a href="appointments.php" class="btn-admin">View</a>
        </div>
    </div>

</div>
</body>
</html>