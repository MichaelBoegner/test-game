import React, { Component } from 'react';
import Phaser from 'phaser';
import Portfolio from '../assets/Portfolio.JPG';
import Ground from '../assets/ground.JPG';
import DudeSpriter from '../assets/dude.PNG';
import ParagraphGround from '../assets/paragraphGround.JPG';
import Theme from '../assets/gametheme.MP3';
import Boing from '../assets/boing.MP3';
import Ship from '../assets/ship.PNG';


export default class PhaserMain extends Component {

    componentDidMount() {
        let config = {
            type: Phaser.AUTO,
            width: "100vw",
            height: "100vh",
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
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
            this.load.audio('theme', Theme);

        }
        
        
        function create ()
        {
            

                
            let image = this.add.image(0, 0, 'portfolio').setOrigin(0, 0)
            // =============== PLATFORMS ===============//

            let platforms = this.physics.add.staticGroup();

            platforms.create(450, 397, 'ground').setScale(7.47, 1).refreshBody();
            platforms.create(960, 265, 'paragraphGround');

            // =============== PLAYER AND SHIP SPRITES ===============//
            this.ship = this.physics.add.sprite(1700, 50, 'ship').setScale(.15);
            this.ship.setCollideWorldBounds(true)

            this.player = this.physics.add.sprite(1800, 175, 'dude').setScale(.5)

            this.player.setBounce(0.15);
            this.player.setCollideWorldBounds(true) 
            


            
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



            this.physics.add.collider(this.player, platforms);
            this.physics.add.collider(this.ship, platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
        
        
        function update ()
        {   
           
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-140);
                this.player.anims.play('left', true);
            
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(140);
                this.player.anims.play('right', true);

            } else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn');
            }
    
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-325);
            }

            if(this.cursors.space.isDown && (this.ship.x - this.player.x) > -50 && (this.ship.x - this.player.x) < 50 ) {
                this.player.isCropped = true;
            }

            if(this.player.isCropped === true) {
                if (this.cursors.left.isDown) {
                    this.ship.setVelocityX(-140);
                    this.ship.setVelocityY(0);
                    // this.ship.flipX = true;

                    this.ship.setRotation(-1.5708);

                    this.player.setVelocityX(-140);
                    this.player.setVelocityY(0);
                
                } else if (this.cursors.right.isDown) {
                    this.ship.setVelocityX(140);
                    this.ship.setVelocityY(0);
                    this.ship.setRotation(1.5708);

                    this.player.setVelocityX(140);
                    this.player.setVelocityY(0);
                }
                
                if (this.cursors.up.isDown) {
                    this.ship.setVelocityY(-140);
                    this.player.setVelocityY(-140);
                    

                } else if (this.cursors.down.isDown) {
                    this.ship.setVelocityY(140);
                    this.ship.setRotation(3.14159);

                    this.player.setVelocityY(140);
                } 
                
                if(!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
                    this.ship.setVelocityX(0);
                    this.ship.setVelocityY(0);
                    this.ship.setRotation(0)


                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
                 }
            }

            if(this.cursors.shift.isDown && this.player.isCropped === true) {
                this.player.isCropped = false;
            }
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}