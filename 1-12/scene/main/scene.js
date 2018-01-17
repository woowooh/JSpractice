class SceneMain extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        this.blocks = loadLevel(game, 3)
        this.ball = Ball(game)
        this.paddle = Paddle(game)
        this.score = 0
        this.enableDrag = false
        window.paused = false
        var self = this
        this.init()
    }

    update() {
        var s = this
        if (window.paused) {
            return
        }
        s.ball.move()
        if (s.ball.y >= s.game.canvas.height) {
            var scene_end = SceneEnd.new(s.game)
            s.game.replaceScene(scene_end)
        }
        if (s.paddle.collide(s.ball)) {
            console.log("相撞")
            s.ball.speedY = -s.ball.speedY
        }
        for (var i = 0; i < s.blocks.length; i++) {
            var block = s.blocks[i]
            if (block.collide(s.ball)) {
                if (block.alive) {
                    s.score += 100
                    s.ball.reflect()
                    console.log(block)
                    block.kill()
                }
            }
        }
    }
    draw() {
        var s = this
        this.game.drawImage(this.paddle)
        this.game.drawImage(s.ball)
        s.game.context.fillText("分数:" + s.score, 30, 280)
        for (var i = 0; i < s.blocks.length; i++) {
            var block = s.blocks[i]
            if (block.alive) {
                s.game.drawImage(block)
            }
        }
    }
    init() {
        var s = this
        this.game.registerAction('a', function(){
            s.paddle.moveLeft()
        })
        this.game.registerAction('d', function(){
            s.paddle.moveRight()
        })
        this.game.registerAction('f', function(){
            s.ball.fire()
        })
    }
}
