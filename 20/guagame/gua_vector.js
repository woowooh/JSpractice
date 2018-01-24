class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static new(...arg) {
        return new this(...arg)
    }
    distance(vector) {
        let v = vector
        let dx = v.x - this.x
        let dy = v.y - this.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}
