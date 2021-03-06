<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">
      <div class="row">
        <div class="col col2">
          <h2 class="section-title">
            <a href="<?php echo get_post_type_archive_link(get_post_type()); ?>" class="js-ajax-link"><?php
              $post_type = get_post_type_object( get_post_type() ); 
              echo $post_type->label;
            ?></a>
          </h2>
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
    $dates = get_post_meta( $post->ID, '_igv_dates', true);
    $images = get_post_meta( $post->ID, '_igv_images', true);
?>
        <div <?php post_class('item col1'); ?> id="post-<?php the_ID(); ?>">
          <h1>
            <a href="<?php the_permalink(); ?>">
              <?php the_title(); ?>
            </a>
          </h1>
          <?php if ($dates) { echo '<p><em>'.$dates.'</em></p>'; } ?>
          <?php the_content(); ?>
        </div>
<?php
      if ($images) {
        foreach ($images as $image) {
          if ( array_key_exists('image_id', $image) ) {
            $image_id = (string)$image['image_id'];
            $attachment_src = wp_get_attachment_image_src( $image_id, 'feed' );
            $image_src = $attachment_src[0];
          } else {
            $image_src = $image['image'];
          }
?>
        <div class="item col1">
          <img src="<?php echo $image_src; ?>" />
        </div>
<?php
        }
      }
?>
<?php
    }
?>
    </div>
<?php
} else {
?>
    <div class="container">
      <article class="u-alert row">
        <div class="col col2">
          <?php _e('Sorry, no posts matched your criteria :{'); ?>
        </div>
      </article>
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