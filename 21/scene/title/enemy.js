class Enemy extends GuaImage {
    constructor(game, name) {
        name = name || 'enemy'
        super(game, name)
        this.setup()
    }
    setup() {
        this.dead = false
        this.y = 200
        this.speed = 1
        this.maxHP = 8
        this.hp = this.maxHP
        this.destination = 500
    }
    update() {
        if (this.dead) {
            return
        }
        this.x += this.speed
        if (this.x > this.destination) {
            log('敌人已经到达')
        }
    }
    drawHPbar() {
        let context = this.game.context
        context.fillStyle = 'red'
        let [x, y, w, h] = [this.x, this.y - 10, this.w, 10]
        // 总血量
        context.fillRect(x, y, w, h)
        // 剩余血量
        context.fillStyle = 'green'
        let w1 = w * (this.hp / this.maxHP)
        context.fillRect(x, y, w1, h)
    }
    draw() {
        super.draw()
        this.drawHPbar()
    }
    被攻击(ap) {
        // ap 就是攻击力
        this.hp -= ap
        if (this.hp <= 0) {
            this.die()
        }
    }
    die() {
        this.dead = true
        // 应该播放死亡动画
        // 这时候还应该把元素移出场景中
        this.game.scene.removeElement(this)
        log('敌人死亡')
    }
}
