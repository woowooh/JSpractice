class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.count = 0
        this.debugPath = []
        // 初始化地图
        this.map = TDMap.new(this.game, 6, 4)
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
        let t1 = Tower.new(this.game)
        let towerSize = t1.w
        let i = Math.floor(x / towerSize)
        let j = Math.floor(y / towerSize)
        // 设置地图属性
        this.map.addTower(i, j)
        x = i * towerSize
        y = j * towerSize
        t1.x = x
        t1.y = y
        this.addElement(t1)

        this.towers.push(t1)
        // find path for enemies
        this.map.showGrid()
        this.findPathForEnemies()
    }
    findPathForEnemies() {
        let s = this.map.tileSize
        for (let n = 0; n < this.enemies.length; n++) {
            let e = this.enemies[n]
            // if (typeof e != 'undefined') {
                let x = e.x
                let y = e.y
                let i = Math.floor(x / s)
                let j = Math.floor(y / s)
                let path = this.map.pathfinding(i, j)
                // 设置敌人的 steps 并且重置敌人的 stepIndex
            // }
            e.resetPath(path)
            // 用于 debug 的临时性变量
            this.debugPath = path
        }
        // 为每一个敌人单独寻路 pathfinding
    }
    drawDebugPath(path) {
        let s = this.map.tileSize
        let context = this.game.context
        for (let i = 0; i < path.length; i++) {
            let p = path[i]
            let x = p.x * s
            let y = p.y * s
            context.fillStyle = 'rgba(200, 200, 200, 0.5)'
            context.fillRect(x, y, s, s)
        }
    }
    setupTower() {
        this.addTower(100, 0)
    }
    setupGameElements() {
        let offset = [0, 30]
        for (let i = 0; i < 1; i++) {
            let e1 = Enemy.new(this.game)
            e1.tileSize = this.map.tileSize
            e1.x -= 50 * i
            e1.y += offset[i % 2]
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
        gun.y = 380
        this.gun = gun
        this.addElement(gun)
    }
    draw() {
        super.draw()
        this.drawDebugPath(this.debugPath)
    }
    update() {
        super.update()
        this.count++
        if (this.count == 60) {
            this.count = 0
            let e1 = Enemy.new(this.game)
            e1.tileSize = this.map.tileSize
            this.addElement(e1)
            this.enemies.push(e1)
            // this.findPathForEnemies()
        }
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
                if (!startDrag) {
                    return
                }
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
