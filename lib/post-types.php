<?php
// Menu icons for Custom Post Types
function add_menu_icons_styles(){
?>
 
<style>
#adminmenu .menu-icon-collab div.wp-menu-image:before {
    content: '\f498';
}
</style>
 
<?php
}
add_action( 'admin_head', 'add_menu_icons_styles' );


//Register Custom Post Types
add_action( 'init', 'register_cpt_collabs' );

function register_cpt_collabs() {

    $labels = array( 
        'name' => _x( 'Collabs', 'collabs' ),
        'singular_name' => _x( 'Collab', 'collabs' ),
        'add_new' => _x( 'Add New', 'collabs' ),
        'add_new_item' => _x( 'Add New Collab', 'collabs' ),
        'edit_item' => _x( 'Edit Collab', 'collabs' ),
        'new_item' => _x( 'New Collab', 'collabs' ),
        'view_item' => _x( 'View Collab', 'collabs' ),
        'search_items' => _x( 'Search Collabs', 'collabs' ),
        'not_found' => _x( 'No Collabs found', 'collabs' ),
        'not_found_in_trash' => _x( 'No Collabs found in Trash', 'collabs' ),
        'parent_item_colon' => _x( 'Parent Collab:', 'collabs' ),
        'menu_name' => _x( 'Collabs', 'collabs' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => false,
        
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'collabs', $args );
}

add_action( 'init', 'register_cpt_installations' );

function register_cpt_installations() {

    $labels = array( 
        'name' => _x( 'Installations', 'installations' ),
        'singular_name' => _x( 'Installation', 'installations' ),
        'add_new' => _x( 'Add New', 'installations' ),
        'add_new_item' => _x( 'Add New Installation', 'installations' ),
        'edit_item' => _x( 'Edit Installation', 'installations' ),
        'new_item' => _x( 'New Installation', 'installations' ),
        'view_item' => _x( 'View Installation', 'installations' ),
        'search_items' => _x( 'Search Installations', 'installations' ),
        'not_found' => _x( 'No Installations found', 'installations' ),
        'not_found_in_trash' => _x( 'No Installations found in Trash', 'installations' ),
        'parent_item_colon' => _x( 'Parent Installation:', 'installations' ),
        'menu_name' => _x( 'Installations', 'installations' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => false,
        
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'installations', $args );
}

add_action( 'init', 'register_cpt_press' );

function register_cpt_press() {

    $labels = array( 
        'name' => _x( 'Press', 'press' ),
        'singular_name' => _x( 'Press', 'press' ),
        'add_new' => _x( 'Add New', 'press' ),
        'add_new_item' => _x( 'Add New Press', 'press' ),
        'edit_item' => _x( 'Edit Press', 'press' ),
        'new_item' => _x( 'New Press', 'press' ),
        'view_item' => _x( 'View Press', 'press' ),
        'search_items' => _x( 'Search Press', 'press' ),
        'not_found' => _x( 'No Press found', 'press' ),
        'not_found_in_trash' => _x( 'No Press found in Trash', 'press' ),
        'parent_item_colon' => _x( 'Parent Press:', 'press' ),
        'menu_name' => _x( 'Press', 'press' ),
    );

    $args = array( 
        'labels' => $labels,
        'hierarchical' => false,
        
        'supports' => array( 'title', 'editor', 'thumbnail' ),
        
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        
        'show_in_nav_menus' => true,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => true,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );

    register_post_type( 'press', $args );
}
