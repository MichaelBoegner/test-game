import React, { Component } from 'react'; 
import styled from 'styled-components';
import Sprite from './Sprite';


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
        }
    }

    moveSprite = (e) => {
        console.log("e",e.key)
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
    
    render() { console.log("MainStage State", this.state)
        return (
            <World tabIndex="0" onKeyDown={this.moveSprite}>
                <Sprite
                    {...this.state}
                />
            </World>
        );
      }
}