class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.setupInputs()
        let zombie = Zombie.new(this.game)
        zombie.x = 200
        zombie.y = 200
        this.addElement(zombie)
        // 用来调试用
        window.z = zombie
    }
    setupInputs() {

    }
}
