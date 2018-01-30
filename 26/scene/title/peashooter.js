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
        return new this(game, animation)
    }
    setup() {
    }
}
