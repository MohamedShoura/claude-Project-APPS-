<?php
/**
 * Dar Al Hikmah Trading — functions.php
 */

defined('ABSPATH') || exit;

/* ══════════════════════════════════════════
   THEME SETUP
   ══════════════════════════════════════════ */
function dah_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 100,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption']);
    add_theme_support('editor-styles');

    load_theme_textdomain('dah', get_template_directory() . '/languages');

    register_nav_menus(['primary' => __('Primary Menu', 'dah')]);
}
add_action('after_setup_theme', 'dah_setup');

/* ══════════════════════════════════════════
   ENQUEUE SCRIPTS & STYLES
   ══════════════════════════════════════════ */
function dah_scripts() {
    wp_enqueue_style('dah-main', get_template_directory_uri() . '/assets/css/main.css', [], '1.0.0');
    wp_enqueue_script('dah-main', get_template_directory_uri() . '/assets/js/main.js', [], '1.0.0', true);
    wp_localize_script('dah-main', 'dahAjax', ['url' => admin_url('admin-ajax.php')]);
}
add_action('wp_enqueue_scripts', 'dah_scripts');

/* ══════════════════════════════════════════
   CUSTOM POST TYPES
   ══════════════════════════════════════════ */
function dah_register_cpts() {

    /* Products */
    register_post_type('dah_product', [
        'labels' => [
            'name'               => __('Products', 'dah'),
            'singular_name'      => __('Product', 'dah'),
            'add_new'            => __('Add New Product', 'dah'),
            'add_new_item'       => __('Add New Product', 'dah'),
            'edit_item'          => __('Edit Product', 'dah'),
            'menu_name'          => __('Products', 'dah'),
        ],
        'public'            => true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'menu_position'     => 5,
        'menu_icon'         => 'dashicons-products',
        'supports'          => ['title', 'editor', 'thumbnail', 'excerpt'],
        'has_archive'       => false,
        'show_in_rest'      => true,
    ]);

    /* Product Categories */
    register_taxonomy('dah_product_cat', 'dah_product', [
        'labels' => [
            'name'          => __('Product Categories', 'dah'),
            'singular_name' => __('Category', 'dah'),
            'add_new_item'  => __('Add Category', 'dah'),
            'menu_name'     => __('Categories', 'dah'),
        ],
        'hierarchical'   => true,
        'show_ui'        => true,
        'show_in_rest'   => true,
        'show_admin_col' => true,
    ]);

    /* Partners / Agencies */
    register_post_type('dah_partner', [
        'labels' => [
            'name'          => __('Partners & Agencies', 'dah'),
            'singular_name' => __('Partner', 'dah'),
            'add_new'       => __('Add Partner', 'dah'),
            'add_new_item'  => __('Add New Partner', 'dah'),
            'edit_item'     => __('Edit Partner', 'dah'),
            'menu_name'     => __('Partners', 'dah'),
        ],
        'public'        => true,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'menu_position' => 6,
        'menu_icon'     => 'dashicons-groups',
        'supports'      => ['title', 'editor', 'thumbnail'],
        'has_archive'   => false,
        'show_in_rest'  => true,
    ]);

    /* Testimonials */
    register_post_type('dah_testimonial', [
        'labels' => [
            'name'          => __('Testimonials', 'dah'),
            'singular_name' => __('Testimonial', 'dah'),
            'add_new'       => __('Add Testimonial', 'dah'),
            'menu_name'     => __('Testimonials', 'dah'),
        ],
        'public'        => false,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'menu_position' => 7,
        'menu_icon'     => 'dashicons-format-quote',
        'supports'      => ['title', 'editor'],
        'has_archive'   => false,
        'show_in_rest'  => true,
    ]);

    /* Services */
    register_post_type('dah_service', [
        'labels' => [
            'name'          => __('Services', 'dah'),
            'singular_name' => __('Service', 'dah'),
            'add_new'       => __('Add Service', 'dah'),
            'menu_name'     => __('Services', 'dah'),
        ],
        'public'        => false,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'menu_position' => 8,
        'menu_icon'     => 'dashicons-clipboard',
        'supports'      => ['title', 'editor'],
        'has_archive'   => false,
        'show_in_rest'  => true,
    ]);
}
add_action('init', 'dah_register_cpts');

/* ══════════════════════════════════════════
   META BOXES
   ══════════════════════════════════════════ */
function dah_add_meta_boxes() {
    /* Product meta */
    add_meta_box('dah_product_meta', __('Product Details', 'dah'), 'dah_product_meta_cb', 'dah_product', 'normal', 'high');
    /* Partner meta */
    add_meta_box('dah_partner_meta', __('Partner Details', 'dah'), 'dah_partner_meta_cb', 'dah_partner', 'normal', 'high');
    /* Testimonial meta */
    add_meta_box('dah_testimonial_meta', __('Testimonial Details', 'dah'), 'dah_testimonial_meta_cb', 'dah_testimonial', 'normal', 'high');
    /* Service meta */
    add_meta_box('dah_service_meta', __('Service Details', 'dah'), 'dah_service_meta_cb', 'dah_service', 'normal', 'high');
}
add_action('add_meta_boxes', 'dah_add_meta_boxes');

function dah_product_meta_cb($post) {
    wp_nonce_field('dah_product_nonce', 'dah_nonce');
    $emoji  = get_post_meta($post->ID, '_dah_emoji', true) ?: '🍅';
    $badge  = get_post_meta($post->ID, '_dah_badge', true) ?: 'Imported';
    $badge_ar = get_post_meta($post->ID, '_dah_badge_ar', true);
    $title_ar = get_post_meta($post->ID, '_dah_title_ar', true);
    $desc_ar  = get_post_meta($post->ID, '_dah_desc_ar', true);
    $order  = get_post_meta($post->ID, '_dah_order', true) ?: 0;
    ?>
    <table class="form-table">
        <tr><th><?php _e('Emoji Icon','dah'); ?></th><td><input type="text" name="dah_emoji" value="<?php echo esc_attr($emoji); ?>" style="width:80px;font-size:24px;" /></td></tr>
        <tr><th><?php _e('Badge (EN)','dah'); ?></th><td><input type="text" name="dah_badge" value="<?php echo esc_attr($badge); ?>" /></td></tr>
        <tr><th><?php _e('Badge (AR)','dah'); ?></th><td><input type="text" name="dah_badge_ar" value="<?php echo esc_attr($badge_ar); ?>" dir="rtl" /></td></tr>
        <tr><th><?php _e('Title (Arabic)','dah'); ?></th><td><input type="text" name="dah_title_ar" value="<?php echo esc_attr($title_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Description (Arabic)','dah'); ?></th><td><textarea name="dah_desc_ar" dir="rtl" rows="3" style="width:100%;"><?php echo esc_textarea($desc_ar); ?></textarea></td></tr>
        <tr><th><?php _e('Display Order','dah'); ?></th><td><input type="number" name="dah_order" value="<?php echo esc_attr($order); ?>" style="width:80px;" /></td></tr>
    </table>
    <?php
}

function dah_partner_meta_cb($post) {
    wp_nonce_field('dah_partner_nonce', 'dah_partner_nonce_field');
    $location = get_post_meta($post->ID, '_dah_location', true);
    $flag     = get_post_meta($post->ID, '_dah_flag', true) ?: '🇦🇪';
    $type     = get_post_meta($post->ID, '_dah_type', true);
    $icon     = get_post_meta($post->ID, '_dah_icon', true) ?: '🏢';
    $tags     = get_post_meta($post->ID, '_dah_tags', true);
    $name_ar  = get_post_meta($post->ID, '_dah_name_ar', true);
    $type_ar  = get_post_meta($post->ID, '_dah_type_ar', true);
    $desc_ar  = get_post_meta($post->ID, '_dah_desc_ar', true);
    $tags_ar  = get_post_meta($post->ID, '_dah_tags_ar', true);
    $location_ar = get_post_meta($post->ID, '_dah_location_ar', true);
    $border_class = get_post_meta($post->ID, '_dah_border_class', true) ?: 'border-blue-700/30';
    $color_class  = get_post_meta($post->ID, '_dah_color_class', true) ?: 'from-blue-900/20 to-yellow-900/10';
    ?>
    <table class="form-table">
        <tr><th><?php _e('Icon Emoji','dah'); ?></th><td><input type="text" name="dah_icon" value="<?php echo esc_attr($icon); ?>" style="width:80px;font-size:24px;" /></td></tr>
        <tr><th><?php _e('Country Flag','dah'); ?></th><td><input type="text" name="dah_flag" value="<?php echo esc_attr($flag); ?>" style="width:80px;font-size:24px;" /></td></tr>
        <tr><th><?php _e('Location (EN)','dah'); ?></th><td><input type="text" name="dah_location" value="<?php echo esc_attr($location); ?>" /></td></tr>
        <tr><th><?php _e('Location (AR)','dah'); ?></th><td><input type="text" name="dah_location_ar" value="<?php echo esc_attr($location_ar); ?>" dir="rtl" /></td></tr>
        <tr><th><?php _e('Partnership Type (EN)','dah'); ?></th><td><input type="text" name="dah_type" value="<?php echo esc_attr($type); ?>" /></td></tr>
        <tr><th><?php _e('Partnership Type (AR)','dah'); ?></th><td><input type="text" name="dah_type_ar" value="<?php echo esc_attr($type_ar); ?>" dir="rtl" /></td></tr>
        <tr><th><?php _e('Tags (EN, comma-separated)','dah'); ?></th><td><input type="text" name="dah_tags" value="<?php echo esc_attr($tags); ?>" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Tags (AR, comma-separated)','dah'); ?></th><td><input type="text" name="dah_tags_ar" value="<?php echo esc_attr($tags_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Name (Arabic)','dah'); ?></th><td><input type="text" name="dah_name_ar" value="<?php echo esc_attr($name_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Description (Arabic)','dah'); ?></th><td><textarea name="dah_desc_ar" dir="rtl" rows="3" style="width:100%;"><?php echo esc_textarea($desc_ar); ?></textarea></td></tr>
    </table>
    <?php
}

function dah_testimonial_meta_cb($post) {
    wp_nonce_field('dah_test_nonce', 'dah_test_nonce_field');
    $role   = get_post_meta($post->ID, '_dah_role', true);
    $rating = get_post_meta($post->ID, '_dah_rating', true) ?: 5;
    $name_ar = get_post_meta($post->ID, '_dah_name_ar', true);
    $role_ar = get_post_meta($post->ID, '_dah_role_ar', true);
    $text_ar = get_post_meta($post->ID, '_dah_text_ar', true);
    ?>
    <table class="form-table">
        <tr><th><?php _e('Role / Company (EN)','dah'); ?></th><td><input type="text" name="dah_role" value="<?php echo esc_attr($role); ?>" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Rating (1-5)','dah'); ?></th><td><input type="number" name="dah_rating" value="<?php echo esc_attr($rating); ?>" min="1" max="5" style="width:80px;" /></td></tr>
        <tr><th><?php _e('Name (Arabic)','dah'); ?></th><td><input type="text" name="dah_name_ar" value="<?php echo esc_attr($name_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Role (Arabic)','dah'); ?></th><td><input type="text" name="dah_role_ar" value="<?php echo esc_attr($role_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Testimonial (Arabic)','dah'); ?></th><td><textarea name="dah_text_ar" dir="rtl" rows="3" style="width:100%;"><?php echo esc_textarea($text_ar); ?></textarea></td></tr>
    </table>
    <?php
}

function dah_service_meta_cb($post) {
    wp_nonce_field('dah_svc_nonce', 'dah_svc_nonce_field');
    $icon     = get_post_meta($post->ID, '_dah_icon', true) ?: '🏪';
    $features = get_post_meta($post->ID, '_dah_features', true);
    $title_ar = get_post_meta($post->ID, '_dah_title_ar', true);
    $desc_ar  = get_post_meta($post->ID, '_dah_desc_ar', true);
    $feat_ar  = get_post_meta($post->ID, '_dah_features_ar', true);
    $order    = get_post_meta($post->ID, '_dah_order', true) ?: 0;
    ?>
    <table class="form-table">
        <tr><th><?php _e('Icon Emoji','dah'); ?></th><td><input type="text" name="dah_icon" value="<?php echo esc_attr($icon); ?>" style="width:80px;font-size:24px;" /></td></tr>
        <tr><th><?php _e('Features (EN, comma-separated)','dah'); ?></th><td><input type="text" name="dah_features" value="<?php echo esc_attr($features); ?>" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Features (AR, comma-separated)','dah'); ?></th><td><input type="text" name="dah_features_ar" value="<?php echo esc_attr($feat_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Title (Arabic)','dah'); ?></th><td><input type="text" name="dah_title_ar" value="<?php echo esc_attr($title_ar); ?>" dir="rtl" style="width:100%;" /></td></tr>
        <tr><th><?php _e('Description (Arabic)','dah'); ?></th><td><textarea name="dah_desc_ar" dir="rtl" rows="3" style="width:100%;"><?php echo esc_textarea($desc_ar); ?></textarea></td></tr>
        <tr><th><?php _e('Display Order','dah'); ?></th><td><input type="number" name="dah_order" value="<?php echo esc_attr($order); ?>" style="width:80px;" /></td></tr>
    </table>
    <?php
}

/* ── Save Meta Boxes ── */
function dah_save_product_meta($post_id) {
    if (!isset($_POST['dah_nonce']) || !wp_verify_nonce($_POST['dah_nonce'], 'dah_product_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    foreach (['dah_emoji'=>'_dah_emoji','dah_badge'=>'_dah_badge','dah_badge_ar'=>'_dah_badge_ar','dah_title_ar'=>'_dah_title_ar','dah_desc_ar'=>'_dah_desc_ar','dah_order'=>'_dah_order'] as $field => $meta_key) {
        if (isset($_POST[$field])) update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$field]));
    }
}
add_action('save_post_dah_product', 'dah_save_product_meta');

function dah_save_partner_meta($post_id) {
    if (!isset($_POST['dah_partner_nonce_field']) || !wp_verify_nonce($_POST['dah_partner_nonce_field'], 'dah_partner_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    $fields = ['dah_icon','dah_flag','dah_location','dah_location_ar','dah_type','dah_type_ar','dah_tags','dah_tags_ar','dah_name_ar','dah_desc_ar'];
    foreach ($fields as $field) {
        if (isset($_POST[$field])) update_post_meta($post_id, '_'.$field, sanitize_text_field($_POST[$field]));
    }
}
add_action('save_post_dah_partner', 'dah_save_partner_meta');

function dah_save_testimonial_meta($post_id) {
    if (!isset($_POST['dah_test_nonce_field']) || !wp_verify_nonce($_POST['dah_test_nonce_field'], 'dah_test_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    foreach (['dah_role','dah_rating','dah_name_ar','dah_role_ar','dah_text_ar'] as $f) {
        if (isset($_POST[$f])) update_post_meta($post_id, '_'.$f, sanitize_text_field($_POST[$f]));
    }
}
add_action('save_post_dah_testimonial', 'dah_save_testimonial_meta');

function dah_save_service_meta($post_id) {
    if (!isset($_POST['dah_svc_nonce_field']) || !wp_verify_nonce($_POST['dah_svc_nonce_field'], 'dah_svc_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    foreach (['dah_icon','dah_features','dah_features_ar','dah_title_ar','dah_desc_ar','dah_order'] as $f) {
        if (isset($_POST[$f])) update_post_meta($post_id, '_'.$f, sanitize_text_field($_POST[$f]));
    }
}
add_action('save_post_dah_service', 'dah_save_service_meta');

/* ══════════════════════════════════════════
   THEME CUSTOMIZER
   ══════════════════════════════════════════ */
function dah_customizer($wp_customize) {

    /* Panel */
    $wp_customize->add_panel('dah_panel', ['title' => __('Dar Al Hikmah Settings','dah'), 'priority' => 30]);

    /* ── Company Info section ── */
    $wp_customize->add_section('dah_company', ['title' => __('Company Info','dah'), 'panel' => 'dah_panel']);
    $company_fields = [
        'dah_whatsapp'  => [__('WhatsApp Number','dah'), '+97150000000'],
        'dah_phone'     => [__('Phone Number','dah'), '+971 50 000 0000'],
        'dah_phone2'    => [__('Phone 2','dah'), '+971 55 000 0000'],
        'dah_email'     => [__('Email','dah'), 'info@daralhikmah.ae'],
        'dah_email2'    => [__('Email 2','dah'), 'sales@daralhikmah.ae'],
        'dah_address'   => [__('Address (EN)','dah'), 'Dubai, United Arab Emirates'],
        'dah_address_ar'=> [__('Address (AR)','dah'), 'دبي، الإمارات العربية المتحدة'],
        'dah_hours'     => [__('Hours (EN)','dah'), 'Mon–Fri: 8:00 AM – 6:00 PM'],
        'dah_hours_ar'  => [__('Hours (AR)','dah'), 'الاثنين–الجمعة: 8 ص – 6 م'],
    ];
    foreach ($company_fields as $id => [$label, $default]) {
        $wp_customize->add_setting($id, ['default' => $default, 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control($id, ['label' => $label, 'section' => 'dah_company', 'type' => 'text']);
    }

    /* ── Hero section ── */
    $wp_customize->add_section('dah_hero', ['title' => __('Hero Section','dah'), 'panel' => 'dah_panel']);
    $hero_fields = [
        'dah_hero_badge'     => [__('Badge Text (EN)','dah'), 'Premium Trading Company · UAE'],
        'dah_hero_badge_ar'  => [__('Badge Text (AR)','dah'), 'شركة تجارية متميزة · الإمارات'],
        'dah_hero_title_ar'  => [__('Hero Title (AR)','dah'), 'دار الحكمة للتجارة'],
        'dah_hero_sub'       => [__('Subtitle (EN)','dah'), 'Your premier partner for imported food products.'],
        'dah_hero_sub_ar'    => [__('Subtitle (AR)','dah'), 'شريكك الأمثل لاستيراد المواد الغذائية وتوزيعها.'],
        'dah_hero_words'     => [__('Typewriter Words (EN, comma-sep)','dah'), 'Quality,Excellence,Trust,Premium'],
        'dah_hero_words_ar'  => [__('Typewriter Words (AR, comma-sep)','dah'), 'مستوردة,متميزة,عالمية,راقية'],
        'dah_hero_bg_url'    => [__('Hero Background Image URL','dah'), ''],
        'dah_stat1_val'      => [__('Stat 1 Value','dah'), '500+'],
        'dah_stat1_label'    => [__('Stat 1 Label (EN)','dah'), 'Products'],
        'dah_stat2_val'      => [__('Stat 2 Value','dah'), '4'],
        'dah_stat2_label'    => [__('Stat 2 Label (EN)','dah'), 'Partnerships'],
        'dah_stat3_val'      => [__('Stat 3 Value','dah'), '10+'],
        'dah_stat3_label'    => [__('Stat 3 Label (EN)','dah'), 'Years Experience'],
    ];
    foreach ($hero_fields as $id => [$label, $default]) {
        $wp_customize->add_setting($id, ['default' => $default, 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control($id, ['label' => $label, 'section' => 'dah_hero', 'type' => 'text']);
    }

    /* ── About Section ── */
    $wp_customize->add_section('dah_about', ['title' => __('About Section','dah'), 'panel' => 'dah_panel']);
    $about_fields = [
        'dah_about_heading'    => [__('Heading (EN)','dah'), 'Your Trusted Partner for Premium Imported Food Products'],
        'dah_about_heading_ar' => [__('Heading (AR)','dah'), 'شريكك الموثوق لمنتجات غذائية مستوردة متميزة'],
        'dah_about_p1'         => [__('Paragraph 1 (EN)','dah'), 'Dar Al Hikmah Trading LLC is a distinguished trading company based in the UAE.'],
        'dah_about_p1_ar'      => [__('Paragraph 1 (AR)','dah'), 'دار الحكمة للتجارة ذ.م.م شركة تجارية متميزة مقرها الإمارات.'],
        'dah_about_p2'         => [__('Paragraph 2 (EN)','dah'), 'With a strong network of international agencies, we ensure our clients receive the finest quality products.'],
        'dah_about_p2_ar'      => [__('Paragraph 2 (AR)','dah'), 'بفضل شبكة واسعة من الوكالات الدولية، نضمن لعملائنا أرقى المنتجات.'],
        'dah_years_exp'        => [__('Years Experience','dah'), '10+'],
        'dah_agencies_count'   => [__('Agencies Count','dah'), '4'],
    ];
    foreach ($about_fields as $id => [$label, $default]) {
        $wp_customize->add_setting($id, ['default' => $default, 'sanitize_callback' => 'sanitize_textarea_field']);
        $wp_customize->add_control($id, ['label' => $label, 'section' => 'dah_about', 'type' => 'textarea']);
    }

    /* ── Milk Powder section ── */
    $wp_customize->add_section('dah_milk', ['title' => __('Milk Powder Section','dah'), 'panel' => 'dah_panel']);
    for ($i = 1; $i <= 3; $i++) {
        $sizes = ['25 KG Bags','10 KG Cans','5 KG Cans'];
        $sizes_ar = ['أكياس 25 كغ','علب 10 كغ','علب 5 كغ'];
        $badges = ['Industrial','Commercial','Retail'];
        $badges_ar = ['صناعي','تجاري','تجزئة'];
        $descs = ['Industrial bulk packaging.','Mid-size cans for catering.','Retail friendly packaging.'];
        $descs_ar = ['تغليف صناعي ضخم.','علب متوسطة للتموين.','تغليف مناسب للتجزئة.'];
        $wp_customize->add_setting("dah_milk_{$i}_size",    ['default' => $sizes[$i-1],    'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_setting("dah_milk_{$i}_size_ar", ['default' => $sizes_ar[$i-1], 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_setting("dah_milk_{$i}_badge",   ['default' => $badges[$i-1],   'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_setting("dah_milk_{$i}_badge_ar",['default' => $badges_ar[$i-1],'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_setting("dah_milk_{$i}_desc",    ['default' => $descs[$i-1],    'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_setting("dah_milk_{$i}_desc_ar", ['default' => $descs_ar[$i-1], 'sanitize_callback' => 'sanitize_text_field']);
        foreach (["dah_milk_{$i}_size","dah_milk_{$i}_size_ar","dah_milk_{$i}_badge","dah_milk_{$i}_badge_ar","dah_milk_{$i}_desc","dah_milk_{$i}_desc_ar"] as $id) {
            $wp_customize->add_control($id, ['label' => $id, 'section' => 'dah_milk', 'type' => 'text']);
        }
    }

    /* ── Partners CTA ── */
    $wp_customize->add_section('dah_partners_cta', ['title' => __('Partners CTA Text','dah'), 'panel' => 'dah_panel']);
    foreach ([
        'dah_partners_cta_en' => [__('CTA Text (EN)','dah'), 'We are always open to new strategic partnerships.'],
        'dah_partners_cta_ar' => [__('CTA Text (AR)','dah'), 'نرحب دائماً بشراكات استراتيجية جديدة.'],
    ] as $id => [$label, $default]) {
        $wp_customize->add_setting($id, ['default' => $default, 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control($id, ['label' => $label, 'section' => 'dah_partners_cta', 'type' => 'text']);
    }

    /* ── Quote / Contact notification email ── */
    $wp_customize->add_section('dah_forms', ['title' => __('Forms & Email','dah'), 'panel' => 'dah_panel']);
    $wp_customize->add_setting('dah_notify_email', ['default' => get_option('admin_email'), 'sanitize_callback' => 'sanitize_email']);
    $wp_customize->add_control('dah_notify_email', ['label' => __('Notification Email','dah'), 'section' => 'dah_forms', 'type' => 'email']);
}
add_action('customize_register', 'dah_customizer');

/* ══════════════════════════════════════════
   AJAX FORM HANDLER
   ══════════════════════════════════════════ */
function dah_handle_form() {
    check_ajax_referer('dah_form_nonce', 'nonce');
    $to      = get_theme_mod('dah_notify_email', get_option('admin_email'));
    $type    = sanitize_text_field($_POST['form_type'] ?? 'contact');
    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $phone   = sanitize_text_field($_POST['phone'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');
    $product = sanitize_text_field($_POST['product'] ?? '');
    $company = sanitize_text_field($_POST['company'] ?? '');
    $qty     = sanitize_text_field($_POST['quantity'] ?? '');

    if (empty($name) || empty($email)) {
        wp_send_json_error(__('Please fill all required fields.','dah'));
    }

    $subject = $type === 'quote'
        ? "New Quote Request from {$name} — Dar Al Hikmah"
        : "New Contact Message from {$name} — Dar Al Hikmah";

    $body  = "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nCompany: {$company}\n";
    if ($product) $body .= "Product: {$product}\nQuantity: {$qty}\n";
    $body .= "Message:\n{$message}";

    wp_mail($to, $subject, $body, ["Reply-To: {$name} <{$email}>", 'Content-Type: text/plain; charset=UTF-8']);

    wp_send_json_success([
        'title'   => __('Message Sent!','dah'),
        'message' => sprintf(__('Thank you, %s. We will contact you within 24 hours.','dah'), esc_html($name)),
        'btn'     => __('Send Another','dah'),
    ]);
}
add_action('wp_ajax_dah_submit_form', 'dah_handle_form');
add_action('wp_ajax_nopriv_dah_submit_form', 'dah_handle_form');

/* ══════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════ */
function dah_opt($key, $default = '') { return get_theme_mod($key, $default); }

function dah_wa_link($text = '') {
    $num = preg_replace('/[^0-9]/', '', dah_opt('dah_whatsapp', '97150000000'));
    $msg = urlencode($text ?: 'Hello, I am interested in Dar Al Hikmah Trading products.');
    return "https://wa.me/{$num}?text={$msg}";
}

function dah_nonce_field() {
    wp_nonce_field('dah_form_nonce', 'nonce');
}

/* ── Add nonce to all pages ── */
function dah_inline_nonce() {
    echo '<script>var dahFormNonce="' . wp_create_nonce('dah_form_nonce') . '";</script>';
}
add_action('wp_head', 'dah_inline_nonce');

/* ── Excerpt length ── */
add_filter('excerpt_length', fn() => 20);
