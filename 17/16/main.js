
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
        bg: "img/bg.png",
        ground: "img/ground.png",
        // pipe: "img/pipe.png",
        b1: 'tiles/b1.png',
        b2: 'tiles/b2.png',
        b3: 'tiles/b3.png',
        b4: 'tiles/b4.png',
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
        // var s = SceneTitle.new(g)
        var s = SceneEditor.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game)
}

__main()
