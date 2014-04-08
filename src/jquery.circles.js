/*global jQuery, Backbone, console*/

/**
*   jQuery Circle
*   by Giacomo Furlan <giacomo@giacomofurlan.name>
*   http://giacomofurlan.name
*
*   This plugin is under the Creative Commons 4.0 Attributions-ShareAlike Licence
*   http://creativecommons.org/licenses/by-sa/4.0/
*
*/

(function ($) {
    "use strict";
    
    var Circle = Backbone.Model.extend({
        defaults: {
            radius: 50,
            color: '#3498db',
            coord: {
                x: 0,
                y: 0
            },
            rendered: false
        },
        
        initialize: function () {
            //
        }
    });
    
    $.fn.circles = function (options) {
        var opts = {
                circleColors: ['#1abc9c', '#27ae60', '#3498db', '#8e44ad', '#34495e',
                          '#f1c40f', '#f39c12', '#d35400', '#e74c3c', '#bdc3c7', '#7f8c8d'],  // colors to choose from
                radius: 50                                                                  // base radius (biggest), in pixels
            },
            container = this,
            context = container.get(0).getContext('2d'),
            objects = [],
            
            /**
            * Draws the circles on the canvas.
            */
            render = function () {
                
                $(objects).each(function () {
                    // Render circles only once
                    if (this.attributes.rendered) {
                        return;
                    }
                    
                    var attr = this.attributes;
                    
                    // < canvas calls
                    context.beginPath();
                    context.arc(attr.coord.x, attr.coord.y, attr.radius, 0, 2 * Math.PI, false);
                    context.fillStyle = attr.color;
                    context.fill();
                    context.closePath();
                    // canvas calls >
                    
                    this.attributes.rendered = true;
                });
            },
            
            /**
            * Randomly selects a color from the list
            * defined in the constructor (options.circleColors, array).
            *
            * @param excludeColor the color (string) to exclude from the selection
            */
            getRandomColor = function (excludeColor) {
                
                var color = "", // final color
                    random = 0; // random color index
                
                do {
                    random = Math.floor(Math.random() * opts.circleColors.length);
                    color = opts.circleColors[random];
                } while (color === excludeColor && opts.circleColors.length > 1); // this will avoid infinite loops in case of 1-color array
                
                return color;
            },
            
            /**
            * Inserts a new circle object in the array,
            * then it draws it via render().
            *
            * @param x the X coordinate (relative to the canvas)
            * @param y the Y coordinate (relative to the canvas)
            * @param customRadius (optional) the radius in pixels. Default options.radius (default 25)
            */
            addCircle = function (x, y, customRadius) {
                var radius = (typeof customRadius === 'undefined') ? opts.radius : customRadius,
                    excludeColor = '';
                
                $(objects).each(function () {
                    var attr = this.attributes;
                    // inside another circle
                    if ((Math.pow((x - attr.coord.x), 2) + Math.pow((y - attr.coord.y), 2)) < Math.pow(attr.radius, 2)) {
                        x = attr.coord.x;
                        y = attr.coord.y;
                        excludeColor = attr.color;
                        radius = attr.radius * 0.8;
                    }
                });
                
                var newCircle = new Circle(
                    {
                        color: getRandomColor(excludeColor),
                        coord: {x: x, y: y},
                        radius: radius
                    }
                );
                
                objects.push(newCircle);
                
                render();
            },
            
            /**
            * Forces the rendering of all the circles.
            * Colors are being randomized.
            */
            renderAgain = function () {
                var newObjects = objects;
                objects = [];
                
                context.clearRect(0, 0, container.outerWidth(), container.outerHeight());
                $(newObjects).each(function () {
                    addCircle(this.attributes.coord.x, this.attributes.coord.y, this.attributes.radius);
                });
            },
            
            /**
            * Wraps the public methods and returns them.
            */
            createAPI = function () {
                return {
                    addCircle: addCircle,
                    randomizeColors: renderAgain
                };
            };
        
        $.extend(opts, options);
        return createAPI();
    };
}(jQuery));