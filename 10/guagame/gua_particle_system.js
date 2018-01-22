class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    setup() {
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 20
        this.particles = []
    }
    draw() {
        // 持续时间结束后，从scene中删除掉自己。
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i]
            // if (p.life > 0) {
            //     p.draw()
            // }
            p.draw()
        }
    }
    update() {
        // TODO 持续时间结束后删除该粒子系统
        this.duration--
        // 添加小火花
        // 更新所有的小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = Particle.new(this.game)
            var s = 1
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i]
            p.update()
        }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
}

class Particle extends GuaImage {
    constructor(game) {
        super(game, 'spark')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        // this.vx -= factor * this.vx
        // this.vy -= factor * this.vy
        this.vx += factor * this.vx
        this.vy += factor * this.vy
        // TODO 模拟重力：加速度加上重力 * 加速度
    }
}
