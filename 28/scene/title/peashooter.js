class Peashooter extends GuaAnimation {
    static new(game) {
        let animation = {
            name: 'peashooter',
            pathFormat: 'img/peashooter/[action]/peashooter_[action]_[index].png',
            actions: [
                {
                    name: 'idle',
                    numberOfFrames: 13,
                },
                // {
                //     name:'attack',
                //     numberOfFrames: 11,
                // },
            ]
        }
        let p = new this(game, animation)
        p.setup()
        return p
    }
    setup() {
        this.cooldown = 50
        this._sleep = true
    }
    awake() {
        this._sleep = false
    }
    fire() {
        // 没有僵尸， 不发射子弹
        if (this._sleep) {
            return
        }
        this.cooldown--
        if (this.cooldown == 0) {
            // 开始冷却
            this.cooldown = 50
            // 发射子弹
            let pb = Peabullet.new(this.game, 'pb1')
            let fix = this.w / 2
            pb.x = this.x + fix
            pb.row = this.row
            pb.y = this.y
            let s = this.game.scene
            s.addElement(pb)
            s.bullets.push(pb)
        }
    }
    sleep() {
        this._sleep = true
    }
    update() {
        super.update()
        this.fire()
    }
}
