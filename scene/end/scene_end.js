class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)        
        game.registerAction('r', function() {
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText("游戏结束 按r重新开始", 30, 280)
    }
    update() {

    }
}
