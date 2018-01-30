class Tower extends GuaImage {
    constructor(game, name) {
        name = name || 'gun'
        super(game, name)
        this.setup()
    }
    setup() {
        this.rotation = -45
        this.attack = 1
        this.range = 50
        this.target = null
        this._cooldown = 5
        this._fireCount = 0
        this.cooldownOK = true
    }
    update() {
        // TODO, 当敌人渐渐远去， 你要设置 target = null
        let target = this.target
        this.updateRotation(target)
        if (this.canAttack(this.target)) {
            // log('攻击敌人')
            this.fire(target)
        }
    }
    fire(target) {
        this.countCooldown()
        if (this.cooldownOK) {
            this.resetFireCount()
            target.被攻击(this.attack)
        }
    }
    updateRotation(target) {
        if (target !== null) {
            let v = target.center().sub(this.center()).normal()
            let r = 向量夹角(v.x, -v.y)
            // log('update rotation', r)
            this.rotation = r
        }
    }
    draw() {
        // this.drawAttackRange()
        super.draw()
    }
    countCooldown() {
        if (!this.cooldownOK) {
            this._fireCount--
        }
        if (this._fireCount == 0) {
            this.cooldownOK = true
        }
    }
    resetFireCount() {
        this._fireCount = this._cooldown
        this.cooldownOK = false
    }
    drawAttackRange() {
        let context = this.game.context
        context.fillStyle = 'rgba(200, 200, 200, 0.5)'
        context.beginPath()
        let v = this.center()
        context.arc(v.x, v.y, this.range, 0, Math.PI * 2)
        context.fill()
    }
    canAttack(enemy) {
        let e = enemy
        // 检查敌人是否死亡， 如果是， 取消目标
        let enemyExist = e !== null && !e.dead
        if (e == null) {
            return false
        }
        let inRange = this.center().distance(e.center()) < this.range
        let can = enemyExist && inRange
        if (!can) {
            this.target = null
        }
        return can
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
