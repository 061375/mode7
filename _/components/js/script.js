//
var WIDTH = 1000;
var HEIGHT = 1000;
$(document).ready(function(){
    jQuery.logThis = function( text ){
       if( (window['console'] !== undefined) ){
               console.log( text );
       }
    }
    getImage.init();
});