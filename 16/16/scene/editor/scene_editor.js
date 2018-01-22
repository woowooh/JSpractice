class GuaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = [
            1, 1, 1, 0, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 0, 1,
            1, 1, 3, 0, 1,
        ]
        this.th = 5
        //TODO, tw 应该是一个整数
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 'b1'),
            GuaImage.new(game, 'b2'),
            GuaImage.new(game, 'b3'),
            GuaImage.new(game, 'b4'),
        ]
        this.tileSize = 32
    }
    static new(game) {
        return new this(game)
    }
    update() {

    }
    draw() {
        let h = this.th
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}

class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)
        // var w = GuaAnimation.new(game)
        // w.x = 100
        // w.y = 100
        // this.w = w
        // var bg = GuaImage.new(game, 'bg')
        // this.addElement(bg)
        //tile map
        var map = GuaTileMap.new(game)
        this.addElement(map)

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
        // mario
        let mario = GuaNesSprite.new(game)
        mario.x = 100
        mario.y = 97
        this.addElement(mario)
        this.mario = mario
        this.setupInputs()
    }
    update() {
        super.update()
    }
    // draw() {
    //     this.game.context.fillText('按 k 开始游戏', 100, 190)
    // }
    setupInputs() {
        var self = this
        let playerSpeed = 2
        this.game.registerAction('a', function(keyStatus) {
            self.mario.move(-playerSpeed, keyStatus)
        })
        this.game.registerAction('d', function(keyStatus) {
            self.mario.move(playerSpeed, keyStatus)
        })
        this.game.registerAction('j', function(keyStatus) {
            self.mario.jump()
        })
    }
}
