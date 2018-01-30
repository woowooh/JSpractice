class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
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
    setupZombies() {
        this.addZombie(1)
        this.addZombie(3)
    }
    setupInputs() {

    }
    update() {
        super.update()
        // 碰撞开火和碰撞
        this.updateFire()
        this.updateHit()
    }
    updateFire() {
        for (var i = 0; i < this.zombies.length; i++) {
            let z = this.zombies[i]
            for (var j = 0; j < this.plants.length; j++) {
                let p = this.plants[j]
                if (p.row == z.row) {
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
                log('row', b.row)
                if (b.row == z.row) {
                    //  判断是否相撞
                    if (z.x - b.x < 20) {
                        // 临时性的修改
                        b.x += 10000
                    }
                }
            }
        }
    }
}
