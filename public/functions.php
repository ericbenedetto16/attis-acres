<?php

    /*
        Add Endpoint to Fetch Menu Items
    */
    function get_my_menu() {
        return wp_get_nav_menu_items('nav');
    }

    add_action( 'rest_api_init', function () {
        register_rest_route( 'wp/v2', 'menu', array(
            'methods' => 'GET',
            'callback' => 'get_my_menu',
        ) );
    } );

    //change base permalinks to match react router
    add_action('init','change_base_permalinks');
    function change_base_permalinks() {    
        global $wp_rewrite;
        $wp_rewrite->permalink_structure = 'post/%pagename%/';
        // $wp_rewrite->page_structure = 'page/%pagename%/';    
        $wp_rewrite->flush_rules();   
    }

    if( function_exists( 'acf_add_local_field_group' ) ):
        acf_add_local_field_group(
            array( 
                'key' => 'group_1',
                'title' => 'Affiliate Product Meta',
                'fields' => array(
                    array(
                        'key' => 'field_1',
                        'label' => 'Product Link',
                        'name' => 'product_link',
                        'type' => 'text',
                        'instructions' => 'Enter the Affiliate Link to the Product',
                        'required' => 1,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => ','
                        ),
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'maxlength' => '',
                        'readonly' => 0,
                        'disabled' => 0,
                    ),
                    array(
                        'key' => 'field_2',
                        'label' => 'Product Description',
                        'name' => 'product_description',
                        'type' => 'textarea',
                        'instructions' => 'Enter a Short Description of the Product/Why You Reccomend It',
                        'required' => 1,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => ','
                        ),
                        'default_value' => '',
                        'placeholder' => '',
                        'prepend' => '',
                        'append' => '',
                        'maxlength' => '',
                        'readonly' => 0,
                        'disabled' => 0,
                    ),
                    array(
                        'key' => 'field_3',
                        'label' => 'Product Price',
                        'name' => 'product_price',
                        'type' => 'text',
                        'instructions' => 'Enter a Short Description of the Product/Why You Reccomend It',
                        'required' => 1,
                        'conditional_logic' => 0,
                        'wrapper' => array(
                            'width' => '',
                            'class' => '',
                            'id' => ','
                        ),
                        'default_value' => '',
                        'placeholder' => '0.00',
                        'prepend' => '$',
                        'append' => '',
                        'maxlength' => '',
                        'readonly' => 0,
                        'disabled' => 0,
                    ),
                ),
                'location' => array(
                    array(
                        array(
                            'param' => 'post_type',
                            'operator' => '==',
                            'value' => 'products',
                        ),
                    ),
                ),
            )
        );
    endif;
    
    //register custom post type for affiliate products
    register_post_type(
        'products',
        array(
            'labels'              => array(
                'name'                  => __( 'Affiliate Products', 'statenweb-mapping' ),
                'singular_name'         => __( 'Affiliate Product', 'statenweb-mapping' ),
                'add_new'               => __( 'Add New', 'statenweb-mapping' ),
                'add_new_item'          => __( 'Add New Affiliate Product', 'statenweb-mapping' ),
                'edit_item'             => __( 'Edit Affiliate Products', 'statenweb-mapping' ),
                'new_item'              => __( 'New Affiliate Product', 'statenweb-mapping' ),
                'all_items'             => __( 'All Affiliate Products', 'statenweb-mapping' ),
                'view_item'             => __( 'View Affiliate Product', 'statenweb-mapping' ),
                'search_items'          => __( 'Search Affiliate Products', 'statenweb-mapping' ),
                'not_found'             => __( 'No Affiliate Products Found', 'statenweb-mapping' ),
                'not_found_in_trash'    => __( 'No Affiliate Products found in Trash', 'statenweb-mapping' ),
                'menu_name'             => __( 'Affiliate Products', 'statenweb-mapping' ),
                'set_featured_image'    => __( 'Add Image', 'statenweb-mapping' ),
                'featured_image'        => __( 'Image', 'statenweb-mapping' ),
                'remove_featured_image' => __( 'Remove Image', 'statenweb-mapping' ),
                'use_featured_image'    => __( 'Use Image', 'statenweb-mapping' ),
            ),
            'menu_icon'           => 'dashicons-products',
            'query_var'           => true,
            'publicly_queryable'  => true,
            'exclude_from_search' => true,
            'hierarchical'        => false,
            'show_in_menu'        => true,
            'public'              => true,
            'show_in_rest'        => true,
            'rest_base'           => 'affiliate-products',
            'show_ui'             => true,
            'rewrite'             => array('slug' => 'products', 'with_front' => false),
            'has_archive'         => false,
            'map_meta_cap'        => true,
            'supports'            => array( 'title', 'thumbnail' ),

        )
    );

    register_rest_field(
        'products',
        'custom_data',
        array(
            'get_callback' => function( $post ) {
                $link = get_field( 'product_link', $post['id'] ) ? get_field( 'product_link', $post['id'] ) : null;
                $description = get_field( 'product_description', $post['id'] ) ? get_field( 'product_description', $post['id'] ) : '';
                $price = get_field( 'product_price', $post['id'] ) ? get_field( 'product_price', $post['id'] ) : '$NULL';
                return (object) array(
                    'link' => $link,
                    'description' => $description,
                    'price' => $price,

                );
            },

        )
    );

    include('shortcodes.php');

    add_theme_support('post-thumbnails');

    //register amazon affiliate taxonomy
    // add_action( 'init', 'create_affiliate_taxonomy', 0 );

    // function create_affiliate_taxonomy() {
    //     $labels = array(
    //         'name' => _x( 'Affiliate Products', 'Affiliate Products' ),
    //         'singular_name' => _x( 'Affiliate Product', 'Affiliate Product' ),
    //         'search_items' => __( 'Search Affiliate Products' ),
    //         'popular_items' => __(' Popular Affiliate Products '),
    //         'all_items' => __( 'All Affiliate Products' ),
    //         'parent_item' => null,
    //         'parent_item_colon' => null,
    //         'edit_item' => __( 'Edit Affiliate Product' ),
    //         'update_item' => __( 'Update Affiliate Product' ),
    //         'add_new_item' => __( 'Add New Affiliate Product' ),
    //         'new_item_name' => __( 'New Affiliate Product' ),
    //         'seperate_items_with_commas' => __( 'Separate Affiliate Products with Commas' ),
    //         'add_or_remove_items' => __( 'Add or Remove Affiliate Producs' ),
    //         'choose_from_most_used' => __( 'Choose from the Most Used Affiliate Products' ),
    //         'menu_name' => __( 'Affiliate Products' ),
    //     );

    //     register_taxonomy( 'affiliate_products', 'products', array(
    //         'hierarchial' => false,
    //         'labels' => $labels,
    //         'show_ui' => true,
    //         'show_admin_column' => true,
    //         'update_count_callback' => '_update_post_term_count',
    //         'query_var' => true,
    //         'rewrite' => array( 'slug' => 'affiliate-products' ),
    //     ));
    // }