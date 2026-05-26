<?php
$reasons = [
  ['🏆','Industry Expertise','خبرة صناعية','10+ years supplying premium imported food to UAE and GCC markets.','أكثر من 10 سنوات في توريد الغذاء المستورد عالي الجودة لأسواق الإمارات ودول الخليج.'],
  ['🌍','Global Sourcing','مصادر عالمية','Direct partnerships with manufacturers in Turkey, Europe, and the GCC.','شراكات مباشرة مع مصنّعين في تركيا وأوروبا ودول الخليج.'],
  ['✅','Quality Guarantee','ضمان الجودة','Rigorous quality checks on every shipment before delivery.','فحص جودة صارم على كل شحنة قبل التسليم.'],
  ['💰','Competitive Pricing','أسعار تنافسية','Best-in-market wholesale rates with flexible volume discounts.','أفضل أسعار جملة في السوق مع خصومات كميات مرنة.'],
  ['🚀','Fast Turnaround','سرعة التنفيذ','Efficient logistics ensuring timely deliveries across the region.','لوجستيات فعّالة تضمن التسليم في الوقت المحدد عبر المنطقة.'],
  ['🤝','Dedicated Support','دعم مخصص','Personal account managers available for every B2B client.','مديرو حسابات شخصيون متاحون لكل عميل B2B.'],
];

$testimonials_cpt = get_posts(['post_type'=>'dah_testimonial','posts_per_page'=>-1,'orderby'=>'menu_order','order'=>'ASC']);
$testimonials_default = [
  ['Ahmed Al Mansouri','أحمد المنصوري','CEO, Al Rayyan Foods','رئيس تنفيذي، شركة الريان للأغذية',5,'"Dar Al Hikmah has been our trusted supplier for 5 years. Their product quality and reliability are unmatched in the UAE market."','"دار الحكمة موردنا الموثوق منذ 5 سنوات. جودة منتجاتهم وموثوقيتهم لا مثيل لها في سوق الإمارات."'],
  ['Fatima Al Zahra','فاطمة الزهراء','Purchasing Manager, Grand Hotel Group','مديرة مشتريات، مجموعة فندق غراند',5,'"Exceptional service and top-quality imported products. They always deliver on time and the pricing is very competitive."','"خدمة استثنائية ومنتجات مستوردة عالية الجودة. يُسلّمون دائماً في الوقت المحدد والأسعار تنافسية جداً."'],
  ['Khalid Ibrahim','خالد إبراهيم','Owner, Spice Route Restaurant','صاحب مطعم طريق البهارات',5,'"Their private labeling service helped us launch our own product line. Professional team, great results!"','"ساعدنا نظام الوسم الخاص لديهم على إطلاق خط منتجاتنا الخاص. فريق احترافي ونتائج رائعة!"'],
];
?>
<section id="why-us" class="section section--pattern">
  <div class="glow-bg-tl"></div>
  <div class="glow-bg-br"></div>
  <div class="container">

    <!-- Why Us heading -->
    <div class="text-center">
      <span class="section-label"><span data-lang="en">Our Advantage</span><span data-lang="ar" style="display:none;">ميزتنا</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>Why Choose </span><span class="text-gold">Dar Al Hikmah?</span></span>
        <span data-lang="ar" style="display:none;"><span>لماذا تختار </span><span class="text-gold">دار الحكمة؟</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">The trusted choice for businesses seeking reliable, high-quality food supply partnerships.</span>
        <span data-lang="ar" style="display:none;">الخيار الموثوق للشركات الباحثة عن شراكات توريد غذائي موثوقة وعالية الجودة.</span>
      </p>
    </div>

    <!-- Reasons grid -->
    <div class="why-grid">
      <?php foreach ($reasons as [$icon,$title_en,$title_ar,$desc_en,$desc_ar]): ?>
        <div class="why-card card-glass">
          <div class="why-icon"><?php echo $icon; ?></div>
          <div class="why-title"><span data-lang="en"><?php echo esc_html($title_en); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($title_ar); ?></span></div>
          <div class="why-desc"><span data-lang="en"><?php echo esc_html($desc_en); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($desc_ar); ?></span></div>
        </div>
      <?php endforeach; ?>
    </div>

    <!-- Stats bar -->
    <div class="stats-bar">
      <div class="stat-item"><div class="stat-num text-gold">10+</div><div class="stat-lbl"><span data-lang="en">Years Experience</span><span data-lang="ar" style="display:none;">سنوات خبرة</span></div></div>
      <div class="stat-sep"></div>
      <div class="stat-item"><div class="stat-num text-gold">500+</div><div class="stat-lbl"><span data-lang="en">Products Supplied</span><span data-lang="ar" style="display:none;">منتج مورَّد</span></div></div>
      <div class="stat-sep"></div>
      <div class="stat-item"><div class="stat-num text-gold">4</div><div class="stat-lbl"><span data-lang="en">Global Agencies</span><span data-lang="ar" style="display:none;">وكالة عالمية</span></div></div>
      <div class="stat-sep"></div>
      <div class="stat-item"><div class="stat-num text-gold">GCC</div><div class="stat-lbl"><span data-lang="en">Region Coverage</span><span data-lang="ar" style="display:none;">تغطية المنطقة</span></div></div>
    </div>

    <!-- Testimonials heading -->
    <div class="text-center" style="margin-top:80px;">
      <span class="section-label"><span data-lang="en">Client Voices</span><span data-lang="ar" style="display:none;">أصوات العملاء</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>What Our </span><span class="text-gold">Clients Say</span></span>
        <span data-lang="ar" style="display:none;"><span>ماذا يقول </span><span class="text-gold">عملاؤنا</span></span>
      </h2>
      <div class="divider-gold"></div>
    </div>

    <!-- Testimonials -->
    <div class="testimonials-grid">
      <?php if ($testimonials_cpt):
        foreach ($testimonials_cpt as $t):
          $rating   = (int)(get_post_meta($t->ID,'_dah_rating',true) ?: 5);
          $role_en  = get_post_meta($t->ID,'_dah_role',true);
          $name_ar  = get_post_meta($t->ID,'_dah_name_ar',true) ?: $t->post_title;
          $role_ar  = get_post_meta($t->ID,'_dah_role_ar',true);
          $text_ar  = get_post_meta($t->ID,'_dah_text_ar',true);
          $stars    = str_repeat('★',$rating) . str_repeat('☆',5-$rating);
          ?>
          <div class="testimonial-card card-glass">
            <div class="testimonial-stars text-gold"><?php echo $stars; ?></div>
            <div class="testimonial-text">
              <span data-lang="en"><?php echo esc_html($t->post_content); ?></span>
              <span data-lang="ar" style="display:none;"><?php echo esc_html($text_ar); ?></span>
            </div>
            <div class="testimonial-author">
              <div class="testimonial-avatar"><?php echo mb_substr($t->post_title,0,1); ?></div>
              <div>
                <div class="testimonial-name"><span data-lang="en"><?php echo esc_html($t->post_title); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($name_ar); ?></span></div>
                <div class="testimonial-role"><span data-lang="en"><?php echo esc_html($role_en); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($role_ar); ?></span></div>
              </div>
            </div>
          </div>
        <?php endforeach;
      else:
        foreach ($testimonials_default as [$name_en,$name_ar,$role_en,$role_ar,$rating,$text_en,$text_ar]):
          $stars = str_repeat('★',$rating) . str_repeat('☆',5-$rating);
          ?>
          <div class="testimonial-card card-glass">
            <div class="testimonial-stars text-gold"><?php echo $stars; ?></div>
            <div class="testimonial-text">
              <span data-lang="en"><?php echo $text_en; ?></span>
              <span data-lang="ar" style="display:none;"><?php echo $text_ar; ?></span>
            </div>
            <div class="testimonial-author">
              <div class="testimonial-avatar"><?php echo mb_substr($name_en,0,1); ?></div>
              <div>
                <div class="testimonial-name"><span data-lang="en"><?php echo $name_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $name_ar; ?></span></div>
                <div class="testimonial-role"><span data-lang="en"><?php echo $role_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $role_ar; ?></span></div>
              </div>
            </div>
          </div>
        <?php endforeach;
      endif; ?>
    </div>

  </div>
</section>
