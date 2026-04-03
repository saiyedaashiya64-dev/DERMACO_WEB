<?php
session_start();

if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}

include "../includes/db.php";

// ── Handle Status Update ─────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    $id     = intval($_POST['id']);
    $status = $_POST['status'];
    $allowed = ['pending','processing','shipped','delivered','cancelled'];
    if (in_array($status, $allowed)) {
        $stmt = $conn->prepare("UPDATE orders SET status=? WHERE id=?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        $stmt->close();
    }
    header("Location: orders.php");
    exit;
}

// ── Stats ─────────────────────────────────────────────
$total     = $conn->query("SELECT COUNT(*) as c FROM orders")->fetch_assoc()['c'];
$pending   = $conn->query("SELECT COUNT(*) as c FROM orders WHERE status='pending'")->fetch_assoc()['c'];
$processing= $conn->query("SELECT COUNT(*) as c FROM orders WHERE status='processing'")->fetch_assoc()['c'];
$shipped   = $conn->query("SELECT COUNT(*) as c FROM orders WHERE status='shipped'")->fetch_assoc()['c'];
$delivered = $conn->query("SELECT COUNT(*) as c FROM orders WHERE status='delivered'")->fetch_assoc()['c'];
$cancelled = $conn->query("SELECT COUNT(*) as c FROM orders WHERE status='cancelled'")->fetch_assoc()['c'];
$revenue   = $conn->query("SELECT SUM(total) as r FROM orders WHERE status != 'cancelled'")->fetch_assoc()['r'];

// ── Orders ────────────────────────────────────────────
$orders = $conn->query("SELECT * FROM orders ORDER BY created_at DESC");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Orders – DermaCo Admin</title>
    <link rel="stylesheet" href="../ASSETS/plugins/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../ASSETS/css/admin.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 14px;
            padding: 0 28px 24px;
        }
        .stat-card {
            background: #fff; border-radius: 10px;
            padding: 16px 18px; border: 1px solid #efefef;
            border-top: 3px solid #f4b400;
        }
        .stat-card.green   { border-top-color: #28a745; }
        .stat-card.blue    { border-top-color: #007bff; }
        .stat-card.purple  { border-top-color: #6f42c1; }
        .stat-card.red     { border-top-color: #dc3545; }
        .stat-card.teal    { border-top-color: #20c997; }
        .stat-card .s-label { font-size:0.7rem; color:#999; text-transform:uppercase; letter-spacing:0.5px; display:block; margin-bottom:6px; }
        .stat-card .s-number { font-size:1.6rem; font-weight:700; color:#1a1a1a; line-height:1; display:block; }
        .stat-card .s-sub { font-size:0.72rem; color:#bbb; margin-top:4px; display:block; }

        .table-wrap { margin: 0 28px; background:#fff; border-radius:10px; border:1px solid #efefef; overflow:hidden; }
        .table-head-row { display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-bottom:1px solid #f0f0f0; flex-wrap:wrap; gap:10px; }
        .table-head-row span { font-weight:700; font-size:0.95rem; }
        .count-pill { background:#f4b400; color:#000; font-size:0.72rem; font-weight:700; padding:2px 8px; border-radius:20px; margin-left:6px; }

        .tbl-search { border:1px solid #ddd; border-radius:6px; padding:7px 12px; font-size:0.85rem; outline:none; width:200px; }
        .tbl-search:focus { border-color:#f4b400; }

        .orders-table { width:100%; border-collapse:collapse; }
        .orders-table th { background:#1a1a1a; color:#f4b400; padding:11px 14px; text-align:left; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.5px; }
        .orders-table td { padding:11px 14px; border-bottom:1px solid #f3f3f3; vertical-align:middle; font-size:0.87rem; color:#333; }
        .orders-table tr:last-child td { border-bottom:none; }
        .orders-table tr.order-row:hover td { background:#fafafa; cursor:pointer; }

        /* Status badges */
        .badge-pending    { background:#fff3cd; color:#856404;  padding:3px 10px; border-radius:20px; font-size:0.74rem; font-weight:600; }
        .badge-processing { background:#cce5ff; color:#004085;  padding:3px 10px; border-radius:20px; font-size:0.74rem; font-weight:600; }
        .badge-shipped    { background:#d4edda; color:#155724;  padding:3px 10px; border-radius:20px; font-size:0.74rem; font-weight:600; }
        .badge-delivered  { background:#d1ecf1; color:#0c5460;  padding:3px 10px; border-radius:20px; font-size:0.74rem; font-weight:600; }
        .badge-cancelled  { background:#f8d7da; color:#721c24;  padding:3px 10px; border-radius:20px; font-size:0.74rem; font-weight:600; }
        .badge-cod        { background:#f0f0f0; color:#555; padding:2px 8px; border-radius:20px; font-size:0.72rem; }
        .badge-online     { background:#e8f5e9; color:#2e7d32; padding:2px 8px; border-radius:20px; font-size:0.72rem; }

        /* Status select */
        .status-select { border:1px solid #ddd; border-radius:6px; padding:5px 8px; font-size:0.8rem; outline:none; background:#fff; cursor:pointer; }
        .status-select:focus { border-color:#f4b400; }
        .btn-update { background:#f4b400; color:#000; border:none; border-radius:5px; padding:5px 12px; font-size:0.8rem; font-weight:700; cursor:pointer; margin-left:5px; }
        .btn-update:hover { background:#e0a800; }

        /* Order items expand row */
        .items-row { display:none; background:#fafafa; }
        .items-row.open { display:table-row; }
        .items-row td { padding:0; border-bottom:1px solid #f0f0f0; }
        .items-inner { padding:16px 20px; }
        .items-inner table { width:100%; border-collapse:collapse; }
        .items-inner th { font-size:0.72rem; text-transform:uppercase; color:#999; padding:6px 10px; border-bottom:1px solid #eee; text-align:left; }
        .items-inner td { font-size:0.84rem; color:#444; padding:8px 10px; border-bottom:1px solid #f5f5f5; vertical-align:middle; }
        .items-inner tr:last-child td { border-bottom:none; }
        .item-img { width:38px; height:38px; object-fit:cover; border-radius:6px; border:1px solid #eee; }

        .expand-icon { font-size:0.8rem; color:#aaa; margin-left:6px; transition:0.2s; }
        .order-row.expanded .expand-icon { transform:rotate(180deg); color:#f4b400; }

        .order-total { font-weight:700; color:#1a1a1a; }
        .customer-email { font-size:0.78rem; color:#999; }
    </style>
</head>
<body>

<div class="admin-sidebar">
    <h3>DermaCo</h3>
    <a href="dashboard.php">Dashboard</a>
    <a href="appointments.php">Appointments</a>
    <a href="products.php">Products</a>
    <a href="orders.php" style="background:#242424;color:#f4b400;border-left:3px solid #f4b400;font-weight:600;">Orders</a>
    <a href="logout.php">Logout</a>
</div>

<div class="admin-main">

    <div class="admin-topbar">
        <h2>Orders</h2>
        <a href="logout.php" class="btn-admin">Logout</a>
    </div>

    <!-- Stats -->
    <div class="stats-row">
        <div class="stat-card">
            <span class="s-label">Total Orders</span>
            <span class="s-number"><?= $total ?></span>
            <span class="s-sub">&#8377;<?= number_format($revenue ?? 0, 2) ?> revenue</span>
        </div>
        <div class="stat-card">
            <span class="s-label">Pending</span>
            <span class="s-number" style="color:#856404"><?= $pending ?></span>
        </div>
        <div class="stat-card blue">
            <span class="s-label">Processing</span>
            <span class="s-number" style="color:#004085"><?= $processing ?></span>
        </div>
        <div class="stat-card purple">
            <span class="s-label">Shipped</span>
            <span class="s-number" style="color:#6f42c1"><?= $shipped ?></span>
        </div>
        <div class="stat-card teal">
            <span class="s-label">Delivered</span>
            <span class="s-number" style="color:#0c5460"><?= $delivered ?></span>
        </div>
        <div class="stat-card red">
            <span class="s-label">Cancelled</span>
            <span class="s-number" style="color:#721c24"><?= $cancelled ?></span>
        </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
        <div class="table-head-row">
            <span>All Orders <span class="count-pill"><?= $total ?></span></span>
            <input type="text" id="searchInput" class="tbl-search" placeholder="Search by name, email...">
        </div>
        <div style="overflow-x:auto">
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Payment</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody id="ordersBody">
                <?php while ($row = $orders->fetch_assoc()):
                    $badgeClass = 'badge-' . $row['status'];
                    $payBadge   = $row['payment_method'] === 'cod' ? 'badge-cod' : 'badge-online';
                    $items = $conn->query("SELECT * FROM order_items WHERE order_id=" . $row['id']);
                ?>
                    <!-- Order row -->
                    <tr class="order-row" onclick="toggleItems(<?= $row['id'] ?>, this)">
                        <td>
                            <strong>#<?= $row['id'] ?></strong>
                            <span class="expand-icon">▼</span>
                        </td>
                        <td>
                            <strong><?= htmlspecialchars($row['name']) ?></strong><br>
                            <span class="customer-email"><?= htmlspecialchars($row['email']) ?></span>
                        </td>
                        <td><?= htmlspecialchars($row['phone'] ?? '—') ?></td>
                        <td><?= htmlspecialchars($row['city'] ?? '—') ?></td>
                        <td><span class="<?= $payBadge ?>"><?= strtoupper($row['payment_method'] ?? 'COD') ?></span></td>
                        <td class="order-total">&#8377;<?= number_format($row['total'], 2) ?></td>
                        <td style="font-size:0.8rem;color:#888;white-space:nowrap"><?= date('d M Y', strtotime($row['created_at'])) ?></td>
                        <td><span class="<?= $badgeClass ?>"><?= ucfirst($row['status']) ?></span></td>
                        <td onclick="event.stopPropagation()">
                            <form method="POST" style="display:flex;align-items:center;gap:4px">
                                <input type="hidden" name="id" value="<?= $row['id'] ?>">
                                <input type="hidden" name="update_status" value="1">
                                <select name="status" class="status-select">
                                    <?php foreach(['pending','processing','shipped','delivered','cancelled'] as $s): ?>
                                        <option value="<?= $s ?>" <?= $row['status']===$s?'selected':'' ?>><?= ucfirst($s) ?></option>
                                    <?php endforeach; ?>
                                </select>
                                <button type="submit" class="btn-update">Save</button>
                            </form>
                        </td>
                    </tr>
                    <!-- Items expand row -->
                    <tr class="items-row" id="items-<?= $row['id'] ?>">
                        <td colspan="9">
                            <div class="items-inner">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <?php while ($item = $items->fetch_assoc()): ?>
                                        <tr>
                                            <td><img src="/<?= ltrim($item['product_image'], '/') ?>" class="item-img"
                                                onerror="this.src='https://via.placeholder.com/38x38?text=?'" alt=""></td>
                                            <td><?= htmlspecialchars($item['product_name']) ?></td>
                                            <td>&#8377;<?= number_format($item['product_price'], 2) ?></td>
                                            <td><?= $item['quantity'] ?></td>
                                            <td><strong>&#8377;<?= number_format($item['product_price'] * $item['quantity'], 2) ?></strong></td>
                                        </tr>
                                    <?php endwhile; ?>
                                    </tbody>
                                </table>
                                <div style="margin-top:12px;padding-top:10px;border-top:1px solid #eee;font-size:0.82rem;color:#888">
                                    <strong style="color:#333">Delivery address:</strong>
                                    <?= htmlspecialchars($row['address']) ?>, <?= htmlspecialchars($row['city'] ?? '') ?>
                                </div>
                            </div>
                        </td>
                    </tr>
                <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>

</div>

<script>
function toggleItems(id, row) {
    const itemsRow = document.getElementById('items-' + id);
    const isOpen   = itemsRow.classList.contains('open');
    document.querySelectorAll('.items-row.open').forEach(r => r.classList.remove('open'));
    document.querySelectorAll('.order-row.expanded').forEach(r => r.classList.remove('expanded'));
    if (!isOpen) {
        itemsRow.classList.add('open');
        row.classList.add('expanded');
    }
}

document.getElementById('searchInput').addEventListener('input', function() {
    const q = this.value.toLowerCase();
    document.querySelectorAll('.order-row').forEach(row => {
        const text = row.textContent.toLowerCase();
        const itemsRow = row.nextElementSibling;
        const show = text.includes(q);
        row.style.display = show ? '' : 'none';
        if (itemsRow) itemsRow.style.display = 'none';
    });
});
</script>
</body>
</html>