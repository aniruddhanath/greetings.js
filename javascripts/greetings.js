/**
 * Greetings.js: A JavaScript module for creating a visually appealing greetings message.

 * Author: Aniruddha Nath
 * Version: 1.0.0
 * 
 * Website: https://github.com/anhee/greetings.js
 * 
 * License: http://www.opensource.org/licenses/mit-license.php
 */

var Greetings = (function(greet) {

    var Engine = function(canvas, image, scale, size, density) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.image = image;

        this.scale_factor = scale;
        this.particle_size = size;
        this.density = density;

        this.particles = [];
    };

    Engine.prototype.process = function() {
        var image_width = this.image.width;
        var image_height = this.image.height;

        this.canvas.width = image_width * this.scale_factor;
        this.canvas.height = image_height * this.scale_factor;

        // canvas holding image for processing
        var tmp_canvas = document.createElement("canvas");
        tmp_canvas.width = image_width;
        tmp_canvas.height = image_height;
        tmp_context = tmp_canvas.getContext('2d');

        tmp_context.fillStyle = "white";
        tmp_context.fillRect(0, 0, image_width, image_height);
        tmp_context.drawImage(this.image, 0, 0, image_width, image_height);

        var pixels = tmp_context.getImageData(0, 0, image_width, image_height);
        var pixel_data = pixels.data;
        var i, r, g, b, grey, length = pixel_data.length;

        for (i = 0; i < length; i += 4) {
            r = pixel_data[i];
            g = pixel_data[i + 1];
            b = pixel_data[i + 2];
            a = pixel_data[i + 3];

            // converting pixel into greyscale
            grey = (r + g + b) / 3;

            if (grey < 199) {
                position = {
                    x: i / 4 % image_width * this.scale_factor | 0,
                    y: i / 4 / image_width * this.scale_factor | 0,
                    color: "rgba(" + r + ", " + g + ", " + b + ", 1)",
                    radius: Math.random() * this.particle_size,
                    offset: Math.random() * 500
                }
                this.particles.push(position);
            }
        }
    };

    Engine.prototype.render = function() {
        var oscillation_factor = 500,
            context = this.context;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.globalCompositeOperation = "lighter";

        var i, particle, radius, length = this.particles.length;

        for (i = 0; i < length; i = i + this.density) {
            particle = this.particles[i];

            // making particle radius oscillate in first and second quadrant
            radius = particle.radius * Math.sin(((Date.now() + particle.offset) % oscillation_factor / oscillation_factor) * Math.PI);

            context.beginPath();
            context.fillStyle = particle.color;
            context.arc(particle.x, particle.y, radius, 0, 2 * Math.PI, false);
            context.fill();
        }
    };


    greet.create = function(data) {
        var canvas = document.getElementById(data.canvas);
        var image = document.getElementById(data.image);
        var scale = data.scale || 6;
        var size = data.size || 8;
        var density = data.density || 6;

        var engine = new Engine(canvas, image, scale, size, density);
        engine.process();

        function animate() {
            engine.render();
            window.requestAnimationFrame(animate);
        }

        window.requestAnimationFrame(animate);
    }

    return greet;
}(Greetings || {}));