<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
?>

      <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

        <div class="row">
          <div class="col col2">
            <h1 class="section-title"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>
          </div>
        </div>

        <div class="row">
          <div class="col col1">
            <?php the_content(); ?>
          </div>
          <div class="col col1">
          </div>
        </div>

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