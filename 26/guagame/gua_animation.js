class GuaAnimation {
    constructor(game, animation) {
        let a = animation
        this.game = game
        this.setup()
        this.animations = {}        
        for (var i = 0; i < a.actions.length; i++) {
            var action = a.actions[i]
            this.animations[action.name] = []
            for (var j = 0; j < action.numberOfFrames; j++) {
                var index = '0'.repeat(String(action.numberOfFrames).length - String(j).length) + String(j)
                var key = a.name + action.name + index
                var t = game.textureByName(key)
                this.animations[action.name].push(t)
            }
        }
        this.animationName = a.actions[0].name
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = this.frames().length
        //
        this.flipX = false
        // 重力和加速度
        this.alpha = 1
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {

    }
    frames() {
        return this.animations[this.animationName]
    }
    updateFrame() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 5
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    update() {
        this.updateFrame()
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
    changeAnimation(name) {
        this.animationName = name
    }
}
