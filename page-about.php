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
    $meta = get_post_meta( get_the_id(), false);
    $services = $meta['_igv_services'];
    $email = $meta['_igv_email'];
?>

      <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

        <div class="row">
          <div class="col col2">
            <h1 class="section-title"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>
          </div>
          <div class="u-cf"></div>
        </div>

        <div class="row">
          <div class="col col1">
            <?php the_content(); ?>
          </div>
          <div class="col col1">
            <?php 
            if ($services) {
              echo $services[0];
            } ?>

            <p>
            <?php
            if ($email) {
              echo 'You can contact us at <a href="mailto:'.$email[0].'" target="_blank">'.$email[0].'</a> or subscribe to our mailing list:';
            } else {
              echo 'Subscribe to our mailing list:';
            }
            ?>
            </p>
            <form>
              <input id="email" type="text" placeholder="email">
              <input id="submit" type="submit" class="secondary" value="subscribe">
            </form>
            <div class="instagram"></div>
          </div>
          <div class="u-cf"></div>
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