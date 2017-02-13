<?php
namespace Controllers;
use \Libraries\ErrorHandler;
use \Libraries\Media;
use \Libraries\General;
use \View\Render;

/**
 *  
 *  Admin
 *  @author By Jeremy Heminger <j.heminger@061375.com>
 *  @copyright © 2017 
 *
 * */
class Image {
    
    private $er;
    
    function __construct() {
        $this->er = new ErrorHandler();
    }
    /**
     * get image wrapper
     * @return void
     * */
    public function get_image() {
        
        $return = [];
        
        $md = new Media($this->er);
        $results = $md->upload_images(false);
        $this->chkerror($results);
        if(count($results) < 1 ) {
            $this->er->set_error_message('error uploading images '.__METHOD__.' '.__LINE__);
            $this->er->display_errors();
        }
        foreach($results as $image) {
            $mime = str_replace('image/','',$image['type']);
            $function = '_imagecreatefrom'.$mime;
            if(false === method_exists($this,$function)) {
                // error
                $this->er->set_error_message('image create function does not exist for requested mime-type'.__METHOD__.' '.__LINE__);
                $this->er->display_errors();
            }
            $im = $this->$function($image['tmp_name']);
            $this->chkerror($im);
            $imgsize = $this->_getimagesize($image['tmp_name']);
            $return['imgsize'] = $imgsize;
            /**
             * @todo currently the uploaded image MUST be 500x500 ( it should resize in the future)
             * */
            for($x = 1; $x < $imgsize[0]; $x++) {
                for($y = 1; $y < $imgsize[1]; $y++) {
                    $index = $this->_imagecolorat($im,$x,$y);
                    $return['coords'][$x][$y] = $this->_imagecolorsforindex($im,$index);
                }
            }   
        }
        // after the magic
        Render::ajax($return);
    }
    /**
     *
     * */
    private function _imagecolorsforindex($im,$index)
    {
        try {
            $result = imagecolorsforindex($im,$index);
        } catch (Exception $e) {
            $this->er->set_error_message($e->getMessage());
            return false;
        }
        return $result;
    }
    /**
     *
     * */
    private function _imagecolorat($image,$x,$y)
    {
        try {
            $result = imagecolorat($image,$x,$y);
        } catch (Exception $e) {
            $this->er->set_error_message($e->getMessage());
            return false;
        }
        return $result;
    }
    /**
     *
     * */
    private function _imagecreatefromjpeg($image)
    {
        try {
            $result = imagecreatefromjpeg($image);
        } catch (Exception $e) {
            $this->er->set_error_message($e->getMessage());
            return false;
        }
        return $result;
    }
    /**
     *
     * */
    private function _imagecreatefrompng($image)
    {
        try {
            $result = imagecreatefrompng($image);
        } catch (Exception $e) {
            $this->er->set_error_message($e->getMessage());
            return false;
        }
        return $result;
    }
    /**
     *
     * */
    private function _imagecreatefromgif($image)
    {
        try {
            $result = imagecreatefromgif($image);
        } catch (Exception $e) {
            $this->er->set_error_message($e->getMessage());
            return false;
        }
        return $result;
    }
    /**
     *
     * */
    private function _getimagesize($image)
    {
        try {
            $result = getimagesize($image);
        } catch (Exception $e) {
            $this->er->set_error_message($e->getMessage());
            return false;
        }
        return $result;
    }
    /**
     *
     * */
    private function chkerror($result)
    {
        if(false === $result) {
            if(false === $this->er->has_error()) {
                $this->er->display_errors();
            }else{
                Render::ajax('An unknown error occured',0);
            }
        }
        return $result;
    }
}