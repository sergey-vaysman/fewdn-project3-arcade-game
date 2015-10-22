
/**
 * @description An enemy object which a player have to avoid
 * @constructor
 * @param {number} enemy x coordinate at start
 * @param {number} enemy y coordinate at start
 */
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

/**
 * @description started enemy position on the x-axis
 * @type {number}
 */
Enemy.prototype.defaultX = Math.random() * 100 * (-1);

/**
 * @description Enemy position on the first row
 * @type {Number}
 */
Enemy.prototype.yRow1 = 60;

/**
 * @description Enemy position on the second row
 * @type {Number}
 */
Enemy.prototype.yRow2 = 140;

/**
 * @description Enemy position on the third row
 * @type {Number}
 */
Enemy.prototype.yRow3 = 220;

/**
 * Updates the enemy position
 * @param {number} a time delta between ticks
 * @return {undefined}
 */
Enemy.prototype.update = function(dt) {
    this.x = utils.enemySpeed(this, dt);
    if (this.isGone()) {
        this.x = this.distance * (-1)/2;
    }
};

/**
 * Checks if the enemy is gone from visible canvas
 * @return {boolean} if the enemy is gone from visible canvas
 */
Enemy.prototype.isGone = function() {
    return this.x > (Player.prototype.maxX + this.distance);
};

/**
 * @description Max distance from the east of screen
 * when we say that enemy is gone from visible canvas
 * @type {number}
 */
Enemy.prototype.distance = 100;

/**
 * @description Draws the enemy on the screen
 * @return {undefined}
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkStrike(player);
};

/**
 * @description Checks if enemy strike the player. If it is, the game move to start
 * @param  {Player} player object
 * @return {[type]}
 */
Enemy.prototype.checkStrike = function(player) {
    if ((this.y === player.y) && Math.abs(this.x - player.x) < this.strikeDistance) {
        player.moveToStart();
        player.score = 0;
    }
};

/**
 * @description the minimum possible distance
 * between player and enemy on the x-axis
 * @type {Number}
 */
Enemy.prototype.strikeDistance = 40;


/**
 * @description Utils object for different utility operations (calculating e.t.c.)
 */
var Utils = function() {
};

/**
 * @description Calculates new position for a current enemy
 * @param  {enemy} Enemy object which position is setted
 * @param {dt} time delta
 * @return {x} new position of an enemy
 */
Utils.prototype.enemySpeed = function(enemy, dt) {
    var rand = Math.random();
    if (rand < 0.2) {
        return enemy.x += -1 * dt * Math.random(10000);
    } else if (rand < 0.6) {
        return enemy.x += 7 * Math.random(10000) + dt;
    } else {
        return enemy.x += 15 * Math.random(10000) + dt * Math.random(10000);
    }
};

var utils = new Utils();

/**
 * @description Represents a Player object
 * @constructor
 */
Player = function() {
    this.sprite = "images/char-boy.png";
    this.moveToStart();
    this.score = 0;
};

/**
 * @description updates player visible data
 * @return {undefined}
 */
Player.prototype.update = function() {
    score.update(player);
    //TODO: change different sprites of player based on its result (x10, x20 e.t.c.)
};

/**
 * @description render the player on the game canvas
 * @return {[type]}
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description handles an user input and move the player
 * @param  {string} key pressed by the user
 * @return {undefined}
 */
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
};

/**
 * @description Checks if the users should move or it at the canvas border
 * @param  {string} key pressed by the user
 * @return {boolean} is the player should move or stay at its place
 */
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

/**
 * @description started player position on the x-axis
 * @type {Number}
 */
Player.prototype.defaultX = 200;
/**
 * @description started player position on the y-axis
 * @type {Number}
 */
Player.prototype.defaultY = 380;

/**
 * @description one player's step on the x-axis
 * @type {Number}
 */
Player.prototype.dx = 100;

/**
 * @description one player's step on the y-axis
 * @type {Number}
 */
Player.prototype.dy = 80;

/**
 * @description north border for the player
 * @type {Number}
 */
Player.prototype.minY = -20;

/**
 * @description south border for the player
 * @type {Number}
 */
Player.prototype.maxY = 380;

/**
 * @description west border for the player
 * @type {Number}
 */
Player.prototype.minX = 0;

/**
 * @description east border for the player
 * @type {Number}
 */
Player.prototype.maxX = 400;

/**
 * @description player's position on the y-axis for the win
 * @type {Number}
 */
Player.prototype.winY = -20;

/**
 * @description checks if the player make a win and process it
 * @return {undefined}
 */
Player.prototype.checkWin = function() {
    if (this.y === this.winY) {
        this.score++;
        this.moveToStart();
    }
};

/**
 * @description Moves the player to start
 * @return {undefined}
 */
Player.prototype.moveToStart = function() {
    this.x = this.defaultX;
    this.y = this.defaultY;
};

/**
 * @description Represents score output
 * @constructor
 */
var Score = function() {
    this.x = this.defaultX;
    this.y = this.defaultY;
    this.increasingScore = false;
};
//TODO: make possible to calculate score for several players at one score for the game

Score.prototype.defaultX = 455;
Score.prototype.defaultY = 95;

/**
 * @description Updates the score output
 * @param  {Player}
 * @return {undefined}
 */
Score.prototype.update = function(player) {
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(
        this.backgroundPosition[0],
        this.backgroundPosition[1],
        this.backgroundDimensions[0],
        this.backgroundDimensions[1]);
    ctx.fillStyle = this.scoreColor;
    ctx.font = this.scoreFont;
    this.updateTextPosition(player.score);
    ctx.fillText(player.score, this.x, this.y);
};

/**
 * @description Updates score position centered on the background
 * @param  {number}
 * @return {undefined}
 */
Score.prototype.updateTextPosition = function(score) {
    if (score === 0) {
        this.x = this.defaultX;
    } else if (score < 10) {
        this.increasingScore = true;
    } else if (score === 10 && this.increasingScore) {
        this.x -= 10;
        this.increasingScore = false;
    } else if (score > 10 && score < 100) {
        this.increasingScore = true;
    } else if (score == 100 && this.increasingScore) {
        this.x -=5;
        this.increasingScore = false;
    }
};

Score.prototype.backgroundColor = 'black';
Score.prototype.backgroundPosition = [430, 55];
Score.prototype.backgroundDimensions = [70, 60];
Score.prototype.scoreColor = 'yellow';
Score.prototype.scoreFont = '40px Serif';

var score = new Score();

var allEnemies = [];
allEnemies[0] = new Enemy(0, Enemy.prototype.yRow1);
allEnemies[1] = new Enemy(Enemy.prototype.defaultX, Enemy.prototype.yRow2);
allEnemies[2] = new Enemy(Enemy.prototype.defaultX, Enemy.prototype.yRow3);

var player = new Player();

/**
 *@description Listens for key pressed and sends the keys to the player
 * @param  {Object} allowed key values
 * @return {undefined}
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
