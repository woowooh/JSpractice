var imageFromPath = function(path) {
    var image = new Image()
    image.src = path
    return image
}

var e = sel => document.querySelector(sel)

var log = console.log.bind(console)
