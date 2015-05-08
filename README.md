Image-To-Greetings
==================

This is a JavaScript library for creating an **Animated Greetings Message** from any image.
It basically processes the image file, then manipulates the pixels and finally renders the output
in an html page using **HTML5 Canvas**

[Check the Demo](http://image-to-greetings.herokuapp.com/)

Usage
-----

Include the `imageToGreetings.js` in the html page.

```
<script src="js/imageToGreetings.js"></script>
```

Now add the following into the `main.js` file which is associated with the html page.

```
  var data = {
		// id of the canvas element
		canvasId : 'canvas',
		// id of the image element
		imageId : 'image',
		// size of the particle
		particleSize : 5,
		// canvas to image height, width size ratio
		scaleFactor : 6,
	};

	var myCanvas = imageToGreetings.create(data);
	myCanvas.imageProcessing();
	myCanvas.draw();
```

`imageToGreetings.create(data)` initializes the class with the given data.
`myCanvas.imageProcessing()` processes the image data.
And `myCanvas.draw()` finally renders it to the html page.

> For more clarity, the example folder can be checked.
    
