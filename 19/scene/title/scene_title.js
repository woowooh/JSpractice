class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 500
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
        this.setupInputs()
    }
    update() {
        super.update()
    }
    setupInputs() {
        var self = this
        let startDrag = false
        this.game.registerMouse(function(event, status) {
            let x = event.offsetX
            let y = event.offsetY
            // 错误想法是直接用 pointInFrame然后就可以拽了
            if (status == 'down') {
                let 点到了 = self.gun.pointInFrame(x, y)
                if (点到了) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                }
            } else if (status == 'move') {
                self.tower.x = x
                self.tower.y = y
            } else {
                startDrag = false
                self.removeElement(self.tower)
            }
        })
        // var self = this
        // let playerSpeed = 5
        // this.game.registerAction('a', function(keyStatus) {
        //     self.mario.move(-playerSpeed, keyStatus)
        // })
        // this.game.registerAction('d', function(keyStatus) {
        //     self.mario.move(playerSpeed, keyStatus)
        // })
        // this.game.registerAction('j', function(keyStatus) {
        //     self.mario.jump()
        // })
    }
}
