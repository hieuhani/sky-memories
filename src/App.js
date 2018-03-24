import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import universe from './universe.jpg';

const Wrapper = styled.div.attrs({
  style: ({mouseX, mouseY}) => ({
    left: `${mouseX}px`,
    top: `${mouseY}px`,
  }),
})`
position: absolute;
right: 0;
bottom: 0;
overflow: hidden;
`
const Background = styled.div`
  background: url('${universe}');
  background-repeat: no-repeat;
  width: 3840px;
  height: 2160px;
`;

const Clockwise = keyframes`
  from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
`

const Anticlockwise = keyframes`
  from { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
  to   { transform: rotate(0deg) translateX(10px) rotate(0deg); }
`

const Point = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid #CCFF00;
  position: absolute;
  top: ${({ baseY }) => `${baseY}px`};
  left: ${({ baseX }) => `${baseX}px`};
  animation: ${({ clockwise }) => clockwise ? Clockwise: Anticlockwise } 5s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const pointPositions = {};
_.times(60).forEach((time) => {
  pointPositions[time] = {
    baseX: _.random(0, 3840),
    baseY: _.random(0, 2160),
    clockwise: Boolean(_.random(0, 1)),
    size: _.random(12, 18),
  };
});

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: - (event.clientX / 2),
      y: - (event.clientY / 2),
    });
  }

  render() {
    return (
      <Wrapper mouseX={this.state.x} mouseY={this.state.y} onMouseMove={this.handleMouseMove}>
        <Background>
          {Object.keys(pointPositions).map((key) => (
            <Point
              key={key}
              baseX={pointPositions[key].baseX}
              baseY={pointPositions[key].baseY}
              clockwise={pointPositions[key].clockwise}
              size={pointPositions[key].size}
            />
          ))}
        </Background>
      </Wrapper>
    );
  }
}

export default App;
