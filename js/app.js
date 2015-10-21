// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var rand = Math.random();
    if (rand < 0.2) {
        this.x += -1 * dt * Math.random(10000);
    } else if (rand < 0.6) {
        this.x += 7 * Math.random(10000) + dt;
    } else {
        this.x += 15 * Math.random(10000) + dt * Math.random(10000);
    }
    
    if (this.x > (Player.prototype.maxX + Enemy.distance)) {
        this.x = Enemy.distance * (-1)/2;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

Enemy.distance = 100;
Enemy.strikeDistance = 40;

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkStrike(player);
};

Enemy.prototype.checkStrike = function(player) {
    if ((this.y === player.y) && Math.abs(this.x - player.x) < Enemy.strikeDistance) {
        player.moveToStart();
        player.score = 0;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player = function() {
    this.sprite = "images/char-boy.png";
    this.moveToStart();
    this.score = 0;
}

Player.prototype.update = function() {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyId) {
    if (this.checkBorders(keyId)) {
        if (keyId === 'up') {
            this.y -= this.dy;
            this.checkWin();
        } else if (keyId === 'down') {
            this.y += this.dy;
        } else if (keyId === 'left') {
            this.x -= this.dx;
        } else if (keyId === 'right') {
            this.x += this.dx;
        }
    }
}

Player.prototype.defaultX = 200;
Player.prototype.defaultY = 380;

Player.prototype.dx = 100;
Player.prototype.dy = 80;

Player.prototype.minY = -20;
Player.prototype.maxY = 380;
Player.prototype.minX = 0;
Player.prototype.maxX = 400;

Player.prototype.winY = -20;

Player.prototype.checkWin = function() {
    if (this.y === this.winY) {
        this.score++;
        this.moveToStart();
    }
}

Player.prototype.moveToStart = function() {
    this.x = this.defaultX;
    this.y = this.defaultY;
}

Player.prototype.checkBorders = function(keyId) {
    if (keyId === 'down') {
        if (Math.abs(this.y - this.maxY) < this.dy) {
            return false;
        }
    } else if (keyId === 'left') {
        if ((this.x - this.dx) < this.minX) {
            return false;
        }
    } else if (keyId === 'right') {
        if (Math.abs(this.x - this.maxX) < this.dx) {
            return false;
        }
    }
    return true;
};

var Score = function() {
};

Score.prototype.update = function(player) {
    ctx.fillStyle='red';
    ctx.font = '30px Serif';
    ctx.fillText('Highscore: ' + player.score, 50, 100);
}

var score = new Score();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy(0, 60);
allEnemies[1] = new Enemy(Math.random() * 100 * (-1), 140);
allEnemies[2] = new Enemy(Math.random() * 100 * (-1), 220);

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
