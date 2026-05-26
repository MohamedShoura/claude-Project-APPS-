<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="profile" href="https://gmpg.org/xfn/11">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- NAVBAR -->
<header id="site-header">
  <div class="container">
    <nav class="nav-inner">

      <!-- Logo -->
      <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-logo">
        <?php if (has_custom_logo()):
          the_custom_logo();
        else: ?>
          <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#C9A440,#A07828);display:flex;align-items:center;justify-content:center;font-weight:900;color:#0a0a0a;font-size:13px;border:2px solid #C9A440;">DAH</div>
        <?php endif; ?>
        <div class="nav-logo-text">
          <div class="name" data-lang="en"><?php bloginfo('name'); ?></div>
          <div class="name" data-lang="ar" style="display:none;"><?php echo esc_html(get_theme_mod('dah_name_ar', 'دار الحكمة')); ?></div>
          <div class="sub" data-lang="en">Trading LLC</div>
          <div class="sub" data-lang="ar" style="display:none;">للتجارة ذ.م.م</div>
        </div>
      </a>

      <!-- Desktop Nav Links -->
      <div class="nav-links">
        <?php
        $nav_en = ['home'=>'Home','about'=>'About','products'=>'Products','partners'=>'Partners','services'=>'Services','why-us'=>'Why Us','contact'=>'Contact'];
        $nav_ar = ['home'=>'الرئيسية','about'=>'من نحن','products'=>'المنتجات','partners'=>'الشراكات','services'=>'الخدمات','why-us'=>'لماذا نحن','contact'=>'اتصل بنا'];
        foreach ($nav_en as $id => $label):
          ?>
          <a href="#<?php echo $id; ?>">
            <span data-lang="en"><?php echo $label; ?></span>
            <span data-lang="ar" style="display:none;"><?php echo $nav_ar[$id]; ?></span>
          </a>
        <?php endforeach; ?>
      </div>

      <!-- Actions -->
      <div class="nav-actions">
        <button id="lang-toggle" class="btn-lang">
          <span>🇸🇦</span> العربية
        </button>
        <a href="#quote" class="btn-quote-nav">
          <span data-lang="en">Request Quote</span>
          <span data-lang="ar" style="display:none;">طلب عرض سعر</span>
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button id="nav-toggle" class="nav-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
  </div>

  <!-- Mobile Menu -->
  <div id="nav-mobile" class="nav-mobile">
    <?php foreach ($nav_en as $id => $label): ?>
      <a href="#<?php echo $id; ?>">
        <span data-lang="en"><?php echo $label; ?></span>
        <span data-lang="ar" style="display:none;"><?php echo $nav_ar[$id]; ?></span>
      </a>
    <?php endforeach; ?>
    <a href="#quote" class="btn-gold" style="text-align:center;justify-content:center;margin-top:8px;">
      <span data-lang="en">Request Quote</span>
      <span data-lang="ar" style="display:none;">طلب عرض سعر</span>
    </a>
  </div>
</header>
