var Paddle = function(game) {
    var p = game.imageByName("paddle")
    // var p = {
    //     speed: 5,
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     w: image.width,
    //     h: image.height,
    // }
    p.x = 100
    p.y = 250
    p.speed = 15
    p.moveLeft = function() {
        p.x -= p.speed
    }
    p.moveRight = function() {
        p.x += p.speed
    }
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    p.collide = function(ball) {
        var a = p
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                console.log('collide ')
                return true
            }
        }
        return false
    }
    return p
}
