class GuaTileMap {
    constructor(game) {
        this.game = game
        this.offsetX = 10
        this.tiles = [
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1,
            2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1,
            3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            //
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,

            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
        ]
        this.th = 15
        //TODO, tw 应该是一个整数
        this.tw = this.tiles.length / this.th
        this.tileImages = [
            GuaImage.new(game, 'b1'),
            GuaImage.new(game, 'b2'),
            GuaImage.new(game, 'b3'),
            GuaImage.new(game, 'b4'),
        ]
        this.tileSize = 32
    }
    static new(game) {
        return new this(game)
    }
    onTheGround(i, j) {
        let index = i * this.th + j
        let tile = this.tiles[index]
        return tile != 0
    }
    update() {
        this.offsetX -= 1
    }
    draw() {
        let h = this.th
        let offsetIndex = Math.abs(parseInt(this.offsetX / this.tileSize))
        let numberOfTiles = h * (12 + 1) // 12改 numberOfTiles
        if (this.offsetX + numberOfTiles < this.tiles.length) {
            numberOfTiles = this.tiles.length
        }
        for (let i = offsetIndex; i < numberOfTiles; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / h) * this.tileSize
                x += this.offsetX
                let y = (i % h) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }
}
