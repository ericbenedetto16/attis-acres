<?php
    function eb_carousel_shortcode( $atts ) {
        $a = shortcode_atts(array(
            'title' => 'Latest Posts',
            'data' => 'post'
        ), $atts);

        $args = array(
            'post_type' => $a['data']
        );
        $query = new WP_Query( $args );
        $render = "";

        if( $query->have_posts() ) {
            while( $query->have_posts() ) {
                $query->the_post();
                $the_link=get_the_permalink();
                $render = $render . "
                <div className='preset-content carousel'>
                    <a className='carousel-item' href=".str_replace("http://localhost","",$the_link).">
                    ".get_the_post_thumbnail(null,"medium")."
                    <h1>".get_the_title()."</h1>
                </div>";
            }
            wp_reset_postdata();
        } else {
            return 'No Posts Found';
        }
        return $render;
    }

    add_shortcode('carousel', 'eb_carousel_shortcode');