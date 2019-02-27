import React, { Component } from 'react'; 
import styled from 'styled-components';
import Sprite from './Sprite';
import html2canvas from 'html2canvas';

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

    componentDidMount() {
        let gameimage;
        html2canvas(document.body, );
      }



    
    render() { 
        return (
            <World >
                <Sprite
                    {...this.state}
                />
            </World>
        );
      }
}