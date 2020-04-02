function InitGame() {
    var ClientScreenWidth = document.body.clientWidth;
    var ClientScreenHeight = document.body.clientHeight;

    if (ClientScreenWidth <= 1920 && ClientScreenHeight <= 1200) {
        ScreenWidth = ClientScreenWidth;
        ScreenHeight = ClientScreenHeight;
    } else {
        if (ClientScreenWidth > 1920 && ClientScreenHeight > 1200) {
            ScreenWidth = 1920;
            ScreenHeight = 1200;
        } else {
            if (ClientScreenWidth > 1920) {
                ScreenWidth = 1920;
                ScreenHeight = ClientScreenHeight;
            }
            if (ClientScreenHeight > 1200) {
                ScreenWidth = ClientScreenWidth;
                ScreenHeight = 1200;
            }

        }

    }


    var config = {
        type: Phaser.AUTO,
        width: ScreenWidth,
        height: ScreenHeight,
        parent: 'game-div',
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
            update: update,
        },
    };


    var game = new Phaser.Game(config);

    function preload() {
        this.load.image('background', 'resources/backgrounds/background2.jpg');
        this.load.image('virus1', 'resources/virus/virus1.png');
        this.load.image('ship1', 'resources/ships/ship1.png');
        this.load.image('bullet', 'resources/bullets/bullet1.png');
        this.load.image('planet', 'resources/planets/planet1.png');
        this.load.image('bottomCollider', 'resources/others/bottomCollider.jpg');

        this.load.audio('music', 'resources/musics/Deorro-Five_hours.mp3');

        this.load.audio('gunshot', 'resources/sounds/gunshot.mp3');
        this.load.audio('splash', 'resources/sounds/splash.mp3');


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
    var nb_tir_tt = 0;
    var shotFired = 0;

    var score = 0;
    var scoreText;

    var nb_kill = 0;
    var waveLvl = 1;

    var multiplier = 0;

    var planet_contamination = 0;
    var contamination_status_bar;

    var intro_terminated = 0;
    var gameOver = false;


    function create() {
        background = this.add.image(ScreenWidth / 2, ScreenHeight / 2, 'background');
        planet = this.add.image(ScreenWidth / 2, ScreenHeight - ScreenHeight / 2, 'planet');
        planet.scale = 10;
        bottomCollider = this.physics.add.image(ScreenWidth / 2, ScreenHeight + 2510, 'bottomCollider');
        bottomCollider.setGravityY(-20);

        player = this.physics.add.image(0, 0, 'ship1');
        player.setGravityY(-20);
        player.scale = 0.2;
        player.x = ScreenWidth / 2;
        player.y = ScreenHeight / 2;

        virusGroup = this.physics.add.group();
        bulletGroup = this.physics.add.group();
        contamination_status_bar = this.add.text(16, 16, 'Contamination |----------|', {
            fontSize: '35px',
            fill: '#fff'
        });
        scoreText = this.add.text(16, ScreenHeight - 56, 'Éliminations: 0', {fontSize: '35px', fill: '#fff'});

        this.input.setDefaultCursor('none');

        cadence_tir = 10;
        spawn_virus_speed = 100;
        game.sound.play('music');
        game.input.mousePointer.x = ScreenWidth / 2;
        game.input.mousePointer.y = ScreenHeight - ScreenHeight / 2;
        j = 0;
    }

    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function update() {
        if (intro_terminated == 2) {
            planet.rotation += 0.0005;
            planet.y = ScreenHeight + (ScreenHeight / 2) - (player.y / 60);
            planet.x = ScreenWidth / 2 - (player.x / 60);

            background.y = ScreenHeight / 2 - (player.y / 60);
            background.x = ScreenWidth / 2 - (player.x / 60);

            player.x = game.input.mousePointer.x;
            player.y = game.input.mousePointer.y;

            if(gameOver == false) {
                if (game.input.mousePointer.isDown) {
                    if (firstShotTime == 0) {
                        shot(this);
                        game.sound.play('gunshot');

                        shotFired = 1;
                        nb_tir = 1;
                        nb_tir_tt++;
                    } else {
                        if (firstShotTime / cadence_tir == nb_tir) {
                            shot(this);
                            game.sound.play('gunshot');

                            nb_tir++;
                            let i = 0;
                            nb_tir_tt++;
                        }
                    }
                    firstShotTime++;
                } else {
                    if (shotFired == 1) {
                        if (timer / cadence_tir == 1) {
                            shotFired = 0;
                            timer = 0;
                            firstShotTime = 0;
                        }
                        timer++
                    } else {
                        firstShotTime = 0;
                        timer = 0;
                    }
                }
            }

            if (nb_virus == 0) {
                createVirus(this);
                nb_virus = 1;
                timerVirus = 0;
            } else {
                if (timerVirus / spawn_virus_speed == nb_virus) {

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

                spawn_virus_speed = 70;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 75 && waveLvl == 3) {
                waveLvl++;

                spawn_virus_speed = 60;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 100 && waveLvl == 4) {
                waveLvl++;

                spawn_virus_speed = 50;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 200 && waveLvl == 5) {
                waveLvl++;

                spawn_virus_speed = 40;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 300 && waveLvl == 6) {
                waveLvl++;

                spawn_virus_speed = 30;
                nb_virus = 0;
                timerVirus = 0;

            }
            if (nb_kill == 400 && waveLvl == 7) {
                waveLvl++;

                spawn_virus_speed = 25;
                nb_virus = 0;
                timerVirus = 0;
            }
            if (nb_kill == 500) {
                endGame('win')
            }
        } else {
            if (intro_terminated == 1) {
                intro_terminated = 2;
            } else {
                j++;

                player.x = game.input.mousePointer.x;
                player.y = game.input.mousePointer.y;
                if (player.scale > 0.1) {
                    player.scale -= 0.0001
                }

                background.y = ScreenHeight / 2 - (player.y / 60);
                background.x = ScreenWidth / 2 - (player.x / 60);

                planet.x = ScreenWidth / 2 - (player.x / 60);
                planet.y = ScreenHeight - ScreenHeight / 2 - (player.y / 60) + j;

                planet.rotation += 0.0005;


                if (planet.scale >= 1) {
                    planet.scale -= 0.015;
                }
                if (planet.y >= ScreenHeight + (ScreenHeight / 2)) {
                    intro_terminated = 1;
                }
            }
        }
    }

    function createVirus(vir) {
        virus = vir.physics.add.image(getRandom(50, ScreenWidth - 50), getRandom(-150, -1500), 'virus1');
        virus.scale = 0.1;
        virus.body.collideWorldBounds = true;
        virus.checkWorldBounds = true;
        virusGroup.add(virus);
        vir.physics.add.overlap(virus, player, virusHitPlayer, null, virus);
        vir.physics.add.overlap(bulletGroup, virus, bulletHitVirus, null, virus);
        vir.physics.add.overlap(virus, bottomCollider, virusHitPlanet, null, virus);

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
            game.sound.play('splash');
            score += 10;
            nb_kill++;
            scoreText.setText('Éliminations : ' + nb_kill);
        }
    }

    function virusHitPlanet(Virus) {
        Virus.destroy();
        if (planet_contamination < 100) {
            planet_contamination += 10;
        }
        nb_contamination = planet_contamination / 10;
        var space_missing = 10 - nb_contamination;
        var contamination_icon = '';
        for (let i = 0; i < nb_contamination; i++) {
            contamination_icon = contamination_icon + 'X';
        }
        for (let i = 0; i < space_missing; i++) {
            contamination_icon = contamination_icon + '-';
        }
        contamination_status_bar.setText('Contamination |' + contamination_icon + '|');

        if (planet_contamination >= 100) {
            if (gameOver == false) {
                endGame('defeat');
            }

        }
    }

    function virusHitPlayer(Virus) {
        endGame('defeat');
    }


    function endGame(result) {
        game.input.setDefaultCursor('auto');
        console.log(result);
        console.log('Votre score : ' + score);
        console.log('kills : ' + nb_kill);
        console.log('nombre de coups de feu tirés : ' + nb_tir_tt);
        var accuracy = 0;
        if (nb_tir_tt > 0) {
            accuracy = Math.round((nb_kill / nb_tir_tt) * 100);
        }
        console.log('Précision : ' + accuracy + '%');
        console.log('Contamination de la planète : ' + planet_contamination + '%');


        multiplier += (accuracy / 10);

        if (result == 'win') {
            multiplier += (((100 - planet_contamination) / 10));
        }

        console.log('score multiplier : ' + multiplier + 'x');

        var Final_Score = Math.round(score * multiplier);
        console.log('\n \n Score Final : ' + Final_Score + ' !');

        player.destroy();
        gameOver = true;

        var endgame_Score = document.getElementById('endgame-score');

        var input_score = document.getElementById('input_score');
        var input_kill = document.getElementById('input_kill');
        var input_accuracy = document.getElementById('input_accuracy');
        var input_contamination = document.getElementById('input_contamination');

        input_score.value = Final_Score;
        input_kill.value=nb_kill;
        input_accuracy.value=accuracy;
        input_contamination.value=planet_contamination;

        endgame_Score.classList.remove('d-none');
    }






}