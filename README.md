#JS Image Filters

Js Image Filters is an utility to easily apply a filter on an Image object. Current implementation has the following filters:
* Grayscale
* Image pattern

## Usage

The filters are really easy to use. Just include filters.js and the following code will make the picture grayscale:

    var picture = new Image();
    picture.src = "example.png";
    picture.applyFilter(Filters.grayscale);

