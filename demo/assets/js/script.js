/*global jQuery, window*/

(function ($, window) {
    "use strict";
    
    function distance(aX, aY, bX, bY) {
        return Math.sqrt(Math.pow((bX - aX), 2) + Math.pow((bY - aY), 2));
    }
    
    var $circles = $('#circles'),
        circles = $circles.circles(),
        coordX = 0,
        coordY = 0;
    
    $circles.attr('width', $circles.parent().innerWidth());
    $circles.attr('height', $circles.parent().innerHeight());
    
    $circles.on('contextmenu', function (event) {
        event.preventDefault();
        circles.randomizeColors();
    });
    
    $circles.mousedown(function (event) {
        coordX = event.pageX - $circles.offset().left;
        coordY = event.pageY - $circles.offset().top;
    }).mouseup(function (event) {
        
        // right click
        if (event.which === 3) {
            return;
        }
        
        var newCoordX = event.pageX - $circles.offset().left,
            newCoordY = event.pageY - $circles.offset().top,
            dist = Math.round(distance(coordX, coordY, newCoordX, newCoordY), 0);
        
        
        if (dist > 10) {
            circles.addCircle(coordX, coordY, dist);
        } else {
            circles.addCircle(coordX, coordY);
        }
    });
}(jQuery, window));
