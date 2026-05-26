<?php
$phone   = dah_opt('dah_phone', '+971 50 000 0000');
$email   = dah_opt('dah_email', 'info@daralhikmah.ae');
$address = dah_opt('dah_address', 'Dubai, United Arab Emirates');
$address_ar = dah_opt('dah_address_ar', 'دبي، الإمارات العربية المتحدة');
$hours   = dah_opt('dah_hours', 'Mon–Sat: 8 AM – 6 PM');
$hours_ar = dah_opt('dah_hours_ar', 'الاثنين–السبت: 8 ص – 6 م');
?>
<!-- FOOTER -->
<footer id="site-footer">
  <div class="container">
    <div class="footer-grid">

      <!-- Brand -->
      <div>
        <div class="footer-brand-logo">
          <?php if (has_custom_logo()):
            the_custom_logo();
          else: ?>
            <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#C9A440,#A07828);display:flex;align-items:center;justify-content:center;font-weight:900;color:#0a0a0a;font-size:13px;border:2px solid #C9A440;">DAH</div>
          <?php endif; ?>
          <div>
            <div style="font-weight:700;font-size:14px;color:#C9A440;">
              <span data-lang="en"><?php bloginfo('name'); ?></span>
              <span data-lang="ar" style="display:none;">دار الحكمة</span>
            </div>
            <div style="font-size:11px;color:#6b7280;">
              <span data-lang="en">Trading LLC</span>
              <span data-lang="ar" style="display:none;">للتجارة ذ.م.م</span>
            </div>
          </div>
        </div>
        <p class="footer-tagline">
          <span data-lang="en"><?php echo esc_html(get_bloginfo('description') ?: 'Premium imported food products and trusted commercial trading solutions.'); ?></span>
          <span data-lang="ar" style="display:none;">منتجات غذائية مستوردة متميزة وحلول تجارية موثوقة.</span>
        </p>
        <div style="font-size:11px;color:#A07828;font-weight:700;text-transform:uppercase;letter-spacing:.15em;margin-bottom:10px;" data-lang="en">Follow Us</div>
        <div style="font-size:11px;color:#A07828;font-weight:700;text-transform:uppercase;letter-spacing:.15em;margin-bottom:10px;display:none;" data-lang="ar">تابعنا</div>
        <div class="footer-social">
          <a href="#">In</a><a href="#">Li</a><a href="#">X</a>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <div class="footer-col-title"><span data-lang="en">Quick Links</span><span data-lang="ar" style="display:none;">روابط سريعة</span></div>
        <div class="footer-links">
          <?php
          $links_en = ['Home','About','Products','Partners','Services','Why Us','Contact'];
          $links_ar = ['الرئيسية','من نحن','المنتجات','الشراكات','الخدمات','لماذا نحن','اتصل بنا'];
          $ids      = ['home','about','products','partners','services','why-us','contact'];
          foreach ($links_en as $i => $label): ?>
            <a href="#<?php echo $ids[$i]; ?>">
              <span data-lang="en"><?php echo $label; ?></span>
              <span data-lang="ar" style="display:none;"><?php echo $links_ar[$i]; ?></span>
            </a>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Products -->
      <div>
        <div class="footer-col-title"><span data-lang="en">Products</span><span data-lang="ar" style="display:none;">المنتجات</span></div>
        <div class="footer-links">
          <?php
          $products_en = ['Imported Rice','Tomato Paste','Coffee Beans','Cheese','Milk Powder','Frozen Fish','Olives','Honey'];
          $products_ar = ['أرز مستورد','معجون الطماطم','حبوب القهوة','جبنة','حليب بودرة','سمك مجمد','زيتون','عسل'];
          foreach ($products_en as $i => $p): ?>
            <a href="#products">
              <span data-lang="en"><?php echo $p; ?></span>
              <span data-lang="ar" style="display:none;"><?php echo $products_ar[$i]; ?></span>
            </a>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Contact -->
      <div>
        <div class="footer-col-title"><span data-lang="en">Contact Info</span><span data-lang="ar" style="display:none;">معلومات الاتصال</span></div>
        <div class="footer-contact-item">📍 <span><span data-lang="en"><?php echo esc_html($address); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($address_ar); ?></span></span></div>
        <div class="footer-contact-item">📞 <?php echo esc_html($phone); ?></div>
        <div class="footer-contact-item">📧 <?php echo esc_html($email); ?></div>
        <div class="footer-contact-item">🕒 <span><span data-lang="en"><?php echo esc_html($hours); ?></span><span data-lang="ar" style="display:none;"><?php echo esc_html($hours_ar); ?></span></span></div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div>
        <span data-lang="en">© <?php echo date('Y'); ?> Dar Al Hikmah Trading LLC. All rights reserved.</span>
        <span data-lang="ar" style="display:none;">© <?php echo date('Y'); ?> دار الحكمة للتجارة ذ.م.م. جميع الحقوق محفوظة.</span>
      </div>
      <div class="footer-bottom-links">
        <a href="#"><span data-lang="en">Privacy Policy</span><span data-lang="ar" style="display:none;">سياسة الخصوصية</span></a>
        <a href="#"><span data-lang="en">Terms of Service</span><span data-lang="ar" style="display:none;">شروط الخدمة</span></a>
      </div>
      <div style="color:#374151;font-size:12px;">
        <span data-lang="en">UAE Licensed Company</span>
        <span data-lang="ar" style="display:none;">شركة مرخصة في الإمارات</span>
      </div>
    </div>
  </div>
</footer>

<!-- WhatsApp Float -->
<a id="wa-float" href="<?php echo esc_url(dah_wa_link()); ?>" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
</a>
<div id="wa-tooltip">
  <span data-lang="en">Chat on WhatsApp</span>
  <span data-lang="ar" style="display:none;">تحدث على واتساب</span>
</div>

<?php wp_footer(); ?>
</body>
</html>
