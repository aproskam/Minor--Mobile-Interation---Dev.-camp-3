//self-invoking anonymous function
(function(){
	'use strict';

	var scrollTop 	= document.body.scrollTop,
  		el 			= document.body,
  		els 		= document.querySelectorAll('.meta'),
  		position 	= el.scrollTop,
  		oHeight 	= el.offsetHeight,
  		wHeight		= window.innerHeight,
  		$, $$;
    
    var watchID = null;
    
    //initialize app with an controller object literal
  	var app = {
        //initialize method, Cordova is ready to be used
  		init: function() {
  			this.router();
            
            document.addEventListener('gesturechange', this, false);
			document.addEventListener('scroll', this, false);
            document.addEventListener('deviceready', accelerometer.ready, false);
  		},
        
        //change the link in the browser
  		router: function() {
  			routie({
			    '/some-section': function() {
			    	section.toggle('some-section');
				},
			    '/some-other-section': function(route) {
			    	section.toggle('some-other-section');
				}
			});
  		},
        
        //shrinks the header & footer while scrolling
  		handleEvent: function(e) {
        	var scroll = el.scrollTop,
				i = 0, 
				l = els.length;

			if (scroll > position && (scroll + wHeight) < oHeight && position > 0) {
				// scrolling Down
				for (;i < l;i++) {
				    els[i].classList.add('shrink');
				};
			} else {
				// scrolling Up
				for (;i < l;i++) {
				    els[i].classList.remove('shrink');
				};
			}
			position = scroll;
  		},

  	};
    
    //adds and change the class front- backpanel 
  	var section = {
  		toggle: function(route) {
  			var panel 	= $('[data-route='+ route +']'),
  				front 	= /front-panel/.test(panel.className);

  			this.fp = $('.front-panel');
  			this.bp = $('.back-panel');

  			this.bp.addEventListener('webkitTransitionEnd',this,false)

  			if(!(panel == this.fp)){
  				this.fp.classList.add('out');
  				this.bp.classList.remove('back-panel');
  				this.bp.classList.add('front-panel');
  			} else {
  				// to do: active navigation
  			}
  		},

  		handleEvent: function() {
  			this.fp.classList.remove('out','front-panel');
  			this.fp.classList.add('back-panel');
  		}
  	};

  	// utilities object for common thingies
	var utils = {
		init: function() {
			// Shorthand selectors
			$  = this.selectElement, 
			$$ = this.selectElements;
		},
		selectElement: function(el) {
			return document.querySelector(el);
		},
		selectElements: function(el) {
			return document.querySelectorAll(el);
		}
	};
    
    //accelerometer 
    var accelerometer = {
        ready: function() {
            accelerometer.begin();
        },
        
        begin: function () {
            
            //update accleration every 100 of a second
            var options = {
                frequency: 100
            };
            
            watchID = navigator.accelerometer.watchAcceleration(this.success, debug.fail, options);
        },        
        // Stop watching the acceleration
        stop: function () {
            if (watchID) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
        },
        // onSuccess: Get a snapshot of the current acceleration
        success: function (acceleration) {
            var element = document.getElementById('accelerometer');
            element.innerHTML = 'Acceleration X: ' + acceleration.x + '<br />'+
                                'Acceleration Y: ' + acceleration.y + '<br />'+
                                'Acceleration Z: ' + acceleration.z + '<br />'+
                                'Timestamp: '      + acceleration.timestamp + '<br />';
            
            //starts scrolling up when the acceleration.y is bigger then 7 and
            //scrolls down when the acceleration.y lower is then 2 AWESOME!!!
           if (acceleration.y > 7.0) {
                window.scrollBy(0, -5);
           } else if (acceleration.y < 2.0) {
                window.scrollBy(0, 5);
           }
        }
    };
    
    var debug = {
        fail: function () {
            alert('onError!');
        }
    };    
    
	utils.init();
    app.init();
})();


