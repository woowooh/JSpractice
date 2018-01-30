
var enableDebugMode = function(game) {
    window.addEventListener("keydown", function(event) {
        var k = event.key
        if (k == 'p') {
            window.paused = !window.paused
        }
    })
    document.querySelector("#id-speed").addEventListener("change", function(event) {
        var input = event.target
        window.fps = input.value
    })
}

var GuaAddAnimation = (images, animation) => {
    var a = animation
    var pathFormat = a.pathFormat
    var keyName = a.name
    for (var x = 0; x < a.actions.length; x++) {
        var action = a.actions[x]
        var name = action.name
        var numberOfFrames = action.numberOfFrames
        log('actions', name)
        // pathFormat: 'img/zombie/{action}/zombie_{action}_{index}.png',
        var p = pathFormat.replace(`[action]`, name).replace(`[action]`, name)
        for (var i = 0; i < numberOfFrames; i++) {
            var index = '0'.repeat(String(numberOfFrames).length - String(i).length) + String(i)
            var key = keyName + name + index
            var value = p.replace('[index]', index)
            images[key] = value
        }
    }
}
var __main = function() {
    let animationPeashooter = {
            // zombie
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
    let animationZombie = {
            // zombie
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
    var images = {
        // zombie
        bg1: 'img/background1.jpg',
    }
    GuaAddAnimation(images, animationZombie)
    GuaAddAnimation(images, animationPeashooter)

    var game = GuaGame.instance(30, images, function(g) {
        // var s = SceneMain.new(g)
        var s = SceneTitle.new(g)
        // var s = SceneEditor.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
