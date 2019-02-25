import React, { Component } from 'react';
import Phaser from 'phaser';
import Portfolio from '../assets/Portfolio.JPG';

export default class PhaserMain extends Component {

    componentDidMount() {
        let config = {
            type: Phaser.AUTO,
            width: 2000,
            height: 1000,
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
        }
        
        function create ()
        {
            this.add.image(0, 0, 'portfolio').setOrigin(0, 0);
        }
        
        function update ()
        {
        }
        
    }

    render() {
        return (
            <div ></div>
        )
    }
}