<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">
      <div class="grid-sizer"></div>
      <div class="gutter-sizer"></div>

      <div class="row">
        <div class="col col2">
          <h1 class="section-title"><a href="<?php echo get_post_type_archive_link(get_post_type()); ?>"><?php post_type_archive_title(); ?></a></h1>
        </div>
      </div> 

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
?>

      <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

      </article>

<?php
  }
} else {
?>
    <article class="u-alert"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
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