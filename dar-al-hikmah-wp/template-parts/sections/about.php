<?php
$heading    = dah_opt('dah_about_heading','Your Trusted Partner for Premium Imported Food Products');
$heading_ar = dah_opt('dah_about_heading_ar','شريكك الموثوق لمنتجات غذائية مستوردة متميزة');
$p1         = dah_opt('dah_about_p1','Dar Al Hikmah Trading LLC is a distinguished trading company based in the UAE, dedicated to importing and supplying premium food products to restaurants, hotels, supermarkets, and distributors across the GCC region.');
$p1_ar      = dah_opt('dah_about_p1_ar','دار الحكمة للتجارة ذ.م.م شركة تجارية متميزة مقرها الإمارات العربية المتحدة، متخصصة في استيراد وتوريد المنتجات الغذائية عالية الجودة.');
$p2         = dah_opt('dah_about_p2','With a strong network of international agencies and partnerships with leading manufacturers in Turkey, Dubai, and Iraq, we ensure our clients receive the finest quality products at competitive wholesale prices.');
$p2_ar      = dah_opt('dah_about_p2_ar','بفضل شبكة واسعة من الوكالات الدولية والشراكات مع كبار المصنّعين في تركيا ودبي والعراق، نضمن لعملائنا الحصول على أرقى المنتجات بأسعار تنافسية.');
$years      = dah_opt('dah_years_exp','10+');
$agencies   = dah_opt('dah_agencies_count','4');

$values = [
  ['🏆','Quality Assurance','ضمان الجودة','Every product is carefully selected and quality-checked before distribution.','يخضع كل منتج لفحص دقيق للجودة قبل التوزيع.'],
  ['🤝','Trusted Partnerships','شراكات موثوقة','Strong relationships with top international manufacturers and agencies.','علاقات راسخة مع كبار المصنّعين والوكالات الدولية.'],
  ['🚚','Reliable Logistics','لوجستيات موثوقة','Seamless import, shipping, and delivery coordination across the region.','تنسيق متكامل للاستيراد والشحن والتوصيل عبر المنطقة.'],
  ['💼','Professional Service','خدمة احترافية','Dedicated account management and B2B support for all clients.','إدارة حسابات مخصصة ودعم B2B لجميع العملاء.'],
];

$about_img = get_template_directory_uri() . '/assets/images/about.jpg';
?>
<section id="about" class="section section--pattern">
  <div class="glow-bg-tl"></div>
  <div class="glow-bg-br"></div>
  <div class="container">

    <div class="text-center">
      <span class="section-label"><span data-lang="en">Our Story</span><span data-lang="ar" style="display:none;">قصتنا</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>About </span><span class="text-gold">Dar Al Hikmah</span></span>
        <span data-lang="ar" style="display:none;"><span>عن </span><span class="text-gold">دار الحكمة</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">A premier trading house specializing in high-quality imported food products for the GCC region.</span>
        <span data-lang="ar" style="display:none;">دار تجارية متميزة متخصصة في المنتجات الغذائية المستوردة عالية الجودة.</span>
      </p>
    </div>

    <div class="about-grid">
      <!-- Image -->
      <div class="about-img-wrap">
        <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80" alt="Dar Al Hikmah Trading" class="about-img">
        <div class="about-stat-card bottom-right">
          <div class="num text-gold"><?php echo esc_html($years); ?></div>
          <div class="lbl"><span data-lang="en">Years in Business</span><span data-lang="ar" style="display:none;">سنة في العمل</span></div>
        </div>
        <div class="about-stat-card top-left">
          <div class="num text-gold"><?php echo esc_html($agencies); ?></div>
          <div class="lbl"><span data-lang="en">Global Agencies</span><span data-lang="ar" style="display:none;">وكالة عالمية</span></div>
        </div>
      </div>

      <!-- Text -->
      <div class="about-text">
        <h3>
          <span data-lang="en"><?php echo esc_html($heading); ?></span>
          <span data-lang="ar" style="display:none;" class="text-gold"><?php echo esc_html($heading_ar); ?></span>
        </h3>
        <p><span data-lang="en"><?php echo esc_html($p1); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($p1_ar); ?></span></p>
        <p><span data-lang="en"><?php echo esc_html($p2); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($p2_ar); ?></span></p>

        <div class="about-values">
          <?php foreach ($values as [$icon,$title_en,$title_ar,$desc_en,$desc_ar]): ?>
            <div class="value-card card-glass">
              <div class="value-icon"><?php echo $icon; ?></div>
              <div class="value-title"><span data-lang="en"><?php echo $title_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $title_ar; ?></span></div>
              <div class="value-desc"><span data-lang="en"><?php echo $desc_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $desc_ar; ?></span></div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>

  </div>
</section>
