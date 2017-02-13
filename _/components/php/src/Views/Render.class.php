<?php
namespace View;
/**
 *  
 *  Render
 *  @author By Jeremy Heminger <j.heminger@061375.com>
 *  @copyright © 2017 
 *
 * */
class Render
{
    /**
     * renders as JSON with MIME-TYPE header
     * @param string $s
     * @param bool overide if errors aren't caught bu there ARE errors
     * @return void
     * */
    public static function ajax($r,$o = 1) {
        header('application/json');
        $result = array(
                'success' => $o,
                'message' => $r
        );
        echo json_encode($result);
        die();
    }
}