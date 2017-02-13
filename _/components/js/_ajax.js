/**
 *
 * Ajax Handler
 * @author Jeremy Heminger <j.heminger@061375.com>
 *
 * 
 * */
var Ajax = (function() {
    
    "use strict";
    
    var session = false;
    
    var session_url = false;
    
    var ajaxurl;
    
    /**
    * gets data from the server
    * @returns {Object} and Ajax connection
    * */
    var getData = function(method,data,url){
        if (typeof url === 'undefined') {
            url = ajaxurl+'/'+method;
        }
        $.logThis('send ajax '+url);
        return $.ajax({
            url         :url,
            data        :data,
            type        :"post",
            processData: false,
            contentType: false,
            dataType: "json"
        });
    }
    /**
    * handles the result - we do this in 2 steps to allow a callback
    * @param p {Object} the ajax object
    * @param callback {Function}
    * @param ecallback {Function} an option function in the event of an error
    * @returns {Void}
    * */
    var dataResult = function(p,callback,ecallback) {
        p.done( function(data){
            if(data.success == 1) {
                if (typeof callback === "function") {
                    callback(data);
                }
            } else {
                if (typeof data.errors !== 'undefined') {
                    var errors = "";
                    $.each(data.errors,function(k,v){
                        errors+=v+"\n";
                    });
                    if (typeof ecallback === "function") {
                        ecallback(errors);
                    }else{
                        alert("An error occured "+errors);
                    }
                }else{
                    ecallback(data.message);
                }
            } 
        });
        p.fail( function(xhr, ajaxOptions, thrownError){
            var error_text = 'An Error occurred...';
            if ( typeof xhr !== 'undefined') {
                $.logThis('xhr error '+xhr.status);
            }
            if ( typeof thrownError !== 'undefined') {
                $.logThis('thrownError '+thrownError);
            }
            alert(error_text); 
        });
    } 
    /**
    * creates a session
    * @returns {Void}
    * */
    var get_session_url = function(callback) {
        $.logThis('Ajax::get_session_url');
        var h = '';
        for(var i=0; i<10; i++) {
            var c = 98 + Math.floor(Math.random() * 15);
            h+=String.fromCharCode(c);
        }
        var url = ajaxpath+h+'.init';
        var p = getData('create_session_url',{},url);
        dataResult(p,function(data) {
            if (typeof data.message !== 'undefined') {
                session_url = data.message;
                if (typeof callback === 'function') {
                    callback(session_url);
                }
            }
        });
    }
    /**
    * creates a session
    * @returns {Void}
    * */
    var init_session = function(callback) {
        $.logThis('Ajax::init_session');
        var url = ajaxpath+session_url+'.s';
        var p = getData('create_session',{},url);
        dataResult(p,function(data) {
            if (typeof data.message !== 'undefined') {
                if (typeof callback === 'function') {
                    session = data.message;
                    callback();
                }
            }
        });
    }
    /**
    * wrapper return session url
    * @returns {String}
    * */
    var return_session_url = function() {
        $.logThis('Ajax::return_session_url');
        return session_url;
    };
    /**
    * wrapper return session 
    * @returns {String}
    * */
    var return_session = function() {
        $.logThis('Ajax::return_session');
        return session;
    };
    /**
    * initialize
    * @returns {Void}
    * */
    var init = function(callback) {
        $.logThis('Ajax::init');
        if(typeof callback == 'function') {
            get_session_url(callback);
        }else{
            ajaxurl  = callback;
        }
    };

    return {
      init: init,
      init_session: init_session,
      return_session: return_session,
      return_session_url: return_session_url,
      getData: getData,
      dataResult: dataResult
    };   
}());