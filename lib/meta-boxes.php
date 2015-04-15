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

	$about = new_cmb2_box( array(
		'id'            => $prefix . 'about_page',
		'title'         => __( 'Options', 'cmb2' ),
		'object_types'  => array( 'page', ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
		'show_on' => array( 'key' => 'id', 'value' => (get_id_by_slug('about')) ),
		// 'cmb_styles' => false, // false to disable the CMB stylesheet
		// 'closed'     => true, // true to keep the metabox closed by default
	) );

	$about->add_field( array(
		'name'    => __( 'Services', 'cmb2' ),
		'desc'    => __( '', 'cmb2' ),
		'id'      => $prefix . 'services',
		'type'    => 'wysiwyg',
		'options' => array( 'textarea_rows' => 5, 'media_buttons' => false, ),
	) );

	$about->add_field( array(
		'name' => __( 'Email', 'cmb2' ),
		'desc' => __( 'Fruitmilk contact email', 'cmb2' ),
		'id'   => $prefix . 'email',
		'type' => 'text_email',
	) );

	$about->add_field( array(
		'name' => __( 'Shop URL', 'cmb2' ),
		'desc' => __( '', 'cmb2' ),
		'id'   => $prefix . 'shop_url',
		'type' => 'text',
	) );

	$about->add_field( array(
		'name'    => __( 'Secondary color', 'cmb2' ),
		'desc'    => __( 'used for links', 'cmb2' ),
		'id'      => $prefix . 'colorpicker',
		'type'    => 'colorpicker',
		'default' => '#ffffff',
	) );

	$press = new_cmb2_box( array(
		'id'            => $prefix . 'press',
		'title'         => __( 'Press link', 'cmb2' ),
		'object_types'  => array( 'press', ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => false, // Show field names on the left
	) );

	$press->add_field( array(
		'name' => __( 'Link', 'cmb2' ),
		'desc' => __( '', 'cmb2' ),
		'id'   => $prefix . 'press_link',
		'type' => 'text',
	) );

	$project = new_cmb2_box( array(
		'id'            => $prefix . 'project',
		'title'         => __( 'Project', 'cmb2' ),
		'object_types'  => array( 'collab','installation' ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
	) );

	$project->add_field( array(
		'name' => __( 'Project dates', 'cmb2' ),
		'desc' => __( '', 'cmb2' ),
		'id'   => $prefix . 'dates',
		'type' => 'text',
	) );

	$images_group = $project->add_field( array(
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

	$project->add_group_field( $images_group, array(
		'name' => __( 'Image', 'cmb2' ),
		'id'   => 'image',
		'type' => 'file',
	) );

}
?>
