import React, { Component } from 'react';
import Phaser from 'phaser';
import Portfolio from '../assets/Portfolio.JPG';
import Ground from '../assets/ground.JPG';
import Dude from '../assets/dude.JPG';

export default class PhaserMain extends Component {

    componentDidMount() {
        let config = {
            type: Phaser.AUTO,
            width: 2000,
            height: 1000,
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
            this.load.spritesheet('dude', Dude,  { frameWidth: 32, frameHeight: 48 });
        }
        
        
        function create ()
        {
            this.add.image(0, 0, 'portfolio').setOrigin(0, 0);

            let platforms = this.physics.add.staticGroup();

            platforms.create(450, 1000, 'ground').setScale(2).refreshBody();
        
            platforms.create(1600, 400, 'ground');
            platforms.create(0, 750, 'ground');
            platforms.create(950, 220, 'ground');

            this.player = this.physics.add.sprite(100, 450, 'dude');

            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
            
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
            
            this.anims.create({
                key: 'turn',
                frames: [ { key: 'dude', frame: 4 } ],
                frameRate: 20
            });
            
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });

            this.physics.add.collider(this.player, platforms)

        this.cursors = this.input.keyboard.createCursorKeys();

    }
        
        
        function update ()
        {   
           
            if (this.cursors.left.isDown) {

                this.player.setVelocityX(-160);
                
                this.player.anims.play('left', true);
            
            } else if (this.cursors.right.isDown) {

                this.player.setVelocityX(160);
    
                this.player.anims.play('right', true);
            } else {
                this.player.setVelocityX(0);
    
                this.player.anims.play('turn');
            }
    
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                
                this.player.setVelocityY(-330);
            }            
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}