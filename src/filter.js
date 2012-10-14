Image.prototype.applyFilter = function (filter) {
    var i, canvas, filterArgs, canvasEl;

    canvasEl = document.createElement("canvas");

    canvas = {
        el: canvasEl,
        context: canvasEl.getContext("2d"),
        width: this.naturalWidth,
        height: this.naturalHeight
    };

    canvas.el.setAttribute("width", canvas.width);
    canvas.el.setAttribute("height", canvas.height);

    // remove filter itself from the arguments
    filterArgs = [];
    filterArgs.push(canvas);
    for (i = 1; i < arguments.length; i++)
        filterArgs.push(arguments[i]);

    filter.apply(this, filterArgs);
};

var Filters = {};

/**
 * Turn the image into a grayscale image
 *
 * @param canvas canvas object
 */
Filters.grayscale = function (canvas) {
    var imageData, pixels, length, i, gsValue;

    canvas.context.drawImage(this, 0, 0);
    imageData = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
    pixels = imageData.data;

    for (i = 0, length = pixels.length; i < length; i += 4) {
        // Summarise RGB channel values to a single grayscale value
        gsValue = pixels[i] * 0.3086 + pixels[i + 1] * 0.6094 + pixels[i + 2] * 0.0820;
        pixels[i] = pixels[i+1] = pixels[i+2] = gsValue;
    }

    canvas.context.putImageData(imageData, 0, 0);
    this.src = canvas.el.toDataURL();
};

/**
 * Apply a image pattern on top of the target image
 * respecting transparent parts of the image
 *
 * @param canvas canvas object
 * @param patternImg pattern to draw on top of the original image
 * @param alpha alpha level of the overlaying pattern
 */
Filters.pattern = function (canvas, patternImg, alpha) {
    var x, y, patternWidth, patternHeight, ctx;

    patternWidth = patternImg.naturalWidth;
    patternHeight = patternImg.naturalHeight;
    ctx = canvas.context;

    ctx.drawImage(this, 0, 0);

    // Set this to keep the pattern from being drawn over transparent parts
    ctx.globalCompositeOperation = "source-atop";

    // Loop enough times to make sure the whole picture is covered
    for (y = 0; y < canvas.height; y += patternHeight) {
        for (x = 0; x < canvas.width; x += patternWidth) {
            ctx.globalAlpha = alpha;
            ctx.drawImage(patternImg, x, y);
        }
    }

    this.src = canvas.el.toDataURL();
};