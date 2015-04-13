<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">
      <div class="row">
        <div class="col col1">
          <h1 class="section-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h1>
        </div>
        <div class="u-cf"></div>
      </div> 
    </div>

<?php
if( have_posts() ) {
?>
    <div class="container js-masonry">
      <div class="grid-sizer"></div>
      <div class="gutter-sizer"></div>
<?php
$tumblr_uri = 'fruitmilkblog.tumblr.com';
$tumblr_limit = '10';
$tumblr_type = 'text';
$tumblr_apikey = 'IOB9uwQ7SgRUYoBr8LGNiXr4jTHK4DUzhGNCDcTd6XQjQ6ikKD';
$url = 'http://api.tumblr.com/v2/blog/'.$tumblr_uri.'/posts/'.$tumblr_type.'?limit='.$tumblr_limit.'&api_key='.$tumblr_apikey;

$results = json_decode(file_get_contents($url), true);

for ($i = 0; $i < $tumblr_limit; ++$i) {
  $item = $results['response']['posts'][$i]; 
?>
        <div class="item col1 tumblr">
          <?php echo $item['body']; ?>
        </div>
<?php }  ?> 
        <div class="item col1">
          <a href="http://<?php echo $tumblr_uri; ?>">
            <?php the_content(); ?>
          </a>
        </div>
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