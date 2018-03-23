import React, { Component } from 'react';
import styled from 'styled-components';
import universe from './night.jpg';

const Background = styled.div`
  background: url('${universe}');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-position: ${({mouseX, mouseY}) => `${mouseX}px ${mouseY}px`};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: -(event.clientX / 2),
      y: -(event.clientY / 2),
    });
  }

  render() {
    return (
      <Background mouseX={this.state.x} mouseY={this.state.y} onMouseMove={this.handleMouseMove} />
    );
  }
}

export default App;
