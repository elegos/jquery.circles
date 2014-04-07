/*global jQuery*/

(function ($) {
    "use strict";
    
    var $circles = $('#circles'),
        circles = $circles.circles({radius: 150});
    
    $circles.attr('width', $circles.parent().innerWidth());
    $circles.attr('height', $circles.parent().innerHeight());
    
    $circles.on('contextmenu', function (event) {
        event.preventDefault();
        circles.randomizeColors();
    });
    
    $circles.click(function (event) {
        var x = event.pageX - $circles.offset().left,
            y = event.pageY - $circles.offset().top;
        
        circles.addCircle(x, y);
    });
}(jQuery));
