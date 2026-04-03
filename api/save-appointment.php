<?php
header("Content-Type: text/plain");
include "../includes/db.php";

require '../ASSETS/plugins/phpmailer/src/Exception.php';
require '../ASSETS/plugins/phpmailer/src/PHPMailer.php';
require '../ASSETS/plugins/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo "Invalid request";
    exit;
}

$name       = trim($_POST['name'] ?? '');
$email      = trim($_POST['email'] ?? '');
$phone      = trim($_POST['phone'] ?? '');
$treatment  = trim($_POST['treatment'] ?? '');
$message    = trim($_POST['message'] ?? '');
$appointment_date = trim($_POST['appointment_date'] ?? '');
$appointment_time = trim($_POST['appointment_time'] ?? '');

// ── Basic field validation ───────────────────────────────────────────────────
if (!$name || !$email || !$phone) {
    echo "Missing fields";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email address";
    exit;
}

// ── Date & time validation ───────────────────────────────────────────────────
if (!$appointment_date || !strtotime($appointment_date)) {
    echo "Please select a valid appointment date.";
    exit;
}

$today_date = date('Y-m-d');
if ($appointment_date < $today_date) {
    echo "Appointment date cannot be in the past.";
    exit;
}

$dayOfWeek = date('N', strtotime($appointment_date)); // 1=Mon, 7=Sun

if ($dayOfWeek == 7) {
    echo "We are closed on Sundays. Please choose another date.";
    exit;
}

if (!preg_match('/^\d{2}:\d{2}$/', $appointment_time)) {
    echo "Invalid time slot selected.";
    exit;
}

// Validate time is within working hours
$timeInt    = (int) str_replace(':', '', $appointment_time); // e.g. 1030
$endTimeInt = ($dayOfWeek == 6) ? 1700 : 1900;              // Sat = 1700, others = 1900

if ($timeInt < 1000 || $timeInt >= $endTimeInt) {
    echo "Selected time is outside working hours.";
    exit;
}

// ── Rate limiting — max 2 submissions per email per day ──────────────────────
$today = date('Y-m-d');
$check = $conn->prepare("SELECT COUNT(*) as cnt FROM appointments WHERE email = ? AND DATE(created_at) = ?");
$check->bind_param("ss", $email, $today);
$check->execute();
$row = $check->get_result()->fetch_assoc();
if ($row['cnt'] >= 2) {
    echo "You have already submitted 2 requests today. We will contact you soon.";
    exit;
}
$check->close();

// ── Double-booking guard ─────────────────────────────────────────────────────
$slotCheck = $conn->prepare(
    "SELECT COUNT(*) as cnt FROM appointments 
     WHERE appointment_date = ? 
     AND appointment_time = ? 
     AND status != 'cancelled'"
);
$slotCheck->bind_param("ss", $appointment_date, $appointment_time);
$slotCheck->execute();
$slotRow = $slotCheck->get_result()->fetch_assoc();
if ($slotRow['cnt'] > 0) {
    echo "This time slot was just booked by someone else. Please go back and choose another slot.";
    exit;
}
$slotCheck->close();

// ── Insert appointment ───────────────────────────────────────────────────────
$stmt = $conn->prepare(
    "INSERT INTO appointments (name, email, phone, treatment, message, appointment_date, appointment_time, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
);
$stmt->bind_param("sssssss", $name, $email, $phone, $treatment, $message, $appointment_date, $appointment_time);

if (!$stmt->execute()) {
    echo "db error";
    exit;
}

$stmt->close();
$conn->close();

// ── Format date/time for emails ──────────────────────────────────────────────
$formatted_date = date('l, d F Y', strtotime($appointment_date)); // e.g. Monday, 17 March 2026
$formatted_time = date('g:i A', strtotime($appointment_time));    // e.g. 10:30 AM

// ── Email helper ─────────────────────────────────────────────────────────────
function sendMail($to, $toName, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
$mail->Username   = 'YOUR_GMAIL_ADDRESS';
$mail->setFrom('YOUR_GMAIL_ADDRESS', 'DermaCo');

       $mail->Password   = 'YOUR_GMAIL_APP_PASSWORD';
        
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;
        $mail->setFrom('darmaco47@gmail.com', 'DermaCo');
        $mail->addAddress($to, $toName);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->send();
    } catch (Exception $e) {}
}

// ── Email to customer ────────────────────────────────────────────────────────
sendMail(
    $email, $name,
    "Your DermaCo Consultation is Booked!",
    "
    <div style='font-family:Arial,sans-serif; max-width:600px; margin:auto;'>
        <h2 style='color:#c9847a;'>Hi $name! 👋</h2>
        <p>Thank you for booking with <strong>DermaCo</strong>. Here are your appointment details:</p>
        <table style='width:100%; border-collapse:collapse; margin:16px 0;'>
            <tr style='background:#fdf4f3;'>
                <td style='padding:10px; font-weight:bold; width:40%;'>Treatment</td>
                <td style='padding:10px;'>$treatment</td>
            </tr>
            <tr>
                <td style='padding:10px; font-weight:bold;'>Date</td>
                <td style='padding:10px;'>$formatted_date</td>
            </tr>
            <tr style='background:#fdf4f3;'>
                <td style='padding:10px; font-weight:bold;'>Time</td>
                <td style='padding:10px;'>$formatted_time</td>
            </tr>
        </table>
        <p style='color:#888;'>Your appointment is currently <strong>pending confirmation</strong>. 
        We'll send you another email once it's confirmed.</p>
        <br>
        <p>See you soon! 💛<br><strong>— The DermaCo Team</strong></p>
    </div>
    "
);

// ── Email to admin ───────────────────────────────────────────────────────────
sendMail(
    'YOUR_GMAIL_ADDRESS', 'DermaCo Admin',
    "New Booking: $name — $formatted_date at $formatted_time",
    "
    <div style='font-family:Arial,sans-serif; max-width:600px; margin:auto;'>
        <h3 style='color:#c9847a;'>New Appointment Received</h3>
        <table style='width:100%; border-collapse:collapse;'>
            <tr style='background:#fdf4f3;'>
                <td style='padding:10px; font-weight:bold; width:40%;'>Name</td>
                <td style='padding:10px;'>$name</td>
            </tr>
            <tr>
                <td style='padding:10px; font-weight:bold;'>Email</td>
                <td style='padding:10px;'>$email</td>
            </tr>
            <tr style='background:#fdf4f3;'>
                <td style='padding:10px; font-weight:bold;'>Phone</td>
                <td style='padding:10px;'>$phone</td>
            </tr>
            <tr>
                <td style='padding:10px; font-weight:bold;'>Treatment</td>
                <td style='padding:10px;'>$treatment</td>
            </tr>
            <tr style='background:#fdf4f3;'>
                <td style='padding:10px; font-weight:bold;'>Date</td>
                <td style='padding:10px;'>$formatted_date</td>
            </tr>
            <tr>
                <td style='padding:10px; font-weight:bold;'>Time</td>
                <td style='padding:10px;'>$formatted_time</td>
            </tr>
            <tr style='background:#fdf4f3;'>
                <td style='padding:10px; font-weight:bold;'>Message</td>
                <td style='padding:10px;'>$message</td>
            </tr>
        </table>
        <p style='margin-top:16px;'>
            <a href='http://localhost/dermaco_web/admin/appointments.php' 
               style='background:#c9847a; color:white; padding:10px 20px; 
                      text-decoration:none; border-radius:5px;'>
                View in Dashboard →
            </a>
        </p>
    </div>
    "
);

echo "success";
?>