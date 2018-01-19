class GuaGame {
    constructor (fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.keydowns = {}
        this.actions = {}
        this.scene = null
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext("2d")

        window.addEventListener("keydown", event => {
            this.keydowns[event.key] = 'down'
        })
        window.addEventListener("keyup", event => {
            this.keydowns[event.key] = 'up'
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    resetActions() {
        this.actions = {}
        this.keydowns = {}
    }
    drawImage(guaImage) {
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }
    textureByName(name) {
        var img = this.images[name]
        return img
    }
    runloop() {
        var g = this
        var keys = Object.keys(this.actions)
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var status = this.keydowns[key]
            if (status == 'down') {
                this.actions[key]('down')
            } else if (status == 'up') {
                this.actions[key]('up')
                // 删除掉这个key 的状态
                this.keydowns[key] = null
            }
        }
        this.update()
        this.context.clearRect(0, 0, 350, 480)
        this.draw()
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    draw() {
        this.scene.draw()
    }
    update() {
        this.scene.update()
    }
    replaceScene(scene) {
        this.scene = scene
    }
    runWithScene(scene) {
        var g = this
        this.scene = scene
        setTimeout(function() {
            g.runloop()
        }, 1000/window.fps)
    }
    __start() {
        this.runCallback(this)
    }
    init() {
        var g = this
        var names = Object.keys(this.images)
        var loads = []
        for (var i = 0; i < names.length; i++) {
            let name = names[i] // var bug why?
            var path = this.images[name]
            let image = new Image() //var bug
            image.src = path
            image.onload = function() {
                g.images[name] = image
                loads.push(1)
                // console.log('load images', loads.length, names.length)
                if (loads.length == names.length) {
                    // console.log('load images', g.images)
                    g.__start()
                }
            }
        }
    }
}
