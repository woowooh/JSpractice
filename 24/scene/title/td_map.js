class TDMap {
    constructor(game, w, h) {
        name = name || 'gun'
        this.w = w
        this.h = h
        this.tileSize = 100
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    addTower(i, j) {
        // 10 表示 tower
        this.grid[i][j] = 10
    }
    setup() {
        // 0 不能走
        // 1 可以走
        let grid = [
            [0, 0, 1, 0,],
            [1, 1, 1, 1,],
            [1, 1, 1, 1,],
            [1, 1, 1, 1,],
            [1, 1, 1, 1,],
            [0, 0, 1, 0,],
        ]
        this.grid = grid
        // this.grid = grid
        // let w = this.w
        // let h = this.h
        // for (var i = 0; i < w; i++) {
        //     h
        // }
    }
    normalGrid() {
        let grid = []
        for (var i = 0; i < this.grid.length; i++) {
            let column = this.grid[i]
            let newColumn = []
            for (let j = 0; j < column.length; j++) {
                let flag = column[j]
                if (flag != 1) {
                    newColumn.push(0)
                } else {
                    newColumn.push(1)
                }
            }
            grid.push(newColumn)
        }
        return grid
    }
    showGrid() {
        log('map show grid \n', this.normalGrid())
    }
    pathfinding(i, j) {
        let map = this.normalGrid()

        let graph = new Graph(map)
        let start = graph.grid[i][j]
        // end 是目的地，不会改变
        let end = graph.grid[5][2]
        let result = astar.search(graph, start, end)
        return result
    }
}
