<?php
namespace Libraries;
use \Libraries\General;
/**
 *  
 *  Media
 *  @author By Jeremy Heminger <j.heminger@061375.com>
 *  @copyright © 2017 
 *
 * */
class Media {
    
    private $config = array();
    
	// ---
	
    private $errors;
    
	
	/**
	 * @param object $error_handler
	 * @return void
	 * */
    function __construct($error_handler)
    {
        $this->config['allowed_mimetypes'] = $GLOBALS['allowed_mime_types']; // allowed mime tytpes
		$this->config['file_size_limit'] = 30000;
        $this->errors = $error_handler;
    }
    /**
     * prepare for file upload base don $_FILES super global
     * @return mixed (array, bool)
     * */
    function upload_images($save = true)
    {
        $return = array();
        if($_FILES){
			$i = 0;
            $num = count($_FILES);
            //Just reorganizing the data so it's easier to interpret
            foreach($_FILES as $file) {
                    $files[$i]['name'] = $file['name'];
                    $files[$i]['save_name'] = $file['name'];
                    $files[$i]['type'] = $file['type'];
                    $files[$i]['size'] = $file['size'];
                    $files[$i]['tmp_name'] = $file['tmp_name'];
                    $files[$i]['error'] = null;
                    if($file['size'] > $this->config['file_size_limit'])
						$this->errors->set_error_message('file size too large');
                    if(!in_array($file['type'],$this->config['allowed_mimetypes']))
						$this->errors->set_error_message('mime type not allowed');
					$i++;
            }
            if(true === $save) {
				foreach($files as $file){
						if(!$file['error']){
								$return[] = $this->saveFile($file, $this->config['upload_folder'].'/'.$file['type']);
						}else{
								$this->errors->set_error_message($file['error']);
						}
				}
			}else{
				$return = $files;
			}
            return $return;
		}
        return false;
    }
    
    // ------ private functions
    
    /**
     * save uploaded file to disk 
     * @param array
     * @param $path
     * @return bool
     * */
    private function saveFile($file,$path)
    {
        if(false === $this->checkFile($file['tmp_name'])) {
            return false;
        }
        $move = move_uploaded_file($file['tmp_name'], $path . $file['save_name']);
        if(false === $move) {
            $this->errors->set_error_message(General::message('error',array('error','upload','movefile')));
            return false;
        }
        return true;
    }
    /**
     * checks if file exists and does a simple check to ensure the file doesn't contain any PHP
     * - there are other methods for doing this ... not sure if they are better or not
     *   one method that should definetly work is resizing... this should be done anyways for multiple file sizes
     * @param string path to file
     * @return bool
     * */
    private function checkFile($file_path) {
        if(false == file_exists($file_path)) {
            $this->errors->set_error_message(General::message('notice',array('error','upload','upload')));
            return false;
        }
        // rethink this - there are better ways
        // - resize image for example
        $test = file_get_contents($file_path);
        if(strpos($test,'<?php') !== false) {
            $this->errors->set_error_message(General::message('notice',array('error','upload','malicious')));
            return false;
        }
        return true;
    }
}