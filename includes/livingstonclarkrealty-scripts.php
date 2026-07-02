<?php

// Add Scripts
function liv_add_scripts(){
    // Add CSS files
    wp_enqueue_style('liv-main-style', plugins_url(). '/mls-dashboard-sample/css/style.css');
    wp_enqueue_style('liv-fancybox-style', 'https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css');
    wp_enqueue_style('bootstrap-style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');

    // Add JS files
    wp_enqueue_script('liv-main-script', plugins_url(). '/mls-dashboard-sample/js/listings.js');
    wp_enqueue_script('bootstrap-jquery-script', 'https://code.jquery.com/jquery-3.3.1.slim.min.js');
    wp_enqueue_script('bootstrap-popper-script', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js');
    wp_enqueue_script('bootstrap-js-script', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
    wp_enqueue_script('liv-fancybox-script', 'https://code.jquery.com/jquery-3.3.1.min.js');
    wp_enqueue_script('liv-fancyboxjquery-script', 'https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js');



    
}

// Hooks used to add scripts into WordPress
add_action('wp_enqueue_scripts','liv_add_scripts');