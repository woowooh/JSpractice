class GuaAnimation {
    constructor(game) {
        this.game = game
        this.setup()
        //为了省事， 在这里hard code 一套动画
        this.animations = {
            idle: [],
            walk: [],
        }
        for (var i = 0; i < 5; i++) {
            var name = `walk${i}`
            var t = game.textureByName(name)
            this.animations['walk'].push(t)
        }
        for (var i = 0; i < 3; i++) {
            var name = `idle${i}`
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
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 5
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        if (this.flipX) {
            var context = this.game.context
            context.save()
            // 移动画布。。再旋转
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            context.drawImage(this.texture, this.x, this.y)

            context.restore()
        } else{
            this.game.drawImage(this)
        }
    }
    move(x, keyStatus) {
        // if (x < 0) {
        //     this.flipX = true
        // } else {
        //     this.filpX = false
        // }
        this.flipX = x < 0
        this.x += x
        var animationNames = {
            down: 'walk',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
