<?php
$services_cpt = get_posts(['post_type'=>'dah_service','posts_per_page'=>-1,'meta_key'=>'_dah_order','orderby'=>'meta_value_num','order'=>'ASC']);
$defaults = [
  ['🏪','Wholesale Food Supply','توريد غذائي بالجملة','Bulk supply of imported food products at competitive wholesale prices.','توريد ضخم للمنتجات الغذائية المستوردة بأسعار تنافسية.','Competitive Pricing,Bulk Orders,Flexible MOQs','أسعار تنافسية,طلبات ضخمة,حدود دنيا مرنة'],
  ['🍽️','Restaurant & Hotel Supply','توريد المطاعم والفنادق','Specialized supply for the hospitality industry — restaurants, hotels, catering.','سلاسل توريد متخصصة لقطاع الضيافة.','Hospitality Grade,Regular Delivery,Custom Orders','درجة ضيافة,توصيل منتظم,طلبات مخصصة'],
  ['🚛','Distributor Solutions','حلول الموزعين','End-to-end supply partnership for regional distributors.','شراكة توريد شاملة للموزعين الإقليميين.','Exclusive Territories,Marketing Support,Volume Discounts','مناطق حصرية,دعم تسويقي,خصومات الكميات'],
  ['🌊','Import & Logistics','الاستيراد والخدمات اللوجستية','Full import coordination — customs clearance, shipping, timely delivery.','تنسيق استيراد متكامل يشمل التخليص الجمركي وإدارة الشحن.','Customs Clearance,Door Delivery,Cold Chain','تخليص جمركي,توصيل باب لباب,سلسلة تبريد'],
  ['✈️','Direct Importing','الاستيراد المباشر','Direct sourcing from manufacturers for better margins and product control.','توريد مباشر من المصنّعين للمشترين الكبار.','Factory Direct,Origin Certificates,Quality Inspection','مباشر من المصنع,شهادات المنشأ,فحص الجودة'],
  ['📦','Private Labeling','الوسم الخاص','Custom branding and private labeling for businesses wanting their own product lines.','حلول علامة تجارية وتغليف خاص.','Brand Design,Custom Packaging,MOQ Friendly','تصميم العلامة,تغليف مخصص,حدود دنيا مناسبة'],
];
?>
<section id="services" class="section section--green">
  <div class="glow-bg-tl"></div>
  <div class="container">

    <div class="text-center">
      <span class="section-label"><span data-lang="en">What We Offer</span><span data-lang="ar" style="display:none;">ما نقدمه</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>Our </span><span class="text-gold">Services</span></span>
        <span data-lang="ar" style="display:none;"><span class="text-gold">خدماتنا</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">Comprehensive trading and supply solutions for businesses of all sizes.</span>
        <span data-lang="ar" style="display:none;">حلول تجارية وتوريد شاملة مصممة لمختلف أحجام الأعمال.</span>
      </p>
    </div>

    <div class="services-grid">
      <?php if ($services_cpt):
        foreach ($services_cpt as $svc):
          $icon      = get_post_meta($svc->ID,'_dah_icon',true) ?: '🏪';
          $features  = array_filter(explode(',', get_post_meta($svc->ID,'_dah_features',true)));
          $feat_ar   = array_filter(explode(',', get_post_meta($svc->ID,'_dah_features_ar',true)));
          $title_ar  = get_post_meta($svc->ID,'_dah_title_ar',true) ?: $svc->post_title;
          $desc_ar   = get_post_meta($svc->ID,'_dah_desc_ar',true);
          ?>
          <div class="service-card card-glass">
            <div class="service-icon-wrap"><?php echo $icon; ?></div>
            <div class="service-title"><span data-lang="en"><?php echo esc_html($svc->post_title); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($title_ar); ?></span></div>
            <p class="service-desc"><span data-lang="en"><?php echo esc_html(wp_trim_words($svc->post_content,20)); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($desc_ar); ?></span></p>
            <div class="service-features">
              <?php foreach ($features as $f): ?><span class="service-feature" data-lang="en">✓ <?php echo esc_html(trim($f)); ?></span><?php endforeach; ?>
              <?php foreach ($feat_ar as $f): ?><span class="service-feature" data-lang="ar" style="display:none;">✓ <?php echo esc_html(trim($f)); ?></span><?php endforeach; ?>
            </div>
          </div>
        <?php endforeach;
      else:
        foreach ($defaults as [$icon,$title_en,$title_ar,$desc_en,$desc_ar,$feat_en,$feat_ar]): ?>
          <div class="service-card card-glass">
            <div class="service-icon-wrap"><?php echo $icon; ?></div>
            <div class="service-title"><span data-lang="en"><?php echo $title_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $title_ar; ?></span></div>
            <p class="service-desc"><span data-lang="en"><?php echo $desc_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $desc_ar; ?></span></p>
            <div class="service-features">
              <?php foreach (explode(',',$feat_en) as $f): ?><span class="service-feature" data-lang="en">✓ <?php echo trim($f); ?></span><?php endforeach; ?>
              <?php foreach (explode(',',$feat_ar) as $f): ?><span class="service-feature" data-lang="ar" style="display:none;">✓ <?php echo trim($f); ?></span><?php endforeach; ?>
            </div>
          </div>
        <?php endforeach;
      endif; ?>
    </div>

    <!-- Banner -->
    <div class="services-banner">
      <div class="services-banner-bg" style="background-image:url('https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=80');"></div>
      <div class="services-banner-overlay"></div>
      <div class="services-banner-content">
        <h3>
          <span data-lang="en">Need a Custom <span class="text-gold">Supply Solution?</span></span>
          <span data-lang="ar" style="display:none;">هل تحتاج حلاً <span class="text-gold">مخصصاً للتوريد؟</span></span>
        </h3>
        <p>
          <span data-lang="en">Our team will design a tailored supply and distribution plan for your business needs.</span>
          <span data-lang="ar" style="display:none;">سيصمم فريقنا خطة توريد وتوزيع مخصصة لاحتياجات عملك.</span>
        </p>
        <a href="#quote" class="btn-gold">
          <span data-lang="en">Request Consultation</span>
          <span data-lang="ar" style="display:none;">طلب استشارة</span>
        </a>
      </div>
    </div>

  </div>
</section>
