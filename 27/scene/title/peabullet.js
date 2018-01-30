class Peabullet extends GuaImage {
    constructor(game, name) {
        super(game, name)
        // 子弹的伤害
        this.damage = 1
        // 子弹的速度
        this.speed = 3
        // 子弹在第几行
        this.row = -1
    }
    static new(...args) {
        return new this(...args)
    }
    update() {
        // 可以由 config 动态控制
        this.x += this.speed
    }
}
