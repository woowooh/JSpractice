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
        // this.grounds = []
        // for (var i = 0; i < 4; i++) {
        //     var g = GuaImage.new(game, 'ground')
        //     g.x = i * 128
        //     g.y = 343
        //     this.addElement(g)
        //     this.grounds.push(g)
        // }
        this.skipCount = 32
        // mario
        let mario = GuaNesSprite.new(game, map)
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
