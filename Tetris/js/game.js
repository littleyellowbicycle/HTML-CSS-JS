var Game = function () {
    //dom
    var gameDiv;

    var nextDiv;

    var timeDiv;

    var scoreDiv;

    var resultDiv;

    var score;

    var gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    //diamond

    var cur;//current diamond
    var next;//next diamond


    //--------------------------------init div--------------------------------


    var nextDivs = [];

    var gameDivs = [];

    var initDiv = function (Container, Data, Divs) {
        for (var i = 0; i < Data.length; i++) {
            var Div = [];
            for (var j = 0; j < Data[0].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = i * 20 + 'px';
                newNode.style.left = j * 20 + 'px';
                Container.appendChild(newNode);
                Div.push(newNode);
            }
            Divs.push(Div);
        }
    }

    //--------------------------------reflesh div--------------------------------

    var refleshDiv = function (Data, Divs) {
        for (var i = 0; i < Data.length; i++) {
            for (var j = 0; j < Data[0].length; j++) {
                if (Data[i][j] == 0) {
                    Divs[i][j].className = 'none';
                } else if (Data[i][j] == 1) {
                    Divs[i][j].className = 'done';
                } else if (Data[i][j] == 2) {
                    Divs[i][j].className = 'current';
                }
            }
        }
    }

    //--------------------------------isValid position--------------------------------

    var isValid = function (pos, data) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[0].length; j++) {
                if (data[i][j] != 0) {
                    if (!check(pos, i, j))
                        return false;
                }
            }
        }
        return true;
    }

    //--------------------------------check position--------------------------------

    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            //console.log("\npos.x + x is: ----->" + (pos.x + x) + "\npos.y + y is: " + (pos.y + y));
            return false;
        } else {
            return true;
        }
    }

    //--------------------------------set position--------------------------------
    var setData = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j))
                    gameData[i + cur.origin.x][j + cur.origin.y] = cur.data[i][j];
            }
        }
    }

    //--------------------------------clear--------------------------------
    var clear = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j))
                    gameData[i + cur.origin.x][j + cur.origin.y] = 0;
            }
        }
    }
    //--------------------------------down--------------------------------

    var down = function () {
        if (cur.canDown(isValid)) {
            clear();
            cur.down();
            setData();
            refleshDiv(gameData, gameDivs);
            return true;
        } else {
            //console.log("-------------->left or right")
            return false;
        }
    }

    //--------------------------------left--------------------------------

    var left = function () {
        if (cur.canLeft(isValid)) {
            clear();
            cur.left();
            setData();
            refleshDiv(gameData, gameDivs);
        }
    }

    //--------------------------------right--------------------------------

    var right = function () {
        if (cur.canRight(isValid)) {
            clear();
            cur.right();
            setData();
            refleshDiv(gameData, gameDivs);
        }
    }

    //--------------------------------rotate--------------------------------
    var rotate = function () {
        if (cur.canRotate(isValid)) {
            clear();
            cur.rotate();
            setData();
            refleshDiv(gameData, gameDivs);
        }
    }

    //--------------------------------fixed--------------------------------
    var fixed = function () {
        for (var i = 0; i < cur.data.length; i++) {
            for (var j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    if (gameData[i + cur.origin.x][j + cur.origin.y] == 2) {
                        gameData[i + cur.origin.x][j + cur.origin.y] = 1;
                    }
                }
            }
        }
        refleshDiv(gameData, gameDivs);
    }
    //--------------------------------add bottom line--------------------------------

    var addlines = function (lines) {
        for (var i = 0; i < gameData.length - lines.length; i++) {
            gameData[i] = gameData[i + lines];
        }
        for (var i = 0; i < lines.length; i++) {
            gameData[gameData.length + i - lines.length] = lines[i];
        }
        cur.origin.x -= lines.length;
        if (cur.origin.x < 0)
            cur.origin.x = 0;
        refleshDiv(gameData, gameDivs);
    }
    //--------------------------------add bottom line--------------------------------
    var addbottomlines = function (lines) {
        var lines = [];
        for (var i = 0; i < lines; i++) {
            var line = [];
            for (var j = 0; j < 10; j++) {
                line[j] = Math.ceil(Math.random() * 2) - 1;
            }
            lines.push(line);
        }
        return lines;
    }
    //--------------------------------CheckClear--------------------------------

    var checkClear = function () {
        var line = 0;
        for (var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for (var j = 0; j < gameData[0].length; j++) {
                if (gameData[i][j] != 1) {
                    clear = false;
                    break;
                }
            }
            if (clear) {
                line += 1;
                console.log("row num is: " + i);
                for (var m = i; m > 0; m--) {
                    for (var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m - 1][n - 1];
                    }
                }
                for (var x = 0; x < gameData[0].length; x++) {
                    gameData[0][x] = 0;
                }
                i++;
            }
        }
        refleshDiv(gameData, gameDivs);
        return line;
    }

    //--------------------------------CheckGameOver--------------------------------

    var checkGameOver = function () {
        var gameover = false;
        for (var i = 0; i < gameData[0].length; i++) {
            if (gameData[1][i] == 1)
                return true;
        }
        return false;
    }

    //--------------------------------set time&&score&&result--------------------------------
    var setTime = function (time) {
        timeDiv.innerHTML = time;
    }

    var addScore = function (line) {
        var s = 0;
        switch (line) {
            case 1:
                s = 10;
                break;
            case 2:
                s = 10;
                break;
            case 3:
                s = 10;
                break;
            case 4:
                s = 10;
                break;
            default:
                break;
        }
        score += s;
        scoreDiv.innerHTML = socre;
    }

    var gameOver = function (win) {
        if (win)
            resultDiv.innerHTML = "you win";
        else
            resultDiv.innerHTML = "gg";
    }

    //--------------------------------new next--------------------------------

    var performNext = function (type, times) {
        cur = next;
        setData();
        next = SquareFactory.prototype.make(type, times);
        refleshDiv(gameData, gameDivs);
        refleshDiv(next.data, nextDivs);
    }
    //--------------------------------init--------------------------------

    var init = function (doms, type, times) {
        timeDiv = doms.timeDiv;
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        scoreDiv = doms.scoreDiv;
        resultDiv = doms.resultDiv;
        next = SquareFactory.prototype.make(type, times);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refleshDiv(gameData, gameDivs);
        refleshDiv(next.data, nextDivs);
    }

    //--------------------------------APT export--------------------------------
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fixed = fixed;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.setTime = setTime;
    this.addScore = addScore;
    this.gameOver = gameOver;
    this.addlines = addlines;
    this.addbottomlines = addbottomlines;
    this.fall = function () { while (down()) { } };
}