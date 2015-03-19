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
          <h1 class="section-title"><a href="<?php echo get_post_type_archive_link(get_post_type()); ?>"><?php post_type_archive_title(); ?></a></h1>
        </div>
        <div class="u-cf"></div>
      </div> 
    </div>

<?php
if( have_posts() ) {
?>
    <div class="container feed">
      <div class="grid-sizer"></div>
      <div class="gutter-sizer"></div>
<?php
  while( have_posts() ) {
    the_post();
    $thumb_id = get_post_thumbnail_id();
    $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'feed', true);
    $thumb_url = $thumb_url_array[0];
?>

        <article <?php post_class('item col col1'); ?> id="post-<?php the_ID(); ?>">
          <a href="<?php the_permalink(); ?>">
            <h1 class="secondary"><?php the_title(); ?></h1>
            <img src="<?php echo $thumb_url; ?>" />
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
      <article class="u-alert col col1"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
    </div>
<?php
} ?>

  <!-- end posts -->

    </div>

  </section>

  <?php get_template_part('partials/pagination'); ?>

<!-- end main-content -->

</main>

<?php
get_footer();
?>