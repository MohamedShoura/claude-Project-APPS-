<?php get_header(); ?>
<div class="container" style="padding-top:120px;padding-bottom:80px;">
  <?php if (have_posts()): while (have_posts()): the_post(); ?>
    <article style="border:1px solid rgba(201,164,64,.2);border-radius:16px;padding:32px;margin-bottom:24px;background:rgba(255,255,255,.03);">
      <h2 style="color:#fff;margin-bottom:12px;font-size:22px;"><a href="<?php the_permalink(); ?>" style="color:#E8C96B;"><?php the_title(); ?></a></h2>
      <div style="color:#9ca3af;font-size:14px;margin-bottom:16px;"><?php echo get_the_date(); ?></div>
      <div style="color:#d1d5db;"><?php the_excerpt(); ?></div>
    </article>
  <?php endwhile; else: ?>
    <p style="color:#9ca3af;text-align:center;padding:60px 0;">No posts found.</p>
  <?php endif; ?>
</div>
<?php get_footer(); ?>
