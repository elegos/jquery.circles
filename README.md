jQuery Circles is a jQuery plugin which allows you to easily draw circles on a HTML5 canvas.

The logic behind the library is that if the script receives a request to write a circle on the same point where another circle already exists, the former becomes a concentric circle of the latter, sharing the same origin coordinates automatically. This produces a visual effect like the following:

![Circles example](elegos.github.com/jquery.circles/img/example.png)

----------

# Requirements #

1. jQuery (tested on 1.11.0)
2. Backbone.js (tested on 1.1.2) and relative Underscore
3. A canvas-enabled browser

----------

# How to use #

1. call the `.circles(options)` method on a canvas element, save the return value in a variable (aka the circles object). `options` is an object with the following structure:

		{
			circleColors: ['hexcolor1', 'hexcolor2', '#hexcolor3', ...] // the circles' colors
			radius: 50 // in pixels
		}

2. call the `addCircle(x, y, customRadius)` method from the circles object in order to draw a new circle. The third parameter is optional and is the radius value in pixels. Default value is 50, or as specified in `options`.

3. call the `.randomizeColors()` from the circles object in order to render the circles again with different colors, choosing from the `circleColors` pool randomly.

----------

[![CC BY-SA 4.0](http://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/ "Creative Commons Attribution-ShareAlike 4.0")

This work is under the Creative Commons Attribution-ShareAlike 4.0 Licence.