class GuaScene {
    constructor(game) {
        this.game = game
        this.enableDebugMode = true
        this.elements = []
        game.resetActions()
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    removeElement(node) {
        this.elements = this.elements.filter(e => {
            return e != node
        })
    }
    addElement(img) {
        this.elements.push(img)
    }
    draw() {
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.draw()
        }
    }
    update() {
        if (this.enableDebugMode) {
            this.debug && this.debug()            
            for (var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var e = this.elements[i]
            e.update()
        }
    }
}
