<?php
session_start();

if (!isset($_SESSION['admin'])) {
    header("Location: login.php");
    exit;
}

include "../includes/db.php";

require '../ASSETS/plugins/phpmailer/src/Exception.php';
require '../ASSETS/plugins/phpmailer/src/PHPMailer.php';
require '../ASSETS/plugins/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete_appointment'])) {
    $id = intval($_POST['id']);
    $conn->query("DELETE FROM appointments WHERE id=$id");
    header("Location: appointments.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_status'])) {
    $id     = intval($_POST['id']);
    $status = $_POST['status'];

    if (in_array($status, ['pending', 'confirmed', 'cancelled'])) {
        $stmt = $conn->prepare("UPDATE appointments SET status=? WHERE id=?");
        $stmt->bind_param("si", $status, $id);
        $stmt->execute();
        $stmt->close();

        $r    = $conn->query("SELECT name, email, treatment FROM appointments WHERE id=$id");
        $appt = $r->fetch_assoc();

        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'YOUR_GMAIL_ADDRESS';
$mail->Password   = 'YOUR_GMAIL_APP_PASSWORD';
            $mail->SMTPSecure = 'tls';
            $mail->Port       = 587;
           $mail->setFrom('YOUR_GMAIL_ADDRESS', 'DermaCo');
            $mail->addAddress($appt['email'], $appt['name']);
            $mail->isHTML(true);
            $mail->Subject = "Your DermaCo Appointment Update";
            $mail->Body    = "
                <h2>Hi {$appt['name']},</h2>
                <p>Your consultation request for <strong>{$appt['treatment']}</strong>
                has been <strong>" . ucfirst($status) . "</strong>.</p>
                " . ($status === 'confirmed'
                    ? "<p>We look forward to seeing you soon!</p>"
                    : "<p>Please contact us if you have any questions.</p>") . "
                <br><p>— The DermaCo Team</p>";
            $mail->send();
        } catch (Exception $e) {}
    }

    header("Location: appointments.php");
    exit;
}

$result = $conn->query("SELECT * FROM appointments ORDER BY created_at DESC");
$total  = $conn->query("SELECT COUNT(*) as c FROM appointments")->fetch_assoc()['c'];
$pending   = $conn->query("SELECT COUNT(*) as c FROM appointments WHERE status='pending'")->fetch_assoc()['c'];
$confirmed = $conn->query("SELECT COUNT(*) as c FROM appointments WHERE status='confirmed'")->fetch_assoc()['c'];
$cancelled = $conn->query("SELECT COUNT(*) as c FROM appointments WHERE status='cancelled'")->fetch_assoc()['c'];
?>
<!DOCTYPE html>
<html>
<head>
    <title>Appointments – DermaCo Admin</title>
    <link rel="stylesheet" href="../ASSETS/plugins/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../ASSETS/css/admin.css">
    <style>
        /* Stats row */
        .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            padding: 0 28px 24px;
        }
        .stat-card {
            background: #fff;
            border-radius: 10px;
            padding: 18px 20px;
            border: 1px solid #efefef;
            border-top: 3px solid #f4b400;
        }
        .stat-card.green  { border-top-color: #28a745; }
        .stat-card.red    { border-top-color: #dc3545; }
        .stat-card.yellow { border-top-color: #f4b400; }
        .stat-card .s-label {
            font-size: 0.72rem; color: #999;
            text-transform: uppercase; letter-spacing: 0.5px;
            display: block; margin-bottom: 8px;
        }
        .stat-card .s-number {
            font-size: 1.8rem; font-weight: 700;
            color: #1a1a1a; line-height: 1; display: block;
        }

        /* Table wrapper */
        .table-wrap {
            margin: 0 28px;
            background: #fff;
            border-radius: 10px;
            border: 1px solid #efefef;
            overflow: hidden;
        }
        .table-head-row {
            display: flex; justify-content: space-between;
            align-items: center; padding: 14px 18px;
            border-bottom: 1px solid #f0f0f0;
        }
        .table-head-row span { font-weight: 700; font-size: 0.95rem; }
        .count-pill {
            background: #f4b400; color: #000;
            font-size: 0.72rem; font-weight: 700;
            padding: 2px 8px; border-radius: 20px; margin-left: 6px;
        }

        /* Table */
        .appt-table { width: 100%; border-collapse: collapse; }
        .appt-table th {
            background: #1a1a1a; color: #f4b400;
            padding: 11px 14px; text-align: left;
            font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .appt-table td {
            padding: 11px 14px; border-bottom: 1px solid #f3f3f3;
            vertical-align: middle; font-size: 0.88rem; color: #333;
        }
        .appt-table tr:last-child td { border-bottom: none; }
        .appt-table tr:hover td { background: #fafafa; }

        /* Status badges */
        .badge-pending   { background: #fff3cd; color: #856404; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .badge-confirmed { background: #d4edda; color: #155724; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }
        .badge-cancelled { background: #f8d7da; color: #721c24; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; }

        /* Action area */
        .action-wrap { display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
        .status-select {
            border: 1px solid #ddd; border-radius: 6px;
            padding: 5px 8px; font-size: 0.8rem; outline: none;
            background: #fff; cursor: pointer;
        }
        .status-select:focus { border-color: #f4b400; }
        .btn-update {
            background: #f4b400; color: #000; border: none;
            border-radius: 5px; padding: 5px 12px;
            font-size: 0.8rem; font-weight: 700; cursor: pointer;
        }
        .btn-update:hover { background: #e0a800; }
        .btn-delete {
            background: #1a1a1a; color: #fff; border: none;
            border-radius: 5px; padding: 5px 12px;
            font-size: 0.8rem; cursor: pointer;
        }
        .btn-delete:hover { background: #dc3545; }

        /* Truncate long message */
        .msg-cell {
            max-width: 140px; white-space: nowrap;
            overflow: hidden; text-overflow: ellipsis;
            color: #888; font-size: 0.82rem;
        }
    </style>
</head>
<body>

<div class="admin-sidebar">
    <h3>DermaCo</h3>
    <a href="dashboard.php">Dashboard</a>
    <a href="appointments.php" style="background:#242424; color:#f4b400; border-left:3px solid #f4b400; font-weight:600;">Appointments</a>
    <a href="products.php">Products</a>
    <a href="logout.php">Logout</a>
</div>

<div class="admin-main">

    <div class="admin-topbar">
        <h2>Consultation Requests</h2>
        <a href="logout.php" class="btn-admin">Logout</a>
    </div>

    <!-- Stats -->
    <div class="stats-row">
        <div class="stat-card yellow">
            <span class="s-label">Total</span>
            <span class="s-number"><?= $total ?></span>
        </div>
        <div class="stat-card yellow">
            <span class="s-label">Pending</span>
            <span class="s-number" style="color:#856404"><?= $pending ?></span>
        </div>
        <div class="stat-card green">
            <span class="s-label">Confirmed</span>
            <span class="s-number" style="color:#155724"><?= $confirmed ?></span>
        </div>
        <div class="stat-card red">
            <span class="s-label">Cancelled</span>
            <span class="s-number" style="color:#721c24"><?= $cancelled ?></span>
        </div>
    </div>

    <!-- Table -->
    <div class="table-wrap">
        <div class="table-head-row">
            <span>All Appointments <span class="count-pill"><?= $total ?></span></span>
        </div>
        <div style="overflow-x:auto">
            <table class="appt-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Treatment</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <?php while ($row = $result->fetch_assoc()) {
                    $badgeClass = 'badge-' . $row['status'];
                ?>
                    <tr>
                        <td style="color:#aaa">#<?= $row['id'] ?></td>
                        <td><strong><?= htmlspecialchars($row['name']) ?></strong></td>
                        <td style="font-size:0.82rem;color:#555"><?= htmlspecialchars($row['email']) ?></td>
                        <td><?= htmlspecialchars($row['phone']) ?></td>
                        <td><?= htmlspecialchars($row['treatment']) ?></td>
                        <td class="msg-cell" title="<?= htmlspecialchars($row['message']) ?>">
                            <?= htmlspecialchars($row['message']) ?>
                        </td>
                        <td style="font-size:0.82rem;color:#888;white-space:nowrap"><?= $row['created_at'] ?></td>
                        <td><span class="<?= $badgeClass ?>"><?= ucfirst($row['status']) ?></span></td>
                        <td>
                            <div class="action-wrap">
                                <form method="POST" style="display:contents">
                                    <input type="hidden" name="id" value="<?= $row['id'] ?>">
                                    <input type="hidden" name="update_status" value="1">
                                    <select name="status" class="status-select">
                                        <option value="pending"   <?= $row['status']==='pending'   ? 'selected':'' ?>>Pending</option>
                                        <option value="confirmed" <?= $row['status']==='confirmed' ? 'selected':'' ?>>Confirmed</option>
                                        <option value="cancelled" <?= $row['status']==='cancelled' ? 'selected':'' ?>>Cancelled</option>
                                    </select>
                                    <button type="submit" class="btn-update">Update</button>
                                </form>
                                <form method="POST" style="display:contents" onsubmit="return confirm('Delete this appointment?')">
                                    <input type="hidden" name="id" value="<?= $row['id'] ?>">
                                    <input type="hidden" name="delete_appointment" value="1">
                                    <button type="submit" class="btn-delete">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                <?php } ?>
                </tbody>
            </table>
        </div>
    </div>

</div>
</body>
</html>