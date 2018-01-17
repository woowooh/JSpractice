
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
        idle0: "img/idle0.png",
        idle1: "img/idle1.png",
        idle2: "img/idle2.png",
        //走路动画
        walk0: "img/walk0.png",
        walk1: "img/walk1.png",
        walk2: "img/walk2.png",
        walk3: "img/walk3.png",
        walk4: "img/walk4.png",
        walk5: "img/walk5.png",
    }
    var game = GuaGame.instance(30, images, function(g) {
        // var s = SceneMain.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
