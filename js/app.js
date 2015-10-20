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
    if (this.x > (Player.maxX + Enemy.distance)) {
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
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player = function() {
    this.sprite = "images/char-boy.png";
    this.moveToStart();
}

Player.prototype.update = function() {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyId) {
    if (this.checkBorders(keyId)) {
        if (keyId === 'up') {
            this.y -= Player.dy;
            this.checkWin();
        } else if (keyId === 'down') {
            this.y += Player.dy;
        } else if (keyId === 'left') {
            this.x -= Player.dx;
        } else if (keyId === 'right') {
            this.x += Player.dx;
        }
    }
}

Player.defaultX = 200;
Player.defaultY = 380;

Player.dx = 100;
Player.dy = 80;

Player.minY = -20;
Player.maxY = 380;
Player.minX = 0;
Player.maxX = 400;

Player.winY = -20;

Player.prototype.checkWin = function() {
    if (this.y === Player.winY) {
        this.moveToStart();
    }
}

Player.prototype.moveToStart = function() {
    this.x = Player.defaultX;
    this.y = Player.defaultY;
}

Player.prototype.checkBorders = function(keyId) {
    if (keyId === 'down') {
        if (Math.abs(this.y - Player.maxY) < Player.dy) {
            return false;
        }
    } else if (keyId === 'left') {
        if ((this.x - Player.dx) < Player.minX) {
            return false;
        }
    } else if (keyId === 'right') {
        if (Math.abs(this.x - Player.maxX) < Player.dx) {
            return false;
        }
    }
    return true;
}

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
