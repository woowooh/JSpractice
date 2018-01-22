
class GuaImage {
    constructor(game, name) {
        this.game = game
        this.texture = this.game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        //
        this.flipY = false
        this.flipX = false
        this.rotation = 0
    }
    static new(game, name) {
        var i = new this(game, name)
        return i
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = 1
    }
    update() {
        this.y -= this.speed
    }
    debug() {
        this.speed = config.bullet_speed
    }
}

// 逻辑上来看不应该继承GuaImage
class Player extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown -= 1
        }
    }
    debug() {
        this.speed = config.player_speed
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
    // fire功能的冷却时间实现没有完全理解
    fire() {
        // cooldown当做状态信号，由update更新给出
        if (this.cooldown == 0) {
            var s = this.game.scene
            if (s.enableDebugMode) {
                this.cooldown = config.bullet_cooldown
            }
            else {
                this.cooldown = 5
            }
            var x = this.x + this.w / 2
            var y = this.y - this.h
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.game.scene.addElement(b)
        }
    }
}

class Enemy extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, 320)
        this.y = -randomBetween(0, 30)
        this.speed = 5
    }
    update() {
        this.y += this.speed
        if (this.y > 480) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.enemy_speed
    }
}

class Cloud extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.setup()
    }
    setup() {
        this.x = randomBetween(0, 320)
        this.y = -randomBetween(0, 30)
        this.speed = 3
    }
    update() {
        this.y += this.speed
        if (this.y > 480) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}
