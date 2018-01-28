class GuaAnimation {
    constructor(game) {
        this.game = game
        this.setup()
        //为了省事， 在这里hard code 一套动画
        this.animations = {
            idle: [],
        }
        for (var i = 0; i < 3; i++) {
            var name = `bird${i}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        this.animationName = 'idle'
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 5
        //
        this.flipX = false
        // 重力和加速度
        this.gy = 10
        this.vy = 0

        this.rotation = 0
        this.alpha = 1
    }
    static new(game) {
        return new this(game)
    }
    setup() {

    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        // 更新 alpha
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 5
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 315
        if (this.y > h) {
            this.y = h
        }
        if (this.rotation < 45) {
            this.rotation += 10
        }
    }
    draw() {
        var context = this.game.context
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        // translate scale操作的是当前画布的坐标系
        context.translate(this.x + w2, this.y + h2) // 坐标系原点放置到图片原点
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)


        context.drawImage(this.texture, 0, 0)

        context.restore()
    }
    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.filpX = false
        // }
        this.flipX = x < 0
        this.x += x
    }
    jump() {
        this.vy = -10
        this.rotation = -90
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
