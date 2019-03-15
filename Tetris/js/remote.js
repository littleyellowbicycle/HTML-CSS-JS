var Remote = function () {
    // game obj
    var game;

    //start

    var start = function (type, times) {
        var doms = {
            gameDiv: document.getElementById('remote_game'),
            nextDiv: document.getElementById('remote_next'),
            timeDiv: document.getElementById('remote_time'),
            scoreDiv: document.getElementById('remote_score'),
            resultDiv: document.getElementById('remote_result')
        }
        game = new Game();
        game.init(doms, type, times);
        BindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, INTERVAL);
    }

    // bind button event
    var bindButtonEvent = function () {
        document.getElementById("left").onclick = function () {
            game.left();
        }
        document.getElementById("right").onclick = function () {
            game.left();
        }
        document.getElementById("down").onclick = function () {
            game.left();
        }
        document.getElementById("fall").onclick = function () {
            game.left();
        }
        document.getElementById("roate").onclick = function () {
            game.left();
        }

    }
    //api export
    this.start = start;
    this.bindButtonEvent = bindButtonEvent;

}