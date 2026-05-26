<?php
$partners = get_posts(['post_type'=>'dah_partner','posts_per_page'=>-1,'orderby'=>'menu_order','order'=>'ASC']);
$card_styles = [
  ['border:1px solid rgba(59,130,246,.3);background:linear-gradient(135deg,rgba(30,58,138,.2),rgba(120,68,0,.1));','🏢'],
  ['border:1px solid rgba(239,68,68,.3);background:linear-gradient(135deg,rgba(127,29,29,.2),rgba(120,68,0,.1));','🌾'],
  ['border:1px solid rgba(34,197,94,.3);background:linear-gradient(135deg,rgba(20,83,45,.2),rgba(120,68,0,.1));','🥛'],
  ['border:1px solid rgba(168,85,247,.3);background:linear-gradient(135deg,rgba(88,28,135,.2),rgba(120,68,0,.1));','🏭'],
];
$default_partners = [
  ['Troina Company','شركة ترويينا','Dubai, UAE','دبي، الإمارات','🇦🇪','Distribution Agency','وكالة توزيع','Strategic distribution partnership with Troina Company in Dubai.','شراكة توزيع استراتيجية مع شركة ترويينا في دبي.','Dubai-Based,GCC Distribution,Premium Products','مقرها دبي,توزيع خليجي,منتجات متميزة'],
  ['York Agro Company','شركة يورك أغرو','Turkey','تركيا','🇹🇷','Agricultural Products','منتجات زراعية','Exclusive agency with York Agro Company in Turkey for agricultural products.','وكالة حصرية مع شركة يورك أغرو في تركيا للمنتجات الزراعية.','Turkish Origin,Agro Products,Direct Import','منشأ تركي,منتجات زراعية,استيراد مباشر'],
  ['Canon Dairy Factory','مصنع كانون للألبان','Iraq','العراق','🇮🇶','Dairy Manufacturing','تصنيع الألبان','Supply contract with Canon Dairy Factory for premium dairy products.','عقد توريد مع مصنع كانون للألبان لمنتجات الألبان المتميزة.','Dairy Products,Milk Powder,Wholesale Supply','منتجات الألبان,حليب بودرة,توريد بالجملة'],
  ['Oxide Company','شركة أوكسايد','Iraq','العراق','🇮🇶','Food Trading','تجارة غذائية','Partnership with Oxide Company for bulk food commodity procurement.','شراكة مع شركة أوكسايد لشراء السلع الغذائية بالكميات الكبيرة.','Food Commodities,Bulk Supply,Long-term Contract','سلع غذائية,توريد ضخم,عقد طويل الأمد'],
];
$cta_en = dah_opt('dah_partners_cta_en','We are always open to new strategic partnerships.');
$cta_ar = dah_opt('dah_partners_cta_ar','نرحب دائماً بشراكات استراتيجية جديدة.');
?>
<section id="partners" class="section section--pattern">
  <div class="glow-bg-center"></div>
  <div class="container">

    <div class="text-center">
      <span class="section-label"><span data-lang="en">Global Network</span><span data-lang="ar" style="display:none;">شبكتنا العالمية</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>Our </span><span class="text-gold">Agencies & Partnerships</span></span>
        <span data-lang="ar" style="display:none;"><span class="text-gold">وكالاتنا </span><span>وشراكاتنا</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">Strategic partnerships with leading manufacturers and distributors across the Middle East.</span>
        <span data-lang="ar" style="display:none;">شراكات استراتيجية مع كبار المصنّعين والموزعين في الشرق الأوسط وما وراءه.</span>
      </p>
    </div>

    <div class="partners-grid">
      <?php if ($partners):
        foreach ($partners as $idx => $pt):
          $s = $card_styles[$idx % 4];
          $loc    = get_post_meta($pt->ID,'_dah_location',true);
          $loc_ar = get_post_meta($pt->ID,'_dah_location_ar',true);
          $flag   = get_post_meta($pt->ID,'_dah_flag',true) ?: '🌍';
          $type   = get_post_meta($pt->ID,'_dah_type',true);
          $type_ar= get_post_meta($pt->ID,'_dah_type_ar',true);
          $icon   = get_post_meta($pt->ID,'_dah_icon',true) ?: '🏢';
          $tags   = array_filter(explode(',', get_post_meta($pt->ID,'_dah_tags',true)));
          $tags_ar= array_filter(explode(',', get_post_meta($pt->ID,'_dah_tags_ar',true)));
          $name_ar= get_post_meta($pt->ID,'_dah_name_ar',true) ?: $pt->post_title;
          $desc_ar= get_post_meta($pt->ID,'_dah_desc_ar',true);
          ?>
          <div class="partner-card" style="<?php echo $s[0]; ?>">
            <div class="partner-header">
              <div class="partner-icon"><?php echo $icon; ?></div>
              <div>
                <div class="partner-name">
                  <span data-lang="en"><?php echo esc_html($pt->post_title); ?></span>
                  <span data-lang="ar" style="display:none;"><?php echo esc_html($name_ar); ?></span>
                  <?php echo $flag; ?>
                </div>
                <div class="partner-type"><span data-lang="en"><?php echo esc_html($type); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($type_ar); ?></span></div>
                <div class="partner-location"><span data-lang="en"><?php echo esc_html($loc); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($loc_ar); ?></span></div>
              </div>
            </div>
            <p class="partner-desc">
              <span data-lang="en"><?php echo esc_html(wp_trim_words($pt->post_content,25)); ?></span>
              <span data-lang="ar" style="display:none;"><?php echo esc_html($desc_ar); ?></span>
            </p>
            <div class="partner-tags">
              <?php foreach ($tags as $tag): ?><span class="partner-tag" data-lang="en"><?php echo esc_html(trim($tag)); ?></span><?php endforeach; ?>
              <?php foreach ($tags_ar as $tag): ?><span class="partner-tag" data-lang="ar" style="display:none;"><?php echo esc_html(trim($tag)); ?></span><?php endforeach; ?>
            </div>
          </div>
        <?php endforeach;
      else:
        foreach ($default_partners as $idx => $d):
          [$name_en,$name_ar,$loc_en,$loc_ar,$flag,$type_en,$type_ar,$desc_en,$desc_ar,$tags_en,$tags_ar] = $d;
          $s = $card_styles[$idx % 4];
          ?>
          <div class="partner-card" style="<?php echo $s[0]; ?>">
            <div class="partner-header">
              <div class="partner-icon"><?php echo $s[1]; ?></div>
              <div>
                <div class="partner-name">
                  <span data-lang="en"><?php echo $name_en; ?></span>
                  <span data-lang="ar" style="display:none;"><?php echo $name_ar; ?></span>
                  <?php echo $flag; ?>
                </div>
                <div class="partner-type"><span data-lang="en"><?php echo $type_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $type_ar; ?></span></div>
                <div class="partner-location"><span data-lang="en"><?php echo $loc_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $loc_ar; ?></span></div>
              </div>
            </div>
            <p class="partner-desc">
              <span data-lang="en"><?php echo $desc_en; ?></span>
              <span data-lang="ar" style="display:none;"><?php echo $desc_ar; ?></span>
            </p>
            <div class="partner-tags">
              <?php foreach (explode(',',$tags_en) as $t): ?><span class="partner-tag" data-lang="en"><?php echo trim($t); ?></span><?php endforeach; ?>
              <?php foreach (explode(',',$tags_ar) as $t): ?><span class="partner-tag" data-lang="ar" style="display:none;"><?php echo trim($t); ?></span><?php endforeach; ?>
            </div>
          </div>
        <?php endforeach;
      endif; ?>
    </div>

    <!-- CTA -->
    <div class="partner-cta">
      <div style="font-size:42px;margin-bottom:16px;">🌐</div>
      <h3 style="font-size:28px;color:#fff;margin-bottom:12px;">
        <span data-lang="en">Interested in a <span class="text-gold">Partnership?</span></span>
        <span data-lang="ar" style="display:none;">هل تهتم بـ<span class="text-gold">شراكة معنا؟</span></span>
      </h3>
      <p style="color:#9ca3af;margin-bottom:28px;max-width:520px;margin-left:auto;margin-right:auto;">
        <span data-lang="en"><?php echo esc_html($cta_en); ?></span>
        <span data-lang="ar" style="display:none;"><?php echo esc_html($cta_ar); ?></span>
      </p>
      <a href="#contact" class="btn-gold">
        <span data-lang="en">Contact Our Team</span>
        <span data-lang="ar" style="display:none;">تواصل مع فريقنا</span>
      </a>
    </div>

  </div>
</section>
