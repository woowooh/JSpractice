class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = SceneMain.new(game)
            game.replaceScene(s)
        })
        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 200
        this.w = w
        this.addElement(w)

        this.setupInputs()
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
    }
}
