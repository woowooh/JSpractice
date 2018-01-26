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
    addTower(x, y) {
        x = Math.floor(x / 100) * 100
        y = Math.floor(y / 100) * 100
        let t1 = Tower.new(this.game)
        t1.x = x
        t1.y = y
        this.addElement(t1)

        this.towers.push(t1)
    }
    setupTower() {
        this.addTower(100, 120)
        this.addTower(100, 160)
    }
    setupGameElements() {
        let offset = [0, 50]
        for (let i = 0; i < 23; i++) {
            let e1 = Enemy.new(this.game)
            e1.x -= 50 * i
            e1.y -= offset[i % 2]
            this.addElement(e1)
            this.enemies.push(e1)
        }
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
        let ox = 0
        let oy = 0
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
                    // 设置偏移 x 和 y
                     ox = self.tower.x - x
                     oy = self.tower.y - y
                }
            } else if (status == 'move') {
                if (startDrag) {
                    self.tower.x = x + ox
                    self.tower.y = y + oy
                }
            } else {
                startDrag = false
                self.removeElement(self.tower)
                self.addTower(x, y)
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
