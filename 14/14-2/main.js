
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

var __main = function() {
    var images = {
        bird0: "img/birdfly0.png",
        bird1: "img/birdfly1.png",
        bird2: "img/birdfly2.png",
        bg: "img/bg.png",
        ground: "img/ground.png",
        pipe: "img/pipe.png",
    }

    const ajax = request => {
        let r = new XMLHttpRequest()
        r.open(request.method, request.url, true)
        r.responseType = 'arraybuffer'
        r.onreadystatechange = event => {
            if (r.readyState == 4) {
                request.callback(r.response)
            }
        }
        r.send()
    }

    let request = {
        method: 'GET',
        url: 'mario.nes',
        callback: function(r) {
            window.bytes = new Uint8Array(r)
            log('mario file', bytes)
        },
    }
    ajax(request)
    var game = GuaGame.instance(30, images, function(g) {
        // var s = SceneMain.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
