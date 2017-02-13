<?php
/**
 *  1. display image load form
    2. user uploads image into temp
    3. program extracts image data
    4. program exports image data as JSON
    5. javascript creates image using canvas pixel by pixel
     - v1 simply draw image
     - v2 will attempt to draw the image projected in 3D
     - further revisions will attempt to rotate
 */
    $GLOBALS['allowed_mime_types'] = array('image/gif', 'image/jpeg', 'image/png', 'image/pjpeg');
    $Directory = new RecursiveDirectoryIterator(getcwd().'/src');
    $Iterator = new RecursiveIteratorIterator($Directory);
    $objects = new RegexIterator($Iterator, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);
    foreach($objects as $name => $object){
        require_once($name);
    }
    $img = new \Controllers\Image();
    $img->get_image();
    
?>


