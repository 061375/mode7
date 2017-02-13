/**
 *
 * Mode 7
 * 
 * @author Jeremy Heminger <j.heminger@061375.com>
 *
 * 
 * */
var modeSeven = (function() {
    
    "use strict";
    
    var canvas;
    
    /**
     * this is the object that all x,y,z coords etc.. with be in relation to
     * */
    var origin = {
        x:0,
        y:0,
        z:0,
        width:0,
        height:0,
        pitch:0,
        yaw:0,
        roll:0,
        coords:{}
    };
    
    var makeCanvas = function(w,h,callback) {
        var obj = new Object();
            obj.id = 'image';
            obj.height = w;
            obj.width  = h;
            obj.node   = $('#'+obj.id);
        
        // create a canvas layer
        canvas = new html5CanvasHandler(obj);
        canvas.makeCanvasGetContext();
        if (typeof callback === 'function') {
            callback();
        }
    }
    
    var draw = function() {
        canvas.width = canvas.width;
        canvas.fillRect(x, y, x2, y2);
    }
    /**
    * bindActions
    * bind events to dom nodes
    * @returns {Void}
    * */ 
   var bindActions = function() {
       
   };
    /**
    * initialize
    * @returns {Void}
    * */
    var init = function() {
        
    };

    return {
      init: init,
      origin: origin,
      makeCanvas: makeCanvas
    };   
}());