<?php

/* Get post objects for select field options */ 
function get_post_objects( $query_args ) {
$args = wp_parse_args( $query_args, array(
    'post_type' => 'post',
) );
$posts = get_posts( $args );
$post_options = array();
if ( $posts ) {
    foreach ( $posts as $post ) {
        $post_options [ $post->ID ] = $post->post_title;
    }
}
return $post_options;
}


/**
 * Include and setup custom metaboxes and fields.
 *
 * @category YourThemeOrPlugin
 * @package  Metaboxes
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

/**
 * Hook in and add metaboxes. Can only happen on the 'cmb2_init' hook.
 */
add_action( 'cmb2_init', 'igv_cmb_metaboxes' );
function igv_cmb_metaboxes() {

	// Start with an underscore to hide fields from custom fields list
	$prefix = '_igv_';

	/**
	 * Metaboxes declarations here
   * Reference: https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php
	 */

	$about_page = new_cmb2_box( array(
		'id'            => $prefix . 'about_page',
		'title'         => __( '', 'cmb2' ),
		'object_types'  => array( 'page', ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
		'show_on' => array( 'key' => 'id', 'value' => array( get_id_by_slug('about') ) ),
		// 'cmb_styles' => false, // false to disable the CMB stylesheet
		// 'closed'     => true, // true to keep the metabox closed by default
	) );

	$about_page->add_field( array(
		'name'    => __( 'Services', 'cmb2' ),
		'desc'    => __( '', 'cmb2' ),
		'id'      => $prefix . 'services',
		'type'    => 'wysiwyg',
		'options' => array( 'textarea_rows' => 5, 'media_buttons' => false, ),
	) );

	$about_page->add_field( array(
		'name' => __( 'Email', 'cmb2' ),
		'desc' => __( 'Fruitmilk contact email', 'cmb2' ),
		'id'   => $prefix . 'email',
		'type' => 'text_email',
	) );

	$about_page->add_field( array(
		'name'    => __( 'Secondary color', 'cmb2' ),
		'desc'    => __( 'used for links', 'cmb2' ),
		'id'      => $prefix . 'colorpicker',
		'type'    => 'colorpicker',
		'default' => '#ffffff',
	) );


	$single = new_cmb2_box( array(
		'id'            => $prefix . 'single',
		'title'         => __( 'Images', 'cmb2' ),
		'object_types'  => array( 'collab' ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
	) );

	$images_group = $single->add_field( array(
		'id'          => $prefix . 'images',
		'type'        => 'group',
		'description' => __( '', 'cmb2' ),
		'options'     => array(
			'group_title'   => __( 'Image {#}', 'cmb2' ), // {#} gets replaced by row number
			'add_button'    => __( 'Add Another Image', 'cmb2' ),
			'remove_button' => __( 'Remove Image', 'cmb2' ),
			'sortable'      => true, // beta
		),
	) );

	$single->add_group_field( $images_group, array(
		'name' => __( 'Image', 'cmb2' ),
		'id'   => 'image',
		'type' => 'file',
	) );

}
?>
