greetings.js
============

A JavaScript module for creating a visually appealing **Greetings Message**.
It processes a small image, then manipulates the pixels and finally renders the output 
in **HTML5 Canvas**

[Demo](http://anhee.github.io/greetings.js/)

Usage
-----

Include an image from which the greetings is to be created. 
Also set up the `canvas` - element where the final output will rendered.

```
<div class="greetings-container">
    <canvas id="canvas"></canvas>
</div>
<img src="image.png" id="image">
```

Include `greetings.js` after the `img` tag.
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
	};

	Greetings.create(data);
```

    
