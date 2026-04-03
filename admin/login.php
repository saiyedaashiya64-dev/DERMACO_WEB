<?php
session_start();
include "../includes/db.php";

if (isset($_POST['login'])) {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM admins WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            $_SESSION['admin'] = $username;
            header("Location: dashboard.php");
            exit;
        }
    }
    $error = "Invalid username or password";
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Login – DermaCo</title>
    <link rel="stylesheet" href="../ASSETS/plugins/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../ASSETS/css/admin.css">
    <style>
        body {
            background: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }

        .login-wrapper {
            width: 100%;
            max-width: 400px;
            padding: 20px;
        }

        .login-card {
            background: #fff;
            border-radius: 14px;
            border: 1px solid #efefef;
            box-shadow: 0 4px 24px rgba(0,0,0,0.07);
            overflow: hidden;
        }

        .login-header {
            background: #1a1a1a;
            padding: 28px 32px;
            text-align: center;
        }
        .login-header .brand {
            color: #f4b400;
            font-size: 1.4rem;
            font-weight: 700;
            letter-spacing: 0.5px;
            display: block;
        }
        .login-header .sub {
            color: #666;
            font-size: 0.75rem;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-top: 4px;
            display: block;
        }

        .login-body {
            padding: 32px;
        }

        .field-group {
            margin-bottom: 18px;
        }
        .field-group label {
            display: block;
            font-size: 0.78rem;
            font-weight: 700;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }
        .field-group input {
            width: 100%;
            padding: 11px 14px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 0.92rem;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.15s;
            background: #fafafa;
        }
        .field-group input:focus {
            border-color: #f4b400;
            background: #fff;
        }

        .btn-login {
            width: 100%;
            background: #f4b400;
            color: #000;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 700;
            cursor: pointer;
            margin-top: 6px;
            transition: background 0.15s;
            letter-spacing: 0.3px;
        }
        .btn-login:hover { background: #e0a800; }

        .error-msg {
            background: #fdf0f0;
            color: #c0392b;
            border: 1px solid #f5c6c6;
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 0.85rem;
            margin-bottom: 18px;
            text-align: center;
        }

        .login-footer {
            text-align: center;
            padding: 14px;
            border-top: 1px solid #f5f5f5;
            font-size: 0.75rem;
            color: #bbb;
        }
    </style>
</head>
<body>

<div class="login-wrapper">
    <div class="login-card">

        <div class="login-header">
            <span class="brand">DermaCo</span>
            <span class="sub">Admin Portal</span>
        </div>

        <div class="login-body">
            <?php if (isset($error)): ?>
                <div class="error-msg">⚠ <?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST">
                <div class="field-group">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Enter your username" autocomplete="off">
                </div>
                <div class="field-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password">
                </div>
                <button type="submit" name="login" class="btn-login">Login</button>
            </form>
        </div>

        <div class="login-footer">
            DermaCo Admin &copy; <?= date('Y') ?>
        </div>

    </div>
</div>

</body>
</html>