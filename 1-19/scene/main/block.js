var Block = function(game, position) {
    var p = position
    console.log(position)
    var img = game.imageByName('block')
    var o = {
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    o.image = img.image
    o.w = img.w
    o.h = img.h
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    o.kill = function() {
        o.lifes--
        if (o.lifes == 0) {
            o.alive = false
        }
    }
    return o
}
