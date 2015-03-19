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
add_action( 'init', 'register_cpt_collab' );

function register_cpt_collab() {

    $labels = array( 
        'name' => _x( 'Collabs', 'collab' ),
        'singular_name' => _x( 'Collab', 'collab' ),
        'add_new' => _x( 'Add New', 'collab' ),
        'add_new_item' => _x( 'Add New Collab', 'collab' ),
        'edit_item' => _x( 'Edit Collab', 'collab' ),
        'new_item' => _x( 'New Collab', 'collab' ),
        'view_item' => _x( 'View Collab', 'collab' ),
        'search_items' => _x( 'Search Collabs', 'collab' ),
        'not_found' => _x( 'No Collabs found', 'collab' ),
        'not_found_in_trash' => _x( 'No Collabs found in Trash', 'collab' ),
        'parent_item_colon' => _x( 'Parent Collab:', 'collab' ),
        'menu_name' => _x( 'Collabs', 'collab' ),
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

    register_post_type( 'collab', $args );
}

add_action( 'init', 'register_cpt_installation' );

function register_cpt_installation() {

    $labels = array( 
        'name' => _x( 'Installations', 'installation' ),
        'singular_name' => _x( 'Installation', 'installation' ),
        'add_new' => _x( 'Add New', 'installation' ),
        'add_new_item' => _x( 'Add New Installation', 'installation' ),
        'edit_item' => _x( 'Edit Installation', 'installation' ),
        'new_item' => _x( 'New Installation', 'installation' ),
        'view_item' => _x( 'View Installation', 'installation' ),
        'search_items' => _x( 'Search Installations', 'installation' ),
        'not_found' => _x( 'No Installations found', 'installation' ),
        'not_found_in_trash' => _x( 'No Installations found in Trash', 'installation' ),
        'parent_item_colon' => _x( 'Parent Installation:', 'installation' ),
        'menu_name' => _x( 'Installations', 'installation' ),
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

    register_post_type( 'installation', $args );
}

add_action( 'init', 'register_cpt_installation' );

function register_cpt_installation() {

    $labels = array( 
        'name' => _x( 'Installations', 'installation' ),
        'singular_name' => _x( 'Installation', 'installation' ),
        'add_new' => _x( 'Add New', 'installation' ),
        'add_new_item' => _x( 'Add New Installation', 'installation' ),
        'edit_item' => _x( 'Edit Installation', 'installation' ),
        'new_item' => _x( 'New Installation', 'installation' ),
        'view_item' => _x( 'View Installation', 'installation' ),
        'search_items' => _x( 'Search Installations', 'installation' ),
        'not_found' => _x( 'No Installations found', 'installation' ),
        'not_found_in_trash' => _x( 'No Installations found in Trash', 'installation' ),
        'parent_item_colon' => _x( 'Parent Installation:', 'installation' ),
        'menu_name' => _x( 'Installations', 'installation' ),
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

    register_post_type( 'installation', $args );
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
