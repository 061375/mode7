/**
 *
 * Ajax Handler
 * @author Jeremy Heminger <j.heminger@061375.com>
 *
 * 
 * */
var getImage = (function() {
    
    "use strict";
    
    var submit  = $('.submit'); 
    
    var uploadImages = function() {
        // match anything not a [ or ]
        var data = new FormData();
        var i = 0;
        jQuery.each(jQuery('#file')[0].files, function(i, file) {
            data.append('files', file);
            // support for multiple files
            // data.append('files['+i+']', file);
            // i++;
        });
        var p = Ajax.getData('',data,'_/components/php/index.php');
        Ajax.dataResult(p,function(data){
            modeSeven.makeCanvas(WIDTH,HEIGHT,function(){
                modeSeven.origin.coords = data.message.coords;
                modeSeven.origin.x = data.message.x;
                modeSeven.origin.y = data.message.y;
            });   
        },function(){
            alert('There was an error creating the image on the server');
        });
    }
    /**
    * bindActions
    * bind events to dom nodes
    * @returns {Void}
    * */ 
   var bindActions = function() {
        submit.on('click', uploadImages);
   };
    /**
    * initialize
    * @returns {Void}
    * */
    var init = function() {
        bindActions();
    };

    return {
      init: init,
    };   
}());