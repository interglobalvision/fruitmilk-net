<?php
get_header();

$post_type = get_post_type();
if ($post_type == 'press') {
  $press_link = get_post_meta( $post->ID, '_igv_press_link', true );
}
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">
      <div class="row">
        <div class="col col2">
          <h2 class="section-title"><a href="<?php echo get_post_type_archive_link($post_type); ?>" class="js-ajax-link"><?php post_type_archive_title(); ?></a></h2>
        </div>
      </div>
    </div>

<?php
if( have_posts() ) {
?>
    <div class="container js-masonry">
      <div class="grid-sizer"></div>
      <div class="gutter-sizer"></div>
<?php
  while( have_posts() ) {
    the_post();
    $thumb_id = get_post_thumbnail_id();
    $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'feed', true);
    $thumb_url = $thumb_url_array[0];
?>

        <article <?php post_class('item col1 archive-item'); ?> id="post-<?php the_ID(); ?>">
          <a href="<?php if ($post_type == 'press') { echo $press_link.'" target="_blank'; } else { the_permalink(); } ?>" class="js-ajax-link">
            <img src="<?php echo $thumb_url; ?>" class="archive-thumb" />
            <h2 class="item-title color-secondary"><?php the_title(); ?></h1>
          </a>
        </article>

<?php
    }
?>
    </div>
<?php
} else {
?>
    <div class="container">
      <div class="row">
        <article class="u-alert col col2"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
      </div>
    </div>
<?php
} ?>

  <!-- end posts -->

    </div>

  </section>

  <?php get_template_part('partials/pagination'); ?>

<!-- end main-content -->

<?php get_template_part('partials/pagefooter'); ?>

</main>

<?php
get_footer();
?>