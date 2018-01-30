class Zombie extends GuaAnimation {
    static new(game) {
        let animation = {
            name: 'bhzombie',
            pathFormat: 'img/zombie/[action]/zombie_[action]_[index].png',
            actions: [
                {
                    name: 'walking',
                    numberOfFrames: 15,
                },
                {
                    name:'attack',
                    numberOfFrames: 11,
                },
            ]
        }
        let z = new this(game, animation)
        z.setup()
        return z
    }
    update() {
        super.update()
        this.x -= 0.4
    }
    setup() {
        this.row = -1
        this.hp = 5
    }
    被击中(damage) {
        this.hp -= damage
        if (this.hp < 1) {
            this.die()
        }
    }
    die() {
        // 先播放动画， 再删除
        // 这里我们直接删除
        this.game.scene.removeZombie(this)
    }
}
