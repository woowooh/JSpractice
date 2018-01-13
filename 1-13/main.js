var loadLevel = function(game, n) {
    var blocks = []
    var level = levels[n - 1]
    for (var i = 0; i < level.length; i++) {
        var position = level[i]
        b = Block(game, position)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game) {
    window.addEventListener("keydown", function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            game.scene.blocks = loadLevel(game, Number(k))
        }
    })
    document.querySelector("#id-speed").addEventListener("change", function(event) {
        var input = event.target
        window.fps = input.value
    })
    game.canvas.addEventListener("mousedown", function(event){
        var x = event.offsetX
        var y = event.offsetY
        if (game.scene.ball.hasPoint(x, y)) {
            game.scene.enableDrag = true
        }
    })
    game.canvas.addEventListener("mousemove", function(event){
        var x = event.offsetX
        var y = event.offsetY
        if (game.scene.enableDrag) {
            game.scene.ball.x = x
            game.scene.ball.y = y
        }
    })
    game.canvas.addEventListener("mouseup", function(event){
        game.scene.enableDrag = false
    })
}

var __main = function() {
    var images = {
        player: "img/paddle.png",
        bullet: "img/ball.png",
        sky: "img/sky.png",
        cloud: "img/cloud.png",
    }
    var game = GuaGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
