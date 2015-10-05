greetings.js
============

A JavaScript module for creating a visually appealing **greetings message**.
It processes a small image, then manipulates the pixels and finally renders the output 
in **HTML5 Canvas**.

[Demo](http://anhee.github.io/greetings.js/)

Usage
-----
#### Install
```
bower install greetings.js
```

#### Setup
Include an image from which the greetings is to be created. 
Also set up the `canvas` - element where the final output will rendered.

```
<img src="sample.png" id="image">

<div class="greetings-container">
    <canvas id="canvas"></canvas>
</div>
```

Include `greetings.js` after the `img` and `canvas` tags.
Then configure and create the greetings using following script.

```
var data = {
	// canvas element id
	canvas : 'canvas',

	// image element id
	image : 'image',

	// particles radius
	size : 5,

	// image scale-up factor
	scale : 6,

	// density factor
	density : 6,
};

Greetings.create(data);
```

    
