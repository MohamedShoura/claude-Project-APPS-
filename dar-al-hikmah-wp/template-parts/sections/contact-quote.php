<?php
$phone  = dah_opt('dah_phone','+971 50 000 0000');
$phone2 = dah_opt('dah_phone2','+971 55 000 0000');
$email  = dah_opt('dah_email','info@daralhikmah.ae');
$email2 = dah_opt('dah_email2','sales@daralhikmah.ae');
$addr   = dah_opt('dah_address','Dubai, United Arab Emirates');
$addr_ar= dah_opt('dah_address_ar','دبي، الإمارات العربية المتحدة');
$hrs    = dah_opt('dah_hours','Mon–Fri: 8:00 AM – 6:00 PM');
$hrs_ar = dah_opt('dah_hours_ar','الاثنين–الجمعة: 8 ص – 6 م');
$products_en = ['Imported Rice','Tomato Paste','Coffee Beans','Cheese','Dairy Products','Jam','Frozen Fish','Olives','Honey','Milk Powder (25 KG Bags)','Milk Powder (10 KG Cans)','Milk Powder (5 KG Cans)'];
$products_ar = ['أرز مستورد','معجون الطماطم','حبوب القهوة','جبنة','منتجات الألبان','مربى','سمك مجمد','زيتون','عسل','حليب بودرة (أكياس 25 كغ)','حليب بودرة (علب 10 كغ)','حليب بودرة (علب 5 كغ)'];
?>

<!-- QUOTE SECTION -->
<section id="quote" class="section section--green">
  <div class="glow-bg-center"></div>
  <div class="container">

    <div class="text-center">
      <span class="section-label"><span data-lang="en">Get Started</span><span data-lang="ar" style="display:none;">ابدأ الآن</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>Request a </span><span class="text-gold">Free Quote</span></span>
        <span data-lang="ar" style="display:none;"><span>طلب </span><span class="text-gold">عرض سعر مجاني</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">Tell us your requirements and our team will respond within 24 hours.</span>
        <span data-lang="ar" style="display:none;">أخبرنا عن متطلباتك وسيرد فريقنا خلال 24 ساعة.</span>
      </p>
    </div>

    <div style="max-width:800px;margin:0 auto;">
      <form class="form-wrap dah-form" id="quote-form">
        <input type="hidden" name="form_type" value="quote">
        <input type="hidden" name="nonce" value="">
        <script>document.getElementById('quote-form').querySelector('[name="nonce"]').value=dahFormNonce;</script>

        <div class="form-grid" style="margin-bottom:20px;">
          <div class="form-group">
            <label class="form-label"><span data-lang="en">Full Name *</span><span data-lang="ar" style="display:none;">الاسم الكامل *</span></label>
            <input type="text" name="name" class="form-input" required placeholder="Your full name">
          </div>
          <div class="form-group">
            <label class="form-label"><span data-lang="en">Company Name</span><span data-lang="ar" style="display:none;">اسم الشركة</span></label>
            <input type="text" name="company" class="form-input" placeholder="Your company">
          </div>
          <div class="form-group">
            <label class="form-label"><span data-lang="en">Email *</span><span data-lang="ar" style="display:none;">البريد الإلكتروني *</span></label>
            <input type="email" name="email" class="form-input" required placeholder="you@company.com">
          </div>
          <div class="form-group">
            <label class="form-label"><span data-lang="en">Phone / WhatsApp *</span><span data-lang="ar" style="display:none;">الهاتف / واتساب *</span></label>
            <input type="tel" name="phone" class="form-input" required placeholder="+971 50 000 0000">
          </div>
          <div class="form-group">
            <label class="form-label"><span data-lang="en">Product Required *</span><span data-lang="ar" style="display:none;">المنتج المطلوب *</span></label>
            <select name="product" class="form-select" required>
              <option value="">-- Select --</option>
              <?php foreach ($products_en as $i => $p): ?>
                <option value="<?php echo esc_attr($p); ?>"><?php echo esc_html($p); ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label"><span data-lang="en">Quantity / Volume</span><span data-lang="ar" style="display:none;">الكمية / الحجم</span></label>
            <input type="text" name="quantity" class="form-input" placeholder="e.g. 500 KG, 100 cartons">
          </div>
        </div>

        <div class="form-group" style="margin-bottom:24px;">
          <label class="form-label"><span data-lang="en">Additional Notes</span><span data-lang="ar" style="display:none;">ملاحظات إضافية</span></label>
          <textarea name="message" class="form-textarea" placeholder="Tell us more about your requirements..."></textarea>
        </div>

        <div class="form-submit-row">
          <button type="submit" class="btn-gold">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            <span data-lang="en">Submit Quote Request</span>
            <span data-lang="ar" style="display:none;">إرسال طلب العرض</span>
          </button>
          <a href="<?php echo esc_url(dah_wa_link('Hello, I would like to request a quote.')); ?>" target="_blank" style="color:#4ade80;font-size:14px;font-weight:700;display:flex;align-items:center;gap:8px;">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            <span data-lang="en">Or WhatsApp Us</span>
            <span data-lang="ar" style="display:none;">أو راسلنا على واتساب</span>
          </a>
        </div>
      </form>
    </div>
  </div>
</section>

<!-- CONTACT SECTION -->
<section id="contact" class="section section--pattern">
  <div class="glow-bg-br"></div>
  <div class="container">

    <div class="text-center">
      <span class="section-label"><span data-lang="en">Get In Touch</span><span data-lang="ar" style="display:none;">تواصل معنا</span></span>
      <h2 class="section-title">
        <span data-lang="en"><span>Contact </span><span class="text-gold">Our Team</span></span>
        <span data-lang="ar" style="display:none;"><span>تواصل مع </span><span class="text-gold">فريقنا</span></span>
      </h2>
      <div class="divider-gold"></div>
      <p class="section-subtitle">
        <span data-lang="en">Reach out to discuss supply needs, get a product catalog, or start a partnership.</span>
        <span data-lang="ar" style="display:none;">تواصل معنا لمناقشة احتياجات التوريد أو الحصول على كتالوج المنتجات.</span>
      </p>
    </div>

    <div class="contact-grid">

      <!-- Info -->
      <div>
        <div class="contact-info-cards">
          <?php
          $info = [
            ['📍','Office Location','موقع المكتب', $addr, $addr_ar],
            ['📞','Phone & WhatsApp','الهاتف والواتساب', $phone."\n".$phone2, $phone."\n".$phone2],
            ['📧','Email Address','البريد الإلكتروني', $email."\n".$email2, $email."\n".$email2],
            ['🕒','Business Hours','ساعات العمل', $hrs, $hrs_ar],
          ];
          foreach ($info as [$icon,$label_en,$label_ar,$val_en,$val_ar]): ?>
            <div class="contact-info-card card-glass">
              <div class="contact-info-icon"><?php echo $icon; ?></div>
              <div>
                <div class="contact-info-label"><span data-lang="en"><?php echo $label_en; ?></span><span data-lang="ar" style="display:none;"><?php echo $label_ar; ?></span></div>
                <?php foreach (explode("\n", $val_en) as $l): ?>
                  <div class="contact-info-line" data-lang="en"><?php echo esc_html($l); ?></div>
                <?php endforeach; ?>
                <?php foreach (explode("\n", $val_ar) as $l): ?>
                  <div class="contact-info-line" data-lang="ar" style="display:none;"><?php echo esc_html($l); ?></div>
                <?php endforeach; ?>
              </div>
            </div>
          <?php endforeach; ?>
        </div>

        <a href="<?php echo esc_url(dah_wa_link()); ?>" target="_blank" class="wa-cta">
          <svg width="28" height="28" fill="#25D366" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          <div class="wa-cta-text">
            <strong><span data-lang="en">Chat on WhatsApp</span><span data-lang="ar" style="display:none;">تحدث على واتساب</span></strong>
            <span><span data-lang="en">Instant response during business hours</span><span data-lang="ar" style="display:none;">استجابة فورية خلال ساعات العمل</span></span>
          </div>
        </a>
      </div>

      <!-- Form -->
      <div>
        <form class="form-wrap dah-form" id="contact-form">
          <input type="hidden" name="form_type" value="contact">
          <input type="hidden" name="nonce" value="">
          <script>document.getElementById('contact-form').querySelector('[name="nonce"]').value=dahFormNonce;</script>

          <div class="form-grid" style="margin-bottom:20px;">
            <div class="form-group">
              <label class="form-label"><span data-lang="en">Name *</span><span data-lang="ar" style="display:none;">الاسم *</span></label>
              <input type="text" name="name" class="form-input" required placeholder="Your name">
            </div>
            <div class="form-group">
              <label class="form-label"><span data-lang="en">Email *</span><span data-lang="ar" style="display:none;">البريد الإلكتروني *</span></label>
              <input type="email" name="email" class="form-input" required placeholder="you@email.com">
            </div>
          </div>
          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label"><span data-lang="en">Subject</span><span data-lang="ar" style="display:none;">الموضوع</span></label>
            <input type="text" name="subject" class="form-input" placeholder="How can we help?">
          </div>
          <div class="form-group" style="margin-bottom:24px;">
            <label class="form-label"><span data-lang="en">Message *</span><span data-lang="ar" style="display:none;">الرسالة *</span></label>
            <textarea name="message" class="form-textarea" required placeholder="Your message..." style="min-height:150px;"></textarea>
          </div>
          <button type="submit" class="btn-gold" style="width:100%;justify-content:center;">
            <span data-lang="en">Send Message</span>
            <span data-lang="ar" style="display:none;">إرسال الرسالة</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
