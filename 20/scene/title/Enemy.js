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
        this.hp = 3
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
