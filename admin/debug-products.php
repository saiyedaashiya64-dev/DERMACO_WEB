<?php
// Place this at: dermaco_web/admin/debug-products.php
// Visit it while logged in to admin, then delete it after
session_start();

echo "<h3>Session contents:</h3>";
echo "<pre>"; print_r($_SESSION); echo "</pre>";

echo "<h3>products.json path test:</h3>";
$path = __DIR__ . '/../products.json';
echo "Path: " . $path . "<br>";
echo "Exists: " . (file_exists($path) ? '<b style="color:green">YES</b>' : '<b style="color:red">NO</b>') . "<br>";

if (file_exists($path)) {
    $data = json_decode(file_get_contents($path), true);
    echo "Products count: " . count($data) . "<br>";
    echo "First product: <pre>" . print_r($data[0] ?? 'none', true) . "</pre>";
}

echo "<h3>API test (admin-get-products.php):</h3>";
$apiPath = __DIR__ . '/../api/admin-get-products.php';
echo "API file exists: " . (file_exists($apiPath) ? '<b style="color:green">YES</b>' : '<b style="color:red">NO - wrong location!</b>');
?>