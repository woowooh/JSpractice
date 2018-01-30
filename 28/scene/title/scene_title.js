class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    // setup 系列
    setup() {
        this.plants = []
        this.zombies = []
        this.bullets = []
        // row 表示在草地的第几排
        this.row = -1
        this.offsetY = 100
        this.offsetX = 255
        this.zombieOffset = 30
        this.withOfColumn = 80
        this.heightOfRow = 100
        //
        this.bulletHitOffset = config.hit_offset.value

        this.setupBG()
        this.setupInputs()
        this.setupZombies()
        this.setupPlants()
    }
    setupBG() {
        let bg = GuaImage.new(this.game, 'bg1')
        this.addElement(bg)
    }
    setupPlants() {
        for (var j = 0; j < 1; j++) {
            for (var i = 0; i < 5; i++) {
                let p = Peashooter.new(this.game)
                this.addPlant(p, i, j)
            }
        }
    }
    setupZombies() {
        this.addZombie(1)
        this.addZombie(3)
    }
    setupInputs() {

    }
    // debug 系列
    debug() {
        this.bulletHitOffset = config.hit_offset.value
    }
    // add 系列
    addPlant(plant, row, column) {
        let p = plant
        p.x = this.offsetX + column * this.withOfColumn
        p.y = this.offsetY + row * this.offsetY
        p.row = row
        this.addElement(p)
        this.plants.push(p)
    }
    addZombie(row) {
        // row 表示第几排， 场景会自动计算坐标，所以不应该设置 zombie 的 x
        let zombie = Zombie.new(this.game)
        zombie.x = 600
        zombie.y = this.zombieOffset + row * this.heightOfRow
        zombie.row = row
        this.zombies.push(zombie)
        this.addElement(zombie)
    }
    // remove 系列
    removeZombie(zombie) {
        this.zombies = this.zombies.filter(z => {
            return z != zombie
        })
        this.removeElement(zombie)
    }
    removeBullet(bullet) {
        this.bullets = this.bullets.filter(b => {
            return b != bullet
        })
        this.removeElement(bullet)
    }
    // update 系列
    update() {
        super.update()
        // 碰撞开火和碰撞
        this.updateFire()
        this.updateHit()
    }
    updateFire() {
        for (var j = 0; j < this.plants.length; j++) {
            let p = this.plants[j]
            p.sleep()
            for (var i = 0; i < this.zombies.length; i++) {
                let z = this.zombies[i]
                if (z.row == p.row) {
                    p.awake()
                }
            }
        }
    }
    updateHit() {
        for (var i = 0; i < this.zombies.length; i++) {
            let z = this.zombies[i]
            for (var j = 0; j < this.bullets.length; j++) {
                let b = this.bullets[j]
                if (b.row == z.row) {
                    //  判断是否相撞
                    if (z.x - b.x < this.bulletHitOffset) {
                        // 临时性的修改
                        z.被击中(b.damage)
                        b.remove()
                    }
                }
            }
        }
    }
}
