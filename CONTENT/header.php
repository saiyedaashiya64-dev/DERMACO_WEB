<?php session_start(); ?>
<!-- Spinner styles -->
<style>
  #global-spinner {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(255,255,255,0.55);
    backdrop-filter: blur(2px);
    align-items: center;
    justify-content: center;
  }
  #global-spinner.active {
    display: flex;
  }
  .spinner-ring {
    width: 44px;
    height: 44px;
    border: 4px solid #f0f0f0;
    border-top-color: #f4b400;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
<!-- Global Loading Spinner -->
<div id="global-spinner" class="active">
  <div class="spinner-ring"></div>
</div>
<div id="top-bar" class="top-bar">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-8">
        <ul class="top-info text-center text-md-left">
          <li><i class="fas fa-map-marker-alt"></i>
            <p class="info-text">Bharuch-392001</p>
          </li>
        </ul>
      </div>
      <!--/ Top info end -->

      <div class="col-lg-4 col-md-4 top-social text-center text-md-right">
        <ul class="list-unstyled">
          <li>
            <a title="Facebook" href="https://facebbok.com/themefisher.com">
              <span class="social-icon"><i class="fab fa-facebook-f"></i></span>
            </a>
            <a title="Twitter" href="https://twitter.com/themefisher.com">
              <span class="social-icon"><i class="fab fa-twitter"></i></span>
            </a>
            <a title="Instagram" href="https://instagram.com/themefisher.com">
              <span class="social-icon"><i class="fab fa-instagram"></i></span>
            </a>
            <a title="Linkdin" href="https://github.com/themefisher.com">
              <span class="social-icon"><i class="fab fa-github"></i></span>
            </a>
          </li>
        </ul>
      </div>
      <!--/ Top social end -->
    </div>
    <!--/ Content row end -->
  </div>
  <!--/ Container end -->
</div>
<!--/ Topbar end -->

<!-- Header start -->
<header id="header" class="header-two">
  <div class="site-navigation">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nav class="navbar navbar-expand-lg navbar-light p-0">

            <!-- Logo -->
            <div class="logo">
              <a class="d-block" href="#" onclick="loadPage('PAGES/home.html')">
                <img loading="lazy" src="ASSETS/images/logo.png" alt="Logo">
              </a>
            </div>

            <!-- Mobile Toggle -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse"
              aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div id="navbar-collapse" class="collapse navbar-collapse">
              <ul class="nav navbar-nav ml-auto align-items-center">

                <!-- Home -->
                <li class="nav-item active">
                  <a href="#" class="nav-link" onclick="loadPage('PAGES/home.html')">Home</a>
                </li>

                <!-- Services -->
                <!-- Services -->
                <li class="nav-item dropdown">
                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
                    Services <i class="fa fa-angle-down"></i>
                  </a>

                  <ul class="dropdown-menu">

                    <!-- Skin -->
                    <li class="dropdown-submenu mobile-submenu">
                      <span class="submenu-title">
                        Skin <i class="fa fa-angle-right submenu-arrow"></i>
                      </span>
                      <ul class="dropdown-menu">
                        <li><a href="#" onclick="loadPage('PAGES/Services/laser_hair.html')">Laser Hair Reduction</a>
                        </li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/skin_brightening.html')">Skin
                            Brightening</a>
                        </li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/anti_age.html')">Ageing Skin</a></li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/acne_scar.html')">Acne Scars</a></li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/facial.html')">Dull Skin</a></li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/eye_circle.html')">Dark Circles</a></li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/anti_wrinkle.html')">Anti Wrinkle</a></li>
                        <li><a href="#" onclick="loadPage('PAGES/Services/micro_niddle.html')">Microneedling</a></li>
                      </ul>
                    </li>

                    <!-- Hair -->
                    <li class="dropdown-submenu mobile-submenu">
                      <span class="submenu-title">
                        Hair <i class="fa fa-angle-right submenu-arrow"></i>
                      </span>
                      <ul class="dropdown-menu">
                        <li><a href="#" onclick="loadPage('PAGES/Services/hair.html')">Hair Loss</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li class="nav-item">
  <a href="#" class="nav-link" onclick="loadPage('PAGES/products.html')">
    Products
  </a>
</li>
<li>
  <a href="#" onclick="loadPage('PAGES/cart.html')" style="position:relative; display:inline-flex; align-items:center; gap:6px;">
    <span style="position:relative; display:inline-block;">
      <i class="fas fa-shopping-bag"></i>
      <span id="cart-count-badge" style="
        display:none;
        position:absolute;
        top:-8px;
        right:-10px;
        background:#f4b400;
        color:#000;
        font-size:10px;
        font-weight:800;
        min-width:17px;
        height:17px;
        border-radius:50%;
        text-align:center;
        line-height:17px;
        padding:0 3px;
        box-shadow:0 1px 4px rgba(0,0,0,0.15);
      ">0</span>
    </span>
    My Bag
  </a>
</li>


                

            

                <!-- CTA -->
                <li class="header-get-a-quote">
                  <a class="btn btn-primary" href="#" onclick="loadPage('PAGES/contact.html')">
                    Get Free Consultation
                  </a>
                </li>

                <?php if(!isset($_SESSION['user_name'])) { ?>

<li class="header-get-a-quote">
  <a class="btn btn-primary" href="login.php">
    Sign In
  </a>
</li>

<?php } else { ?>

<li class="nav-item dropdown user-menu">

<a class="nav-link user-toggle" href="#" data-toggle="dropdown">

<div class="user-avatar">
<?php echo strtoupper(substr($_SESSION['user_name'],0,1)); ?>
</div>

<span class="user-name">
<?php echo $_SESSION['user_name']; ?>
</span>

</a>

<ul class="dropdown-menu user-dropdown">

<li><a href="#"onclick="loadPage('PAGES/orders.html')"><i class="fas fa-box"></i> Orders</a></li>
<li><a href="#" onclick="loadPage('PAGES/profile.html')"><i class="fas fa-user"></i> Profile</a></li>
<li><a href="#" onclick="loadPage('PAGES/wishlist.html')"><i class="fas fa-heart"></i> Wishlist</a></li>

<?php if($_SESSION['role']=="admin"){ ?>
<li><a href="admin/dashboard.php"><i class="fas fa-cog"></i> Admin Panel</a></li>
<?php } ?>

<li class="divider"></li>

<li><a href="logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a></li>

</ul>

</li>

<?php } ?>

              </ul>
            </div>

          </nav>

        </div>
        <!--/ Col end -->
      </div>
      <!--/ Row end -->
    </div>
    <!--/ Container end -->

  </div>
  <!--/ Navigation end -->
</header>
<!--/ Header end --> 

