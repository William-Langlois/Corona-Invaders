function InitGame() {
    var ClientScreenWidth = document.body.clientWidth;
    var ClientScreenHeight = document.body.clientHeight;

    if (ClientScreenWidth <= 1920 && ClientScreenHeight <= 1200) {
        ScreenWidth = ClientScreenWidth;
        ScreenHeight = ClientScreenHeight;
    } else {
        if (ClientScreenWidth > 1920) {
            ScreenWidth = 1920;
            ScreenHeight = 1200;
        } else {

        }

    }


    var config = {
        type: Phaser.AUTO,
        width: ScreenWidth,
        height: ScreenHeight,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 20},
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };


    var game = new Phaser.Game(config);

    function preload() {
        this.load.image('background', 'resources/backgrounds/background2.jpg');
        this.load.image('virus1', 'resources/virus/virus1.png');
        this.load.image('ship1', 'resources/ships/ship1.png');
        this.load.image('bullet', 'resources/bullets/bullet1.png');
    }

    var background;
    var player;

    var virusGroup;
    var virus;

    var bulletGroup;
    var bullet;

    var score = 0;
    var scoreText;

    var playerLife = 3;
    var playerLifeText;

    function create() {
        background = this.add.image(ScreenWidth / 2, ScreenHeight / 2, 'background');

        player = this.physics.add.image(0, 0, 'ship1');
        player.setCollideWorldBounds = true;
        player.setGravityY(-20);
        player.scale = 0.1;

        virusGroup = this.physics.add.group();
        bulletGroup = this.physics.add.group();
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});
        timeToShot=0;
        timeToSpawnVirus=0;
    }

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function update() {
        console.log(timeToShot);
        player.x = game.input.mousePointer.x;
        player.y = game.input.mousePointer.y;

        if (game.input.mousePointer.isDown && timeToShot == 20) {
            shot(this);
        }

        if (game.input.mousePointer.isDown && timeToSpawnVirus == 25) {
            createVirus(this);
        }

        timeToShot++;
        timeToSpawnVirus++;
        if(timeToShot == 21){
            timeToShot = 0;
        }
        if(timeToSpawnVirus == 26){
            timeToSpawnVirus = 0;
        }
    }

    function createVirus(vir){
        virus = vir.physics.add.image(getRandom(50, ScreenWidth - 50), getRandom(-150, -1500), 'virus1');
        virus.scale = 0.1;
        virusGroup.add(virus);
        vir.physics.add.overlap(virus, player, virusHitPlayer, null, virus);
        vir.physics.add.overlap(bulletGroup, virus, bulletHitVirus, null, virus);
    }

    function shot(bul){
        bullet = bul.physics.add.image(player.x, player.y, 'bullet');
        bullet.scale = 0.02;
        bullet.angle = 270;
        bulletGroup.add(bullet);
        bullet.setGravityY(-20);
        bullet.setVelocityY(-1000);
        bullet.setVelocityX(player.x - game.input.mousePointer.x)
    }

    function bulletHitVirus(Virus, Bullet) {
        Bullet.destroy();
        Virus.destroy();
        score += 10;
        scoreText.setText('Score: ' + score)
    }

    function virusHitPlayer(Virus) {
        Virus.destroy();
    }
}