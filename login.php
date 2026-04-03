<?php
session_start();
include "includes/db.php";

$error = "";
$success = "";

// ── Login ────────────────────────────────────────────────────────────────────
if (isset($_POST['login'])) {
    $email    = trim($_POST['email']);
    $password = trim($_POST['password']);

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_name']  = $user['name'];
            $_SESSION['role']       = $user['role'];
            $_SESSION['user_id']    = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            header("Location: index.php");
            exit;
        }
    }
    $error = "Invalid email or password.";
}

// ── Register ─────────────────────────────────────────────────────────────────
if (isset($_POST['register'])) {
    $name     = trim($_POST['reg_name']);
    $email    = trim($_POST['reg_email']);
    $password = trim($_POST['reg_password']);
    $confirm  = trim($_POST['reg_confirm']);

    if (!$name || !$email || !$password || !$confirm) {
        $error  = "reg:All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error  = "reg:Please enter a valid email.";
    } elseif (strlen($password) < 6) {
        $error  = "reg:Password must be at least 6 characters.";
    } elseif ($password !== $confirm) {
        $error  = "reg:Passwords do not match.";
    } else {
        // Check if email already exists
        $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $check->bind_param("s", $email);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            $error = "reg:An account with this email already exists.";
        } else {
            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')");
            $stmt->bind_param("sss", $name, $email, $hashed);
            $stmt->execute();
            $stmt->close();
            $success = "reg:Account created successfully! Please sign in.";
        }
        $check->close();
    }
}

// Figure out which tab to show
$activeTab = "login";
if (isset($error) && strpos($error, "reg:") === 0) $activeTab = "register";
if (isset($success) && strpos($success, "reg:") === 0) $activeTab = "register";

$error   = str_replace("reg:", "", $error ?? "");
$success = str_replace("reg:", "", $success ?? "");
?>

<!DOCTYPE html>
<html>
<head>
  <title>DermaCo — Sign In / Register</title>
  <link rel="stylesheet" href="ASSETS/plugins/bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="ASSETS/css/style.css">
  <style>
    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f8f9fa, #ffffff);
    }

    .login-card {
      background: white;
      padding: 50px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);
      width: 420px;
    }

    .login-logo {
      text-align: center;
      margin-bottom: 24px;
    }

    .login-logo img { height: 50px; }

    /* Tabs */
    .auth-tabs {
      display: flex;
      background: #f5f5f5;
      border-radius: 10px;
      padding: 4px;
      margin-bottom: 28px;
    }

    .auth-tab {
      flex: 1;
      text-align: center;
      padding: 10px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      color: #888;
      transition: all 0.2s ease;
      border: none;
      background: none;
    }

    .auth-tab.active {
      background: #fff;
      color: #222;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    /* Form */
    .auth-form { display: none; }
    .auth-form.active { display: block; }

    .form-control {
      border-radius: 8px;
      padding: 11px 14px;
      font-size: 14px;
      border: 1px solid #e0e0e0;
    }

    .form-control:focus {
      border-color: #f4b400;
      box-shadow: 0 0 0 3px rgba(244,180,0,0.15);
    }

    .login-btn {
      background: #f4b400;
      border: none;
      padding: 12px 25px;
      font-weight: 700;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.2s ease;
      color: #222;
    }

    .login-btn:hover {
      background: #e0a800;
      transform: translateY(-1px);
    }

    .form-label {
      font-size: 13px;
      font-weight: 600;
      color: #555;
      margin-bottom: 6px;
    }
  </style>
</head>

<body>
<div class="login-page">
  <div class="login-card">

    <div class="login-logo">
      <img src="ASSETS/images/logo.png">
    </div>

    <!-- Tabs -->
    <div class="auth-tabs">
      <button class="auth-tab <?= $activeTab === 'login' ? 'active' : '' ?>"
        onclick="switchTab('login')">Sign In</button>
      <button class="auth-tab <?= $activeTab === 'register' ? 'active' : '' ?>"
        onclick="switchTab('register')">Register</button>
    </div>

    <!-- Error / Success -->
    <?php if ($error): ?>
      <div class="alert alert-danger py-2 text-center" style="font-size:13px"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <?php if ($success): ?>
      <div class="alert alert-success py-2 text-center" style="font-size:13px"><?= htmlspecialchars($success) ?></div>
    <?php endif; ?>

    <!-- Login Form -->
    <form method="POST" class="auth-form <?= $activeTab === 'login' ? 'active' : '' ?>" id="form-login">
      <div class="mb-3">
        <label class="form-label">Email Address</label>
        <input type="email" name="email" class="form-control" placeholder="Enter your email" required>
      </div>
      <div class="mb-4">
        <label class="form-label">Password</label>
        <input type="password" name="password" class="form-control" placeholder="Enter your password" required>
      </div>
      <button class="login-btn w-100" name="login">Sign In</button>
      <p class="text-center mt-3" style="font-size:13px; color:#888">
        Don't have an account?
        <a href="#" onclick="switchTab('register')" style="color:#f4b400; font-weight:600">Register here</a>
      </p>
    </form>

    <!-- Register Form -->
    <form method="POST" class="auth-form <?= $activeTab === 'register' ? 'active' : '' ?>" id="form-register">
      <div class="mb-3">
        <label class="form-label">Full Name</label>
        <input type="text" name="reg_name" class="form-control" placeholder="Enter your full name" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Email Address</label>
        <input type="email" name="reg_email" class="form-control" placeholder="Enter your email" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" name="reg_password" class="form-control" placeholder="Min. 6 characters" required>
      </div>
      <div class="mb-4">
        <label class="form-label">Confirm Password</label>
        <input type="password" name="reg_confirm" class="form-control" placeholder="Repeat your password" required>
      </div>
      <button class="login-btn w-100" name="register">Create Account</button>
      <p class="text-center mt-3" style="font-size:13px; color:#888">
        Already have an account?
        <a href="#" onclick="switchTab('login')" style="color:#f4b400; font-weight:600">Sign in here</a>
      </p>
    </form>

  </div>
</div>

<script>
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector('#form-' + tab).classList.add('active');
  event.target.classList.add('active');
}
</script>

</body>
</html>