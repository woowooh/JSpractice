class Tower extends GuaImage {
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        this.attack = 1
        this.range = 50
        this.target = null
    }
    update() {
        // TODO, 当敌人渐渐远去， 你要设置 target = null
        if (this.canAttack(this.target)) {
            log('攻击敌人')
            // this.fire(target)
            this.target.被攻击(this.attack)
            if (this.target.dead) {
                this.target = null
            }
        }
    }
    canAttack(enemy) {
        let e = enemy
        let enemyExist = e !== null && !e.dead
        if (enemyExist) {
            return this.center().distance(e.center()) < this.range
        } else {
            return false
        }
    }
    findTarget(enemies) {
        for (var i = 0; i < enemies.length; i++) {
            let e = enemies[i]
            // do what, 不 do how
            if (this.canAttack(e)) {
                this.target = e
                break
            }
        }
    }
}
