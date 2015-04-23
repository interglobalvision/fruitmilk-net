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
          <h1 class="section-title">
            <a href="<?php the_permalink(); ?>" class="js-ajax-link"><?php the_title(); ?></a>
          </h1>
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
$tumblr_uri = 'fruitmilkblog.tumblr.com';
$tumblr_limit = '10';
$tumblr_apikey = 'IOB9uwQ7SgRUYoBr8LGNiXr4jTHK4DUzhGNCDcTd6XQjQ6ikKD';
$url = 'http://api.tumblr.com/v2/blog/'.$tumblr_uri.'/posts/?limit='.$tumblr_limit.'&api_key='.$tumblr_apikey;

$results = json_decode(file_get_contents($url), true);
$count = count($item = $results['response']['posts']);

for ($i = 0; $i < $count; ++$i) {
  $item = $results['response']['posts'][$i];
  $type = $results['response']['posts'][$i]['type'];
  if ($type == 'text') {
?>
        <div class="item col1">
          <span class="tumblr-meta">
            <a href="<?php echo $item['post_url']; ?>" target="_blank">
              <?php echo date('m/d/Y', $item['timestamp']); ?>
              ~*
              <?php echo $item['note_count']; ?> notes
            </a>
          </span>
          <h2 class="tumblr-title">
            <a href="<?php echo $item['post_url']; ?>" target="_blank">
              <?php echo $item['title']; ?>
            </a>
          </h2>
          <?php echo $item['body']; ?>
        </div>
<?php 
  }
  if ($type == 'photo') {
    $caption = $item['caption'];
?>
        <div class="item col1">
          <span class="tumblr-meta">
            <a href="<?php echo $item['post_url']; ?>" target="_blank">
              <?php echo date('m/d/Y', $item['timestamp']); ?>
              ~*
              <?php echo $item['note_count']; ?> notes
            </a>
          </span>
          <?php if ($caption) { ?>
          <h2 class="tumblr-title">
            <a href="<?php echo $item['post_url']; ?>" target="_blank">
              <?php echo strip_tags($caption); ?>
            </a>
          </h2>
          <?php } ?>
          <?php 
            $photos = $item['photos'];
            foreach ($photos as $photo) {
              echo '<p><img src="' . $photo['original_size']['url'] . '"/></p>';
            }
          ?>
        </div>
<?php
  }
}
  $link_text = get_the_content();
  if ($link_text) {
?>
        <div class="item col2 tumblr-link">
          <a href="http://<?php echo $tumblr_uri; ?>">
            <?php echo strip_tags($link_text); ?>
          </a>
        </div>
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

  </section>

  <?php get_template_part('partials/pagination'); ?>

<!-- end main-content -->

<?php get_template_part('partials/pagefooter'); ?>

</main>

<?php
get_footer();
?>