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
        }
    })
    document.querySelector("#id-speed").addEventListener("change", function(event) {
        var input = event.target
        window.fps = input.value
    })
}

var __main = function() {
    var images = {
        player: "img/paddle.png",
        bullet: "img/ball.png",
        sky: "img/sky.png",
        cloud: "img/cloud.png",
        enemy: "img/enemy.png",
        // enemy1: "img/enemy1.png",
        // enemy2: "img/enemy2.png",
        // enemy3: "img/enemy3.png",
        // enemy4: "img/enemy4.png",
    }
    var game = GuaGame.instance(30, images, function(g) {
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
