<meta name="description" content="<?php bloginfo('description'); ?>">

<meta name="twitter:site" value="@">
<?php
$args = array (
  'post_type'              => array( 'installations', 'collabs', 'press' )
);

$query = new WP_Query( $args );

if ( $query->have_posts() ) {
  while ( $query->have_posts() ) {
    $query->the_post();
    $excerpt = get_the_excerpt();
    if(has_post_thumbnail()) {
      $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'opengraph' );
    }
  }
} 

// Restore original Post Data
wp_reset_postdata();

if( is_single() ) {
?>
  <meta property="og:url" content="<?php the_permalink() ?>"/>
  <meta property="og:title" content="<?php single_post_title(''); ?>" />
  <meta property="og:description" content="<?php echo $excerpt ?>" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
<?php if( !empty($thumb) ) {
?>
  <meta property="og:image" content="<?php echo $thumb[0] ?>" />
<?php
} else {
?>
  <meta property="og:image" content="<?php bloginfo('stylesheet_directory'); ?>/img/og-image.jpg" />
<?php
}

} elseif( is_archive() ) {
?>
  <meta property="og:url" content="<?php the_permalink() ?>"/>
  <meta property="og:title" content="<?php post_type_archive_title(); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="<?php bloginfo('stylesheet_directory'); ?>/img/og-image.jpg" />
<?php
} elseif( is_page() ) {
?>
  <meta property="og:url" content="<?php the_permalink() ?>"/>
  <meta property="og:title" content="<?php the_title(); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="<?php bloginfo('stylesheet_directory'); ?>/img/og-image.jpg" />
<?php
} elseif( is_home() ) {
?>  
  <meta property="og:url" content="<?php bloginfo('url'); ?>"/>
  <meta property="og:title" content="<?php bloginfo('name'); ?>" />
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="<?php bloginfo('description'); ?>" />
  <meta name="twitter:card" value="<?php bloginfo('description'); ?>">
  <meta property="og:image" content="<?php bloginfo('stylesheet_directory'); ?>/img/og-image.jpg" />
<?php
} 
?>