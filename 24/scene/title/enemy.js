class Enemy extends GuaImage {
    constructor(game, name) {
        name = name || 'enemy'
        super(game, name)
        this.tileSize = 0
        this.setup()
    }
    resetPath(path) {
        let steps = []
        let s = this.tileSize
        for (let i = 0; i < path.length; i++) {
            let p = path[i]
            let c = [p.x * s, p.y * s]
            steps.push(c)
        }
        this.steps = steps
        this.stepIndex = 0
    }
    setup() {
        this.map = null
        this.stepIndex = 0
        // 塔防游戏关卡应该提供的数据， 图片，哪里可以放塔，路标。
        // 需要关卡编辑器
        this.steps = []
        this.dead = false
        this.y = 100
        this.speed = 2
        this.maxHP = 18
        this.hp = this.maxHP
        this.destination = 500
    }
    update() {
        if (this.dead) {
            return
        }
        if (this.steps.length == 0) {
            return
        }
        let [dx, dy] = this.steps[this.stepIndex]
        let signX = dx > this.x ? 1 : -1
        let signY = dy > this.y ? 1 : -1
        if (dx == this.x) {
            signX = 0
        }
        if (dy == this.y) {
            signY = 0
        }
        this.x += this.speed * signX
        this.y += this.speed * signY

        if (this.x == dx && this.y == dy) {
            log('敌人已经到达目标点')
            this.stepIndex++
            // 判断敌人是否到达终点
            if (this.stepIndex == this.steps.length) {
                log('敌人到达终点')
                this.die()
            }
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
        // log('敌人死亡')
    }
}
