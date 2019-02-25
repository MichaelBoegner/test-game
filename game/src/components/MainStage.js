import React, { Component } from 'react'; 
import styled from 'styled-components';
import Sprite from './Sprite';
import Phaser from 'phaser';
import Portfolio from '../assets/Portfolio.JPG';


const World=styled.div`
    border: 5px solid grey;
    height: 350px; 
    width: 100%;
`;


export default class MainStage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xLocation: 150,
            yLocation: 290,
            gravity: false,
        }
    }





    moveSprite = (e) => {
        if(e.key === "ArrowRight") {
            this.setState({xLocation: this.state.xLocation += 10})
        } else if(e.key === "ArrowDown") {
            this.setState({yLocation: this.state.yLocation += 10})
        } else if(e.key === "ArrowLeft") {
            this.setState({xLocation: this.state.xLocation -= 10})
        } else if(e.key === "ArrowUp") {
            this.setState({yLocation: this.state.yLocation -= 100})
        }         
    };

    
    render() { 
        console.log("MainStage State", this.state)
        return (
            <World 
                tabIndex="0" 
                onKeyDown={this.moveSprite}>
                <Sprite
                    {...this.state}
                />
            </World>
        );
      }
}