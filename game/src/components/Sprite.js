import React, { Component } from 'react';
import styled from 'styled-components';

const SpriteStyled=styled.div`
    border: 5px solid grey;
    width: 50px;
    height: 50px;
    background-color: red;
    position: relative;
    left: ${props=> `${props.props.xLocation}px`};
    top: ${props=> `${props.props.yLocation}px`}; 

`;

export default class Sprite extends Component {
      render() {
          return (
              <SpriteStyled
                props={this.props}
                gravity={this.props.gravity}
              ></SpriteStyled>
          )
      }
}