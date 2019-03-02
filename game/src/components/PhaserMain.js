import React, { Component } from 'react';
import Phaser from 'phaser';
import Portfolio from '../assets/Portfolio.JPG';
import Ground from '../assets/ground.JPG';
import DudeSpriter from '../assets/dude.PNG';
import ParagraphGround from '../assets/paragraphGround.JPG';
import Ship from '../assets/ship.PNG';
import Marquee from '../assets/marquee.PNG';
import MarqueeInstructions from '../assets/marqueeInstructions.PNG';
import ShipTheme from '../assets/AMFM2019-02-22-S1-T07-blow it.MP3'
import DudeTheme from '../assets/pgroove2002-11-20d1t02.MP3';

export default class PhaserMain extends Component {

    componentDidMount() {
        let config = {
            type: Phaser.AUTO,
            width: 1925,
            height: 950,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 },
                    debug: true
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            },
            audio: {
                disableWebAudio: true
            }
        };
        

        let game = new Phaser.Game(config);

        function preload ()
        {
            this.load.image('portfolio', Portfolio);
            this.load.image('ground', Ground);
            this.load.image('paragraphGround', ParagraphGround);
            this.load.image('ship', Ship);
            this.load.spritesheet('dude', DudeSpriter,  { frameWidth: 113, frameHeight: 110, });
            this.load.spritesheet('marquee', Marquee,  { frameWidth: 602, frameHeight: 280, });
            this.load.spritesheet('marqueeInstructions', MarqueeInstructions,  { frameWidth: 662, frameHeight: 360, });
            this.load.audio('shipTheme',  ShipTheme);
            this.load.audio('dudeTheme', DudeTheme);
        }
        
        
        function create ()
        {
            this.add.image(0, 0, 'portfolio').setOrigin(0, 0)
            this.shipTheme = this.sound.add('shipTheme', {volume: 0.15});
            this.dudeTheme = this.sound.add('dudeTheme', {volume: 0.15});
            // =============== PLATFORMS ===============//

            this.platforms = this.physics.add.staticGroup();

            this.platforms.create(450, 397, 'ground').setScale(7.47, 1).refreshBody();
            this.platforms.create(960, 265, 'paragraphGround');

            // =============== SPRITES ===============//
            this.ship = this.physics.add.sprite(100, 180, 'ship').setScale(.15);
            // this.ship.setCollideWorldBounds(true)

            this.player = this.physics.add.sprite(100, 340, 'dude').setScale(.5)

            this.player.setBounce(0.15);
            // this.player.setCollideWorldBounds(true, false)  
            
            this.marquee = this.physics.add.sprite(1500, 175, 'marquee');
            this.marquee.setCollideWorldBounds(true);
            this.marquee.body.setAllowGravity(false);

            this.marqueeInstructions = this.physics.add.sprite(400, 185, 'marqueeInstructions');
            this.marqueeInstructions.setCollideWorldBounds(true);
            this.marqueeInstructions.body.setAllowGravity(false);


            
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 7,
                repeat: -1
            });
            
            this.anims.create({
                key: 'turn',
                frames: [ { key: 'dude', frame: 4 } ],
                frameRate: 7
            });
            
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 7,
                repeat: -1
            });

            this.anims.create({
                key: 'marqueeAnimate',
                frames: this.anims.generateFrameNumbers('marquee', { start: 0, end: 3 }),
                frameRate: 2,
                repeat: -1
            });
            
            this.anims.create({
                key: 'marqueeInstructionsAnimate',
                frames: this.anims.generateFrameNumbers('marqueeInstructions', { start: 0, end: 3 }),
                frameRate: 2,
                repeat: -1
            });


            this.playerCollision = this.physics.add.collider(this.player, this.platforms);
            this.shipCollision = this.physics.add.collider(this.ship, this.platforms);

            this.cursors = this.input.keyboard.createCursorKeys();

            this.cameras.main.setBounds(0, 0);
            this.cameras.main.startFollow(this.player);
    }
        
        
        function update ()
        {   
            this.marquee.anims.play('marqueeAnimate', true);
            this.marqueeInstructions.anims.play('marqueeInstructionsAnimate', true);


  
           if(this.player.isCropped === false) {

            //===============MUSIC=============//

            if (this.dudeTheme.isPaused === true) {
                this.dudeTheme.resume();
                this.shipTheme.pause(); 
           } else if (this.dudeTheme.isPlaying === false) {
                this.dudeTheme.play();  
             }


            //===============CONTROLS=============//
             console.log("SHIP VELOCITY AND ACCEL", this.ship.body.velocity, this.ship.body.acceleration)
             console.log("PLAYER VELOCITY AND ACCEL", this.player.body.velocity, this.player.body.acceleration)

             if(this.ship.body.velocity.x > 10 && this.player.body.velocity.x > 10) {
                this.ship.body.acceleration.x = -1 * this.ship.body.velocity.x;
                this.player.body.acceleration.x = -1 * this.player.body.velocity.x;                
            } else if(this.ship.body.velocity.x < -10 && this.player.body.velocity.x < -10) {
                this.ship.body.acceleration.x = -1 * this.ship.body.velocity.x;
                this.player.body.acceleration.x = -1 * this.player.body.velocity.x;                
            } else {
                this.ship.body.acceleration.x = 0;
                this.player.body.acceleration.x = 0;
                this.ship.body.velocity.x = 0;
                this.player.body.velocity.x = 0;
            }



              if (this.cursors.left.isDown) {
                   this.player.setVelocityX(-140);
                   this.player.anims.play('left', true);
               
               } else if (this.cursors.right.isDown) {
                   this.player.setVelocityX(140);
                   this.player.anims.play('right', true);
    
               } else {
                   this.player.anims.play('turn');
               }
       
               if (this.cursors.up.isDown && this.player.body.touching.down) {
                   this.player.setVelocityY(-400);
               }
    
               if(this.cursors.space.isDown && (this.ship.x - this.player.x) > -50 && (this.ship.x - this.player.x) < 50 ) {
                   this.player.isCropped = true;
                   this.player.setVelocityX(this.ship.body.velocity.x);
                   this.player.setVelocityY(this.ship.body.velocity.y);
               }

           } else if(this.player.isCropped === true) {
                this.playerCollision.overlapOnly = true; 
                this.shipCollision.overlapOnly = true;

                this.ship.body.setAllowGravity(false);
                this.player.body.setAllowGravity(false);

                //===============MUSIC=============//
                if(this.shipTheme.isPaused === true) {
                    this.shipTheme.resume()
                    this.dudeTheme.pause()
                } else if(this.shipTheme.isPlaying === false) {
                    this.shipTheme.play()
                    this.dudeTheme.pause()
                } 

                //===============CONTROLS=============//
                if (this.cursors.left.isDown) {
                    this.ship.body.acceleration.x = -250;
                    this.player.body.acceleration.x = -250;

                    if(this.ship.body.velocity.y > 0 && this.player.body.velocity.y > 0) {
                        this.ship.body.acceleration.y = -150;
                        this.player.body.acceleration.y = -150;                
                    } else if(this.ship.body.velocity.y < 0 && this.player.body.velocity.y < 0) {
                        this.ship.body.acceleration.y = 150;
                        this.player.body.acceleration.y = 150;                
                    }

                    this.ship.setRotation(-1.5708);
                }else if (this.cursors.right.isDown) {
                    this.ship.body.acceleration.x = 250;
                    this.player.body.acceleration.x = 250;
                        
                    if(this.ship.body.velocity.y > 0 && this.player.body.velocity.y > 0) {
                        this.ship.body.acceleration.y = -150;
                        this.player.body.acceleration.y = -150;                
                    } else if(this.ship.body.velocity.y < 0 && this.player.body.velocity.y < 0) {
                        this.ship.body.acceleration.y = 150;
                        this.player.body.acceleration.y = 150;                
                    }

                    this.ship.setRotation(1.5708);
                }
                
                if (this.cursors.up.isDown) {
                    this.ship.body.acceleration.y = -250;
                    this.player.body.acceleration.y = -250;

                    if(this.ship.body.velocity.x > 0 && this.player.body.velocity.x > 0) {
                        this.ship.body.acceleration.x = -150;
                        this.player.body.acceleration.x = -150;                
                    } else if(this.ship.body.velocity.x < 0 && this.player.body.velocity.x < 0) {
                        this.ship.body.acceleration.x = 150;
                        this.player.body.acceleration.x = 150;                
                    }
                }
                
                if (this.cursors.down.isDown) {
                    this.ship.body.acceleration.y = 250;
                    this.player.body.acceleration.y = 250;

                    if(this.ship.body.velocity.x > 0 && this.player.body.velocity.x > 0) {
                        this.ship.body.acceleration.x = -150;
                        this.player.body.acceleration.x = -150;                
                    } else if(this.ship.body.velocity.x < 0 && this.player.body.velocity.x < 0) {
                        this.ship.body.acceleration.x = 150;
                        this.player.body.acceleration.x = 150;                
                    }

                    this.ship.setRotation(3.14159);
                } 
                
                if(!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
                    
                    if(this.ship.body.velocity.x > 0 && this.player.body.velocity.x > 0) {
                        this.ship.body.acceleration.x = -250;
                        this.player.body.acceleration.x = -250;                
                    } else if(this.ship.body.velocity.x < 0 && this.player.body.velocity.x < 0) {
                        this.ship.body.acceleration.x = 250;
                        this.player.body.acceleration.x = 250;                
                    }

                    if(this.ship.body.velocity.y > 0 && this.player.body.velocity.y > 0) {
                        this.ship.body.acceleration.y = -250;
                        this.player.body.acceleration.y = -250;                
                    } else if(this.ship.body.velocity.y < 0 && this.player.body.velocity.y < 0) {
                        this.ship.body.acceleration.y = 250;
                        this.player.body.acceleration.y = 250;                
                    }

                    this.ship.setRotation(0)
                 }

                 if(this.cursors.shift.isDown) {
                    this.player.isCropped = false;
                    this.playerCollision.overlapOnly = false; 
                    this.shipCollision.overlapOnly = false; 
                    this.ship.body.setAllowGravity(true);
                    this.player.body.setAllowGravity(true);
                    
                }

            }
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}