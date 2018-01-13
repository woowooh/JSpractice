class SceneMain extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = GuaImage.new(this.game, 'player')
        this.cloud = GuaImage.new(this.game, 'cloud')
        this.player.x = 100
        this.player.y = 400
        this.score = 0
        window.paused = false

        this.game.registerAction('w', function(){
            this.player.moveUp()
        })
        this.game.registerAction('a', function(){
            this.player.moveLeft()
        })
        this.game.registerAction('s', function(){
            this.player.moveDown()
        })
        this.game.registerAction('d', function(){
            this.player.moveRight()
        })
        this.game.registerAction('f', function(){
            this.player.fire()
        })
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
    }
    update() {
        this.cloud.y += 3
    }
}
