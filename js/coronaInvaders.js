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
    var spawn_virus_speed;
    var timerVirus;
    var nb_virus = 0;

    var bulletGroup;
    var bullet;
    var cadence_tir;
    var nb_tir;
    var nb_tir_tt=0;
    var shotFired = 0;

    var score = 0;
    var scoreText;

    var nb_kill = 0;
    var waveLvl = 1;

    var multiplier=0;


    function create() {
        background = this.add.image(ScreenWidth / 2, ScreenHeight / 2, 'background');

        player = this.physics.add.image(0, 0, 'ship1');
        player.setGravityY(-20);
        player.scale = 0.1;

        virusGroup = this.physics.add.group();
        bulletGroup = this.physics.add.group();
        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff'});
        cadence_tir = 10;
        spawn_virus_speed = 100;

    }

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function update() {
        player.x = game.input.mousePointer.x;
        player.y = game.input.mousePointer.y;

        if (game.input.mousePointer.isDown) {
            if (firstShotTime == 0) {
                shot(this);

                shotFired = 1;
                nb_tir = 1;
            } else {
                if (firstShotTime / cadence_tir == nb_tir) {
                    shot(this);
                    nb_tir++;
                    let i = 0;
                }
            }
            firstShotTime++;
        } else {
            if (shotFired == 1) {
                if (timer / cadence_tir == 1) {
                    shotFired = 0;
                    timer = 0;
                    firstShotTime = 0;
                    nb_tir_tt = nb_tir_tt+nb_tir;
                }
                timer++
            } else {
                firstShotTime = 0;
                timer = 0;
            }
        }

        if (nb_virus == 0) {
            createVirus(this);
            nb_virus = 1;
            console.log(nb_virus);
            timerVirus = 0;
        } else {
            if (timerVirus / spawn_virus_speed == nb_virus) {
                console.log(timerVirus + ' vir_speed ' + spawn_virus_speed);

                createVirus(this);
                nb_virus++;
            }
            timerVirus++;
        }

        if (nb_kill == 10 && waveLvl == 1) {
            waveLvl++;

            spawn_virus_speed = 80;
            nb_virus = 0;
            timerVirus = 0;
        }
        if (nb_kill == 35 && waveLvl == 2) {
            waveLvl++;

            spawn_virus_speed = 60;
            nb_virus = 0;
            timerVirus = 0;
        }
        if (nb_kill == 75 && waveLvl == 3) {
            waveLvl++;

            spawn_virus_speed = 50;
            nb_virus = 0;
            timerVirus = 0;
        }
        if (nb_kill == 100 && waveLvl == 4) {
            waveLvl++;

            spawn_virus_speed = 30;
            nb_virus = 0;
            timerVirus = 0;
        }
        if (nb_kill == 200 && waveLvl == 5) {
            waveLvl++;

            spawn_virus_speed = 10;
            nb_virus = 0;
            timerVirus = 0;
        }
        if (nb_kill == 500 && waveLvl == 6) {
            waveLvl++;

            spawn_virus_speed = 5;
            nb_virus = 0;
            timerVirus = 0;

        }
        if (nb_kill == 1000 && waveLvl == 7) {
            waveLvl++;

            spawn_virus_speed = 1;
            nb_virus = 0;
            timerVirus = 0;
        }
        console.log(nb_tir_tt);

    }

    function createVirus(vir) {
        virus = vir.physics.add.image(getRandom(50, ScreenWidth - 50), getRandom(-150, -1500), 'virus1');
        virus.scale = 0.1;
        virusGroup.add(virus);
        vir.physics.add.overlap(virus, player, virusHitPlayer, null, virus);
        vir.physics.add.overlap(bulletGroup, virus, bulletHitVirus, null, virus);
    }

    function shot(bul) {
        bullet = bul.physics.add.image(player.x, player.y, 'bullet');
        bullet.scale = 0.02;
        bullet.angle = 270;
        bulletGroup.add(bullet);
        bullet.setGravityY(-20);
        bullet.setVelocityY(-1000);
    }

    function bulletHitVirus(Virus, Bullet) {
        Bullet.destroy();
        if (Virus.y >= 0) {
            Virus.destroy();
            score += 10;
            scoreText.setText('Score: ' + score)
            nb_kill++;
        }
    }

    function virusHitPlayer(Virus) {
        Virus.destroy();
        endGame();
    }

    function endGame(){
        game.destroy();
        console.log('Votre score : '+score);
        console.log('kills : '+nb_kill);
        console.log('nombre de coups de feu tirés : '+nb_tir_tt);
        var accuracy = Math.round((nb_kill/nb_tir_tt)*100);
        console.log('Précision : '+accuracy+'%');

        multiplier+=(accuracy/10);

        var Final_Score = score * multiplier;
        console.log('\n \n Score Final : '+Final_Score+' !');

    }
}