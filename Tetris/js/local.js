var Local = function () {
    //game obj

    var game;
    //time interval
    INTERVAL = 200;

    var time = 0;

    var timeCount = 0;
    //bind keyboard event

    var BindKeyEvent = function () {
        document.onkeydown = function (e) {
            console.log("---------------->press key");
            if (e.keyCode == 38) {//up
                game.rotate();
            } else if (e.keyCode == 39) {//right
                game.right();
            } else if (e.keyCode == 40) {//down
                game.down();
            } else if (e.keyCode == 37) {//left
                game.left();
            } else if (e.keyCode == 32) {//space
                game.fall();
            }
        }
    }

    //start thread

    var start = function () {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById('local_result')
        }
        game = new Game();
        game.init(doms, generateType(), generateDir());
        BindKeyEvent();
        game.performNext(generateType(), generateDir());
        timer = setInterval(move, INTERVAL);
    }
    this.start = start;
    //stop thread

    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    //move

    var move = function () {
        timeChange();
        if (!game.down()) {
            game.fixed();
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            if (game.checkGameOver()) {
                game.gameOver(false);
                stop();
            }
            game.performNext(generateType(), generateDir());
        }
    }

    //timecount
    var timeChange = function () {
        timeCount += 1;
        if (timeCount == 5) {
            timeCount = 0;
            time += 1;
            game.setTime(time);
        }
    }

    //random square type
    var generateType = function () {
        return Math.ceil(Math.random() * 7) - 1;
    }
    //random rotate times
    var generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1;
    }
}