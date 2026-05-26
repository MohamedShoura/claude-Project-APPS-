<?php
$products = get_posts(['post_type'=>'dah_product','posts_per_page'=>-1,'meta_key'=>'_dah_order','orderby'=>'meta_value_num','order'=>'ASC']);
$categories_en = ['All','Staples','Dairy','Seafood','Specialty'];
$categories_ar  = ['الكل','أساسيات','ألبان','مأكولات بحرية','تخصصي'];
$cat_slugs = ['all','staples','dairy','seafood','specialty'];
?>
<section id="products" class="section section--green">
  <div class="glow-bg-br"></div>
  <div class="container">

    <div class="text-center">
      <span class="section-label"><span data-lang="en">Our Portfolio</span><span data-lang="ar" style="display:none;">محفظتنا</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>Premium </span><span class="text-gold">Products</span></span>
        <span data-lang="ar" style="display:none;"><span class="text-gold">منتجات </span><span>متميزة</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">Carefully sourced imported food products for retail, hospitality, and wholesale distribution.</span>
        <span data-lang="ar" style="display:none;">منتجات غذائية مستوردة مختارة بعناية للتجزئة والضيافة والتوزيع بالجملة.</span>
      </p>
    </div>

    <!-- Filter tabs -->
    <div class="filter-tabs">
      <?php foreach ($categories_en as $i => $cat): ?>
        <button class="filter-tab <?php echo $i === 0 ? 'active' : ''; ?>" data-cat="<?php echo $cat_slugs[$i]; ?>">
          <span data-lang="en"><?php echo $cat; ?></span>
          <span data-lang="ar" style="display:none;"><?php echo $categories_ar[$i]; ?></span>
        </button>
      <?php endforeach; ?>
    </div>

    <!-- Products grid -->
    <div class="products-grid">
      <?php if ($products): foreach ($products as $p):
        $terms = get_the_terms($p->ID, 'dah_product_cat');
        $cat_slug = $terms ? sanitize_title($terms[0]->name) : 'specialty';
        $cat_name_en = $terms ? $terms[0]->name : 'Specialty';
        $emoji  = get_post_meta($p->ID, '_dah_emoji', true) ?: '🍅';
        $badge  = get_post_meta($p->ID, '_dah_badge', true) ?: 'Imported';
        $badge_ar = get_post_meta($p->ID, '_dah_badge_ar', true) ?: $badge;
        $title_ar = get_post_meta($p->ID, '_dah_title_ar', true) ?: $p->post_title;
        $desc_ar  = get_post_meta($p->ID, '_dah_desc_ar', true) ?: $p->post_excerpt;
        $thumb = get_the_post_thumbnail_url($p->ID, 'large');
        ?>
        <div class="product-card card-glass" data-category="<?php echo esc_attr($cat_slug); ?>">
          <div class="product-img-wrap">
            <?php if ($thumb): ?>
              <img src="<?php echo esc_url($thumb); ?>" alt="<?php echo esc_attr($p->post_title); ?>">
            <?php else: ?>
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#120800,#0a1a0a);font-size:64px;"><?php echo $emoji; ?></div>
            <?php endif; ?>
            <div class="product-img-overlay"></div>
            <span class="product-badge">
              <span data-lang="en"><?php echo esc_html($badge); ?></span>
              <span data-lang="ar" style="display:none;"><?php echo esc_html($badge_ar); ?></span>
            </span>
            <div class="product-emoji"><?php echo $emoji; ?></div>
          </div>
          <div class="product-body">
            <h3 class="product-name">
              <span data-lang="en"><?php echo esc_html($p->post_title); ?></span>
              <span data-lang="ar" style="display:none;"><?php echo esc_html($title_ar); ?></span>
            </h3>
            <p class="product-desc">
              <span data-lang="en"><?php echo esc_html($p->post_excerpt ?: wp_trim_words($p->post_content, 18)); ?></span>
              <span data-lang="ar" style="display:none;"><?php echo esc_html($desc_ar); ?></span>
            </p>
            <div class="product-footer">
              <span class="product-cat"><?php echo esc_html($cat_name_en); ?></span>
              <a href="#contact" class="product-inquire">
                <span data-lang="en">Inquire →</span>
                <span data-lang="ar" style="display:none;">استفسر ←</span>
              </a>
            </div>
          </div>
        </div>
      <?php endforeach;
      else: ?>
        <?php /* Fallback default products */ ?>
        <?php $defaults = [
          ['🌾','Imported Rice','أرز مستورد','Premium long-grain, basmati, and jasmine rice sourced from top global producers.','أرز بسمتي وياسمين طويل الحبة مصدر من كبار المنتجين العالميين.','Best Seller','الأكثر مبيعاً','staples'],
          ['🍅','Tomato Paste','معجون الطماطم','Imported tomato paste in all sizes — 70g, 135g, 400g, 800g cans and 10kg tins.','معجون طماطم مستورد بجميع الأحجام.','All Sizes','جميع الأحجام','staples'],
          ['☕','Coffee Beans','حبوب القهوة','Premium Arabica & Robusta coffee beans for roasters and retailers.','حبوب قهوة أرابيكا وروبوستا متميزة.','Premium','فاخر','specialty'],
          ['🍯','Premium Honey','عسل طبيعي','Natural, pure honey — Sidr, wildflower, and more.','عسل طبيعي خالص — سدر وبري وأنواع أخرى.','100% Natural','100% طبيعي','specialty'],
          ['🧀','Cheese','جبنة','Wide selection of imported cheeses for restaurants and markets.','تشكيلة واسعة من الجبن المستورد.','Imported','مستورد','dairy'],
          ['🥛','Dairy Products','منتجات الألبان','Full range of imported dairy — butter, cream, yogurt, and more.','مجموعة كاملة من الألبان المستوردة.','Fresh Supply','توريد طازج','dairy'],
          ['🐟','Frozen Fish','سمك مجمد','Premium frozen fish — whole, fillets, and mixed seafood.','أسماك مجمدة متميزة — كاملة وشرائح.','IQF Frozen','مجمد IQF','seafood'],
          ['🫒','Olives','زيتون','High-quality imported olives — green, black, and stuffed in bulk.','زيتون مستورد — أخضر وأسود ومحشو.','Mediterranean','متوسطي','specialty'],
          ['🍓','Premium Jam','مربى فاخرة','Imported fruit jams in a variety of flavors for hospitality and retail.','مربى فواكه مستوردة بنكهات متنوعة.','Assorted','متنوعة','specialty'],
        ];
        foreach ($defaults as $d): [$emoji,$name_en,$name_ar,$desc_en,$desc_ar,$badge_en,$badge_ar,$cat_slug] = $d; ?>
          <div class="product-card card-glass" data-category="<?php echo $cat_slug; ?>">
            <div class="product-img-wrap">
              <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#120800,#0a1a0a);font-size:72px;"><?php echo $emoji; ?></div>
              <div class="product-img-overlay"></div>
              <span class="product-badge"><span data-lang="en"><?php echo $badge_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $badge_ar; ?></span></span>
              <div class="product-emoji"><?php echo $emoji; ?></div>
            </div>
            <div class="product-body">
              <h3 class="product-name"><span data-lang="en"><?php echo $name_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $name_ar; ?></span></h3>
              <p class="product-desc"><span data-lang="en"><?php echo $desc_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $desc_ar; ?></span></p>
              <div class="product-footer">
                <span class="product-cat"><?php echo ucfirst($cat_slug); ?></span>
                <a href="#contact" class="product-inquire"><span data-lang="en">Inquire →</span><span data-lang="ar" style="display:none;">استفسر ←</span></a>
              </div>
            </div>
          </div>
        <?php endforeach;
      endif; ?>
    </div>

    <!-- Milk Powder Section -->
    <div class="milk-section">
      <div class="text-center" style="margin-bottom:48px;">
        <div style="font-size:48px;margin-bottom:12px;">🥛</div>
        <span class="section-label"><span data-lang="en">Featured Category</span><span data-lang="ar" style="display:none;">فئة مميزة</span></span>
        <h3 class="section-title" style="text-align:center;">
          <span data-lang="en"><span class="text-gold">Milk Powder</span> Collection</span>
          <span data-lang="ar" style="display:none;"><span class="text-gold">مجموعة </span>حليب البودرة</span>
        </h3>
        <p style="color:#9ca3af;max-width:520px;margin:0 auto;">
          <span data-lang="en">Premium imported milk powder in multiple packaging sizes for all business scales.</span>
          <span data-lang="ar" style="display:none;">حليب بودرة مستورد عالي الجودة بتغليفات متعددة لجميع أحجام الأعمال.</span>
        </p>
      </div>
      <div class="milk-grid">
        <?php for ($i=1;$i<=3;$i++):
          $size    = dah_opt("dah_milk_{$i}_size",    ['25 KG Bags','10 KG Cans','5 KG Cans'][$i-1]);
          $size_ar = dah_opt("dah_milk_{$i}_size_ar", ['أكياس 25 كغ','علب 10 كغ','علب 5 كغ'][$i-1]);
          $badge   = dah_opt("dah_milk_{$i}_badge",   ['Industrial','Commercial','Retail'][$i-1]);
          $badge_ar= dah_opt("dah_milk_{$i}_badge_ar",['صناعي','تجاري','تجزئة'][$i-1]);
          $desc    = dah_opt("dah_milk_{$i}_desc",    ['Industrial bulk packaging for factories.','Mid-size cans for catering companies.','Retail and restaurant friendly packaging.'][$i-1]);
          $desc_ar = dah_opt("dah_milk_{$i}_desc_ar", ['تغليف صناعي ضخم للمصانع.','علب متوسطة للتموين.','تغليف للتجزئة والمطاعم.'][$i-1]);
          $icons   = ['🏭','🥫','🥛'];
          ?>
          <div class="milk-card">
            <div class="milk-icon animate-float" style="animation-delay:<?php echo ($i-1)*.3; ?>s"><?php echo $icons[$i-1]; ?></div>
            <div class="milk-badge"><span data-lang="en"><?php echo esc_html($badge); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($badge_ar); ?></span></div>
            <div class="milk-size"><span data-lang="en"><?php echo esc_html($size); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($size_ar); ?></span></div>
            <p class="milk-desc"><span data-lang="en"><?php echo esc_html($desc); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($desc_ar); ?></span></p>
            <a href="#quote" class="btn-gold" style="width:100%;justify-content:center;">
              <span data-lang="en">Get Price</span><span data-lang="ar" style="display:none;">احصل على السعر</span>
            </a>
          </div>
        <?php endfor; ?>
      </div>
    </div>

  </div>
</section>
