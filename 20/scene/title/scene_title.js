class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 先初始化属性
        this.towers = []
        this.enemies = []
        this.setupBG()
        this.setupGameElements()
        this.setupTower()
        this.setupHUD()

        this.setupInputs()
    }
    setupTower() {
        let t1 = Tower.new(this.game)
        t1.x = 100
        t1.y = 210
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupGameElements() {
        let e1 = Enemy.new(this.game)
        this.addElement(e1)
        let e2 = Enemy.new(this.game)
        e2.x -= 30
        this.addElement(e2)
        this.enemies.push(e1)
        this.enemies.push(e2)
    }
    setupBG() {
        var bg = GuaImage.new(this.game, 'bg')
        this.addElement(bg)
    }
    setupHUD() {
        let gun = GuaImage.new(this.game, 'gun')
        gun.x = 300
        gun.y = 300
        this.gun = gun
        this.addElement(gun)
    }
    update() {
        super.update()
        // 给所有没有 target 的 tower 寻找目标
        for (let i = 0; i < this.towers.length; i++) {
            let t = this.towers[i]
            if (t.target === null) { // TODO 最好写成函数
                t.findTarget(this.enemies)
            }
        }
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
