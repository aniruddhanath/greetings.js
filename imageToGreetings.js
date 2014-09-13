/**
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2014  Aniruddha Nath
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */
var imageToGreetings = (function (imageToGreetings) {

	var createParticles = function (num, canvasW, canvasH) {
		var particles = [];
		for(var i = 0; i < num; i++) {
			particles.push ({
				x : Math.random() * canvasW,
				y : Math.random() * canvasH,
				vx : Math.random() * 20 - 10,
				vy : Math.random() * 20 - 10,
				deltaOffset : Math.random() * 400
			});
		}
		return particles;
	}

	var Greetings = function (canvasElement, imageElement, scaleFactor, particleSize) {
		Object.defineProperties(this, {
			context : {
				value : canvasElement.getContext("2d")
			},
			canvas : {
				value : canvasElement
			},
			scaleFactor : {
				value : scaleFactor
			},
			particleSize : {
				value : particleSize
			},
			image : {
				value : imageElement
			},
			particles : {
				value : []
			},
		});
	}

	Object.defineProperties(Greetings.prototype, {
		imageProcessing : {
			value : function () {

				var imageWidth = this.image.width;
				var imageHeight = this.image.height;

				this.canvas.width = imageWidth * this.scaleFactor;
				this.canvas.height = imageHeight * this.scaleFactor;

				// Temporary canvas for holding the image for processing
				var tmpCanvas = document.createElement("canvas");
				tmpCanvas.width = imageWidth;
				tmpCanvas.height = imageHeight;
				tmpContext = tmpCanvas.getContext('2d');

				tmpContext.fillStyle = "white";
				tmpContext.fillRect(0, 0, imageWidth, imageHeight);
				tmpContext.drawImage(this.image, 0, 0, imageWidth, imageHeight);

				var pixels = tmpContext.getImageData(0, 0, imageWidth, imageHeight);
				var colorData = pixels.data;
				var r, g, b, gray;
				// iterating through the pixel data
				for(var i = 0; i < colorData.length; i += 4) {
					r = colorData[i];
					g = colorData[i+1];
					b = colorData[i+2];
					// Converting the pixel into grayscale
					gray = r*0.2126 + g*0.7152 + b*0.0722;
					if(gray < 199) {
						position = {
							x : (i / 4 % imageWidth*6 | 0),
							y : (i / 4 / imageWidth*6 | 0),
							color : "rgba("+r+","+g+","+b+",1)",
							radius : Math.random() * 2 + 4,
							deltaOffset : Math.random() * 500
						}
						this.particles.push(position);
					}
				}
			}
		},
		draw : {
			value : function () {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
				this.context.globalCompositeOperation = "source-over";
				this.context.globalCompositeOperation = "lighter";

				for (var i = 0; i < this.particles.length; i++) {
					var pt = this.particles[i];

					var now = Date.now();
					var mod = (pt.deltaOffset + now) % 400 / 400;
					mod = Math.sin(mod * Math.PI);

					this.context.beginPath();
					this.context.fillStyle = this.randomColor();
					this.context.arc(pt.x, pt.y, this.particleSize*mod, 0, Math.PI * 2, false);
					this.context.fill();
				}
			}
		},
		randomColor : {
			value : function () {
				var r, g, b;
				r = Math.floor(Math.random() * 255);
				g = Math.floor(Math.random() * 255);
				b = Math.floor(Math.random() * 255);
				return "rgba(" + r + ", " + g + ", " + b + ", 1)";
			}
		}
	});

	imageToGreetings.create = function (data) {
		var canvasElement = document.getElementById(data.canvasId);
		var imageElement = document.getElementById(data.imageId);
		var scaleFactor = data.scaleFactor;
		var particleSize = data.particleSize;
		return new Greetings(canvasElement, imageElement, scaleFactor, particleSize);
	}

	return imageToGreetings;
}(imageToGreetings || {}));