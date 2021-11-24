/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$("document").ready(function(){
   
   $(".button-collapse").sideNav();
    
    menu_responsive();
    $(window).resize(function(){
        menu_responsive();
    });
    
    $('.bar1,.bar2,.bar3').mousemove(function(e){
        var x = -(e.pageX + this.offsetLeft) / 20;
        var y = -(e.pageY + this.offsetTop) / 20;
        $(this).css('background-position', x + '% ' + y + '%');
      }); 
      
      
//      menu click handle
    $(".MCmenu").find("a").click(function(e){
       e.preventDefault();
       $(".MCmenu li").removeClass("active");
       $(this).parent("li").addClass("active");
       var curr_id = $(this).attr("page-id");
       switch(curr_id){
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
               ajax_common(curr_id);
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
       return false;
    });
    
    
    $(".testimonials .tab_content").hide();
    $(".testimonials .tab1").slideDown(200);
    
    $(".testimonials .tab").click(function(){
       $(".testimonials .tab").removeClass("active");
       $(this).addClass("active");
       var ind = $(".testimonials .tab").index($(this));
       $(".testimonials .tab_content").hide();
       $(".testimonials .tab"+(ind+1)).slideDown(200);
    });
    
    
    $('#testimonial_slider').carousel({full_width: true, no_wrap:false});
    
});

function ajax_home(){
    $(".home").show();
    
    //contact hide
    $(".contact_content").hide();
    $("#map2").hide();
    
}

function ajax_contact(){
    menu_responsive();
    $.ajax({url: "contact.html", success: function(result){
        //home hide
        $(".home").hide();        
        $(".common_content").hide();
        
        $(".contact_content").html(result).show();
        $("#map2").show();
        load_contactPage();
        
    }});
}

function ajax_common(page, callback){
    
    $.ajax({url: page+".html", success: function(result){
        $(".common_content").html(result).show();
        $(".home").hide();
        
        //contact hide
        $(".contact_content").hide();
        $("#map2").hide();
        
        if(callback){
            callback();
        }
    
    }});

    
}

function menu_responsive(){
    
        var dwidth = $(window).width();
        
        if(dwidth < 1024)
             $('.button-collapse').sideNav('hide');
         else
             $('.button-collapse').sideNav('show');
         
//        if(dwidth < 768)
//            $(".bmenu").addClass("hide");
//        else
//            $(".bmenu").removeClass("hide");

//        if(dwidth > 768)
//            $('.button-collapse').sideNav('show');
    
    
}
var load_about = function(){
    $("document").ready(function(){
        
    $('.collapsible').collapsible({
     
    });
    
        $(".mvv_coll .collapsible-header").click(function(){
           //alert();
           $(".mvv_img").removeClass("rotate0 rotate1 rotate2");
           $(".mvv_img").addClass("rotate"+$(this).attr("data-index"))
        });
        
    });
}

function load_contactPage(){
    //google.maps.event.addDomListener(window, 'load', initmaps);
    initmaps();
    
    $('img[usemap]').rwdImageMaps();
        
    $("#Map #items").click(function(e){
        e.preventDefault();
        var current_map_id = $(this).attr("title");
        movemaptoLoc(current_map_id);

        $(".infobox").addClass("hiding");
        setTimeout(function(){
            $(".dyn_data").html($(".contactdata:nth-child("+current_map_id+")").html());
            $(".infobox").removeClass("hiding");
        },500);
    });

    $(".infobox .arrow").click(function(){
        $(".infobox").addClass("hiding");
    });

    //$(".dyn_data").html($(".contactdata").html());
    $(".dyn_data").html($(".contactdata:nth-child(2)").html());
           
}

function init(mapid) {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(16.506174,80.648015), // New York

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById(mapid);

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(16.506174,80.648015),
        map: map,
        title: 'Vijayawada'
    });

    // Let's also add a marker while we're at it
    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(-6.369028, 34.888822),
        map: map,
        title: 'Tanzania'
    });

    return map;
}

function initmaps(){

//                $('.oblurlay').oblurlay({
//                    upper: "oblurlay-upper",
//                    contents: "oblurlay-contents",
//                    clone: "oblurlay-contents-clone",
//                    svgBlur: 3
//                  });

    //init('map');

    cmap = init('map');
    cmap2 = init('map2');

    google.maps.event.addListener(cmap, 'bounds_changed', (function () {
        cmap2.setCenter(cmap.getCenter());
        cmap2.setZoom(cmap.getZoom());
    }));

    google.maps.event.addListener(cmap2, 'bounds_changed', (function () {
        cmap.setCenter(cmap2.getCenter());
        cmap.setZoom(cmap2.getZoom());
    }));

}

function movemaptoLoc(position){
    //map.setCenter(newCenter:LatLng) OR

    if(parseInt(position) == 1){
        var latlng = new google.maps.LatLng(-6.369028, 34.888822);
        cmap.setCenter(latlng);
        cmap.setZoom(5);
        cmap2.setCenter(latlng);
        cmap2.setZoom(5);
    }else if(parseInt(position) == 2){
        var latlng = new google.maps.LatLng(16.506174,80.648015);
        cmap.setCenter(latlng);
        cmap.setZoom(11);
        cmap2.setCenter(latlng);
        cmap2.setZoom(11);
    }

}

            
            