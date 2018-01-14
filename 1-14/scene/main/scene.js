class SceneMain extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInput()
    }
    setup() {
        this.numberOfEnemies = 5
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = Player.new(this.game, 'player')
        this.cloud = Cloud.new(this.game, 'cloud')
        this.player.x = 100
        this.player.y = 400
        this.score = 0
        window.paused = false
        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addEnemies()
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game, 'enemy')
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInput() {
        var g = this.game
        var s = this
        this.game.registerAction('w', function(){
            s.player.moveUp()
        })
        this.game.registerAction('a', function(){
            s.player.moveLeft()
        })
        this.game.registerAction('s', function(){
            s.player.moveDown()
        })
        this.game.registerAction('d', function(){
            s.player.moveRight()
        })
        this.game.registerAction('f', function(){
            s.player.fire()
        })
    }
}
