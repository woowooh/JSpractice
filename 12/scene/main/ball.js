var Ball = function(game) {
    var o = game.textureByName("ball")
    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false

    o.move = function() {
        if (o.fired){
            if (o.x < 0 || o.x > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    o.reflect = function() {
        o.speedY = -o.speedY
    }
    o.hasPoint = function(x, y) {
        if (o.x < x && o.x + o.image.width > x) {
            if (o.y < y && o.y + o.image.height > y) {
                console.log('haspoint')
                return true
            }
        }
        return false
    }
    return o
}
