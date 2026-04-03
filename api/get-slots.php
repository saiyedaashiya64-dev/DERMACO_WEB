<?php
require_once '../includes/db.php';

header('Content-Type: application/json');

$date = $_GET['date'] ?? '';

if (!$date || !strtotime($date)) {
    echo json_encode(['error' => 'Invalid date']);
    exit;
}

$dayOfWeek = date('N', strtotime($date));

if ($dayOfWeek == 7) {
    echo json_encode(['slots' => [], 'closed' => true]);
    exit;
}

$startTime = '10:00';
$endTime   = ($dayOfWeek == 6) ? '17:00' : '19:00';

$slots = [];
$current = strtotime($date . ' ' . $startTime);
$end     = strtotime($date . ' ' . $endTime);

while ($current < $end) {
    $slots[] = date('H:i', $current);
    $current = strtotime('+30 minutes', $current);
}

$stmt = $conn->prepare(
    "SELECT appointment_time FROM appointments 
     WHERE appointment_date = ? 
     AND status != 'cancelled'"
);
$stmt->bind_param('s', $date);
$stmt->execute();
$result_db = $stmt->get_result();

$bookedFormatted = [];
while ($row = $result_db->fetch_assoc()) {
    $bookedFormatted[] = substr($row['appointment_time'], 0, 5);
}
$stmt->close();

$result = [];
foreach ($slots as $slot) {
    $result[] = [
        'time'      => $slot,
        'label'     => date('g:i A', strtotime($slot)),
        'available' => !in_array($slot, $bookedFormatted)
    ];
}

echo json_encode(['slots' => $result, 'closed' => false]);