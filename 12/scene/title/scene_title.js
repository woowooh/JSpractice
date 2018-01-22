class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    update() {
        for (var i = 0; i < this.pipes.length / 2; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.管子横向间距 * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var i = 0; i < this.pipes.length; i++) {
            var p = this.pipes[i]

            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)


            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-250, -100)
        p2.y = p1.y + p1.h + this.pipeSpace        
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
}


class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 100
        this.w = w
        var bg = GuaImage.new(game, 'bg')
        // 循环移动地面
        this.addElement(bg)
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 加入水管

        // ground 这一块可以抽象出来，然后自写draw和update方法
        this.grounds = []
        for (var i = 0; i < 4; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 128
            g.y = 343
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 32
        this.addElement(w)

        this.setupInputs()
    }
    update() {
        super.update()
        // 地面移动
        // 同15行注释
        this.skipCount--
        var offset = -4
        if (this.skipCount == 0) {
            this.skipCount = 32
            // for (var i = 0; i < 3; i++) {
            //     var g = this.grounds[i]
            //     // g.x = i * 128
            //     g.x += offset
            // }
            offset = 124
        }
        for (var i = 0; i < 4; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    // draw() {
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
    setupInputs() {
        var self = this
        this.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus) {
            self.w.jump()
        })
    }
}
