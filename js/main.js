var testimonial_scroll_time = 3000;
var is_mouse_on_car1 = false;
var captionLength = 0;
var caption = '';


$("document").ready(function() {
    
    $(".button-collapse").sideNav({
        closeOnClick: false
    });
    
//    $('.car1').carousel({full_width: true,time_constant:100, no_wrap:false});
//    $('.car1').hover(function(){
//       is_mouse_on_car1 = true; 
//    },function(){
//        is_mouse_on_car1 = false;
//    });
//    setInterval(function(){
//        if(!is_mouse_on_car1)
//        $('.car1').carousel('next');
//    },testimonial_scroll_time);
    
    $(".car1").owlCarousel({
        items: 1,
        singleItem:true,
        autoPlay:true,
        autoHeight:true,
        pagination:false
    });
    
    
    menu_responsive();
    $(window).resize(function() {
        menu_responsive();
    });
    $('.bar1,.bar2,.bar3').mousemove(function(e) {
        return;
        var x = -(e.pageX + this.offsetLeft) / 20;
        var y = -(e.pageY + this.offsetTop) / 20;
        $(this).css('background-position', x + '% ' + y + '%');
    });
    $(".MCmenu").find("a").click(function(e) {
        e.preventDefault();
        $(".MCmenu li").removeClass("active");
        $(this).parent("li").addClass("active");
        var curr_id = $(this).attr("page-id");
        switch (curr_id) {
            case "home":
                ajax_home();
                break;
            case "contact":
                ajax_contact();
                break;
            case "works":
                ajax_common(curr_id);
                break;
            case "products":
                ajax_common(curr_id, ajax_products);
                break;
            case "testimonials":
                ajax_common(curr_id, ajax_testimonials);
                break;
            case "about":
                ajax_common(curr_id, load_about);
                break;
            case "careers":
                ajax_common(curr_id);
                break;
            default:
                alert("unknown page selected");
                break;
        }
        
//        $(window).resize(function(){
//           alert(); 
//        });
        return false;
    });
    $(".testimonials .tab_content").hide();
    $(".testimonials .tab1").slideDown(200);
    $(".testimonials .tab").click(function() {
        $(".testimonials .tab").removeClass("active");
        $(this).addClass("active");
        var ind = $(".testimonials .tab").index($(this));
        $(".testimonials .tab_content").hide();
        $(".testimonials .tab" + (ind + 1)).slideDown(200,function(){
            var owl = $(".testimonials .tab" + (ind + 1)).find(".car1").data('owlCarousel');
            owl.next();
            
            //console.log(owl?true:false);
//            $(".testimonials .tab" + (ind + 1)).find(".car1").owlCarousel({
//                items: 1,
//                autoPlay:true,
//                autoHeight:true,
//                pagination:false
//            });
//
//            $(".car2").owlCarousel({
//                items: 1,
//                autoPlay:true,
//                autoHeight:true,
//                pagination:false
//            });
            
        });
    });
//    $('#testimonial_slider').carousel({
//        full_width: true,
//        no_wrap: false
//    });
});

current_link = "";
function ajax_products(){
    
     $("[class^=modal-trigger]").click(function(){
         current_link = $(this).attr("data-href");
     });
     
     $('#modal_pings1').leanModal({
         ready: function() {
                 //$('#modal1 iframe')[0].src += "&autoplay=1";
         },
         complete: function(){
             $('#modal1 iframe')[0].src += "";
         }
    });
    $('#modal_pings2').leanModal({
         ready: function() {
                // $('#modal2 iframe')[0].src += "&autoplay=1";
         },
         complete: function(){
             $('#modal2 iframe')[0].src += "";
         }
    });
    $('#modal_pings3').leanModal({
         ready: function() {
                // $('#modal3 iframe')[0].src += "&autoplay=1";
         },
         complete: function(){
             $('#modal3 iframe')[0].src += "";
         }
    });
    
}

var mobileinit = false;
function ajax_testimonials(){
     //type(el, caption );
     captionEl = $('#typingtext');
     testTypingEffect();
     
     if($(window).width() > 480){
        $("#owl-testimonial").owlCarousel({
            items: 3,
            itemsDesktop:3,
            itemsDesktopSmall: 3,
            itemsTablet:2,
            itemsMobile:1,
            autoPlay:true,
            autoHeight:false
        });
        
        var owl = $("#owl-testimonial").data('owlCarousel');

        owl.play();
     }else
     {
         $("#owl-testimonial").owlCarousel({
            items: 1,
            itemsMobile:1,
            singleItem:true,
            autoPlay:true,
            autoHeight:false,
            responsive:true
        });
            
        var owl = $("#owl-testimonial").data('owlCarousel');

        owl.play();
     }

    
    
}


function ajax_home() {
    $(".home").show();
    $(".contact_content").hide();
    $("#map2").hide();
    //$('.car3').carousel({full_width: false,time_constant:100, no_wrap:false});
    
}

function ajax_contact() {
    menu_responsive();
    $.ajax({
        url: "contact.html",
        success: function(result) {
            $(".home").hide();
            $(".common_content").hide();
            $(".contact_content").html(result).show();
            $("#map2").show();
            load_contactPage();
        }
    });
}

function ajax_common(page, callback) {
    $.ajax({
        url: page + ".html",
        success: function(result) {
            $(".common_content").html(result).show();
            $(".home").hide();
            $(".contact_content").hide();
            $("#map2").hide();
            if (callback) {
                callback();
            }
        }
    });
}

function menu_responsive() {
    var dwidth = $(window).width();
    if (dwidth < 1024)
        $('.button-collapse').sideNav('hide');
    else
        $('.button-collapse').sideNav('show');
}
var load_about = function() {
    $("document").ready(function() {
        $('.collapsible').collapsible({});
        $(".mvv_coll .collapsible-header").click(function() {
            $(".mvv_img").removeClass("rotate0 rotate1 rotate2");
            $(".mvv_img").addClass("rotate" + $(this).attr("data-index"))
        });
    });
}

function myalert(message, color){
var $toastContent = $('<span >'+message+'</span>');
  Materialize.toast($toastContent, 2000,color);
}

is_ajax_called = false;
function load_contactPage() {
    initmaps();
    $('img[usemap]').rwdImageMaps();
    $("#Map #items").click(function(e) {
        e.preventDefault();
        var current_map_id = $(this).attr("title");
        movemaptoLoc(current_map_id);
        $(".infobox").addClass("hiding");
        setTimeout(function() {
            $(".dyn_data").html($(".contactdata:nth-child(" + current_map_id + ")").html());
            $(".infobox").removeClass("hiding");
        }, 500);
    });
    $(".infobox .arrow").click(function() {
        $(".infobox").addClass("hiding");
    });
    $(".dyn_data").html($(".contactdata:nth-child(2)").html());
    
    $("#contactform").submit(function(){
        var name = $("#contactform #name").val();
        var email = $("#contactform #email").val();
        var message = $("#contactform #textarea1").val();
        
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(email)){
                myalert("Enter valid E-mail","red");
                return false;
            }
            return true;
        }

        function validatestring(str, prompt, min, max){
                 //var ck_password =  /^[A-Za-z0-9-]/;
            if (str=="")
                {
                 myalert(prompt+" must be filled out","red");
                 return false;
                }
            else if (str.length > max )
                {
                    myalert(prompt+" cannot be more than "+max+" characters","red");
                    return false;
                }
            else if (str.length < min )
                {
                    myalert(prompt+" cannot be less than "+min+" characters","red");
                    return false;
                }
            else if (/[^a-zA-Z0-9\ ]/.test( str ))
                {
                    myalert(prompt+" can only contain alphanumeric characters","red");
                    return false;
                }
            return true;
        }
        
        if(validatestring(name, "Name", 4, 35))
            if(validateEmail(email))
                if(validatestring(message, "Message", 10, 125))
                    {
                        
                        var myKeyVals = { name: name, email: email, message: message };

                        if(!is_ajax_called){
                            is_ajax_called = true;
                            $(".formsubmit").addClass("disabled");
                            $(".prepre").removeClass("hide");
                            var saveData = $.ajax({
                                  type: 'POST',
                                  url: "http://www.solvers.us/ynotss/mailing.php",
                                  data: myKeyVals,
                                  dataType: "text",
                                  success: function(resultData) {
                                      is_ajax_called = false;
                                      console.log(resultData);
                                      $(".formsubmit").removeClass("disabled");
                                      $(".prepre").addClass("hide");
                                      if(!parseInt(JSON.parse(resultData).error))
                                      {
                                          myalert("Your Message is received. Thanks!","light-green");
                                      }
                                      else
                                          myalert("Something went wrong! Please try Again","red"); 
                                  }
                            });
                            saveData.error(function() { 
                                myalert("Something went wrong!!","red"); 
                                is_ajax_called = false;
                                });

                        }// end of ajax
            
            
                    }
                
    //return true;
        return false;
    });
}

function init(mapid) {
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(16.506174, 80.648015),
        styles: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#46bcec"
            }, {
                "visibility": "on"
            }]
        }]
    };
    var mapElement = document.getElementById(mapid);
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(16.506174, 80.648015),
        map: map,
        title: 'Vijayawada'
    });
    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(-6.809421, 39.28628),
        map: map,
        title: 'Tanzania'
    });
    return map;
}

function initmaps() {
    cmap = init('map');
    cmap2 = init('map2');
    google.maps.event.addListener(cmap, 'bounds_changed', (function() {
        cmap2.setCenter(cmap.getCenter());
        cmap2.setZoom(cmap.getZoom());
    }));
    google.maps.event.addListener(cmap2, 'bounds_changed', (function() {
        cmap.setCenter(cmap2.getCenter());
        cmap.setZoom(cmap2.getZoom());
    }));
}

function movemaptoLoc(position) {
    if (parseInt(position) == 1) {
        var latlng = new google.maps.LatLng(-6.809421, 39.28628);
        cmap.setCenter(latlng);
        cmap.setZoom(5);
        cmap2.setCenter(latlng);
        cmap2.setZoom(5);
    } else if (parseInt(position) == 2) {
        var latlng = new google.maps.LatLng(16.506174, 80.648015);
        cmap.setCenter(latlng);
        cmap.setZoom(11);
        cmap2.setCenter(latlng);
        cmap2.setZoom(11);
    }
}


function testTypingEffect() {
    caption = $('#typingtext').html();
    $('#typingtext').html('');
    setTimeout(function(){
    type();
    },1000);
}


function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 20);
    } else {
        captionLength = 0;
        caption = '';
        
        setTimeout(function(){
        $(".testimonials_content .card").slideDown(200);
        },700);
    }
}