<?php
$badge    = dah_opt('dah_hero_badge', 'Premium Trading Company · UAE');
$badge_ar = dah_opt('dah_hero_badge_ar', 'شركة تجارية متميزة · الإمارات');
$sub      = dah_opt('dah_hero_sub', 'Your premier partner for imported food products, wholesale distribution, and commercial supply across the GCC region.');
$sub_ar   = dah_opt('dah_hero_sub_ar', 'شريكك الأمثل لاستيراد المواد الغذائية وتوزيعها في منطقة دول مجلس التعاون الخليجي.');
$words    = dah_opt('dah_hero_words', 'Quality,Excellence,Trust,Premium');
$words_ar = dah_opt('dah_hero_words_ar', 'مستوردة,متميزة,عالمية,راقية');
$bg_url   = dah_opt('dah_hero_bg_url', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80');
$s1v = dah_opt('dah_stat1_val','500+'); $s1l = dah_opt('dah_stat1_label','Products');
$s2v = dah_opt('dah_stat2_val','4');   $s2l = dah_opt('dah_stat2_label','Partnerships');
$s3v = dah_opt('dah_stat3_val','10+'); $s3l = dah_opt('dah_stat3_label','Years Experience');
$title_ar = dah_opt('dah_hero_title_ar','دار الحكمة للتجارة');
?>
<section id="hero">
  <div class="hero-bg" style="background-image:url('<?php echo esc_url($bg_url); ?>');"></div>
  <div class="hero-overlay"></div>
  <div class="hero-overlay2"></div>

  <div class="container">
    <div class="hero-content">

      <!-- Badge -->
      <div class="hero-badge">
        <span class="hero-badge-dot"></span>
        <span data-lang="en"><?php echo esc_html($badge); ?></span>
        <span data-lang="ar" style="display:none;"><?php echo esc_html($badge_ar); ?></span>
      </div>

      <!-- Title -->
      <h1 class="hero-title">
        <span data-lang="en">Dar Al <span class="text-gold">Hikmah</span><br>Trading</span>
        <span data-lang="ar" style="display:none;" class="text-gold"><?php echo esc_html($title_ar); ?></span>
      </h1>

      <!-- Typewriter -->
      <div class="hero-tagline">
        <span data-lang="en">Imported </span>
        <span data-lang="ar" style="display:none;">جودة </span>
        <span id="typed-text" data-words="<?php echo esc_attr($words); ?>" data-words-ar="<?php echo esc_attr($words_ar); ?>"></span>
        <span id="typed-cursor" class="cursor">|</span>
        <span data-lang="en"> &amp; Trusted Partnerships</span>
        <span data-lang="ar" style="display:none;"> وشراكات موثوقة</span>
      </div>

      <!-- Subtitle -->
      <p class="hero-sub">
        <span data-lang="en"><?php echo esc_html($sub); ?></span>
        <span data-lang="ar" style="display:none;"><?php echo esc_html($sub_ar); ?></span>
      </p>

      <!-- CTA Buttons -->
      <div class="hero-btns">
        <a href="#quote" class="btn-gold">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          <span data-lang="en">Request a Quote</span>
          <span data-lang="ar" style="display:none;">طلب عرض سعر</span>
        </a>
        <a href="<?php echo esc_url(dah_wa_link()); ?>" target="_blank" rel="noopener" class="btn-wa">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <span data-lang="en">WhatsApp Us</span>
          <span data-lang="ar" style="display:none;">تواصل عبر واتساب</span>
        </a>
        <a href="#products" class="btn-outline-gold">
          <span data-lang="en">View Products</span>
          <span data-lang="ar" style="display:none;">تصفح المنتجات</span>
        </a>
      </div>

      <!-- Stats -->
      <div class="hero-stats">
        <div>
          <div class="hero-stat-value text-gold"><?php echo esc_html($s1v); ?></div>
          <div class="hero-stat-label"><span data-lang="en"><?php echo esc_html($s1l); ?></span><span data-lang="ar" style="display:none;">منتج</span></div>
        </div>
        <div>
          <div class="hero-stat-value text-gold"><?php echo esc_html($s2v); ?></div>
          <div class="hero-stat-label"><span data-lang="en"><?php echo esc_html($s2l); ?></span><span data-lang="ar" style="display:none;">شراكة</span></div>
        </div>
        <div>
          <div class="hero-stat-value text-gold"><?php echo esc_html($s3v); ?></div>
          <div class="hero-stat-label"><span data-lang="en"><?php echo esc_html($s3l); ?></span><span data-lang="ar" style="display:none;">سنوات خبرة</span></div>
        </div>
        <div>
          <div class="hero-stat-value text-gold">GCC</div>
          <div class="hero-stat-label"><span data-lang="en">Coverage</span><span data-lang="ar" style="display:none;">تغطية</span></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Scroll -->
  <div class="hero-scroll">
    <span data-lang="en">Scroll</span>
    <span data-lang="ar" style="display:none;">انتقل</span>
    <div class="hero-scroll-line"></div>
  </div>
</section>
