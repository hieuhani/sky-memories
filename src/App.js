import React, { Component } from 'react';
import styled from 'styled-components';
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

const Point = styled.div`
  width: 16px;
  height: 16px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid #CCFF00;
  position: absolute;
  top: ${({ baseY }) => `${baseY}px`};
  left: ${({ baseX }) => `${baseX}px`};

`

const pointPositions = {};
_.times(60).forEach((time) => {
  pointPositions[time] = {
    baseX: _.random(0, 3840),
    baseY: _.random(0, 2160),
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
            <Point key={key} baseX={pointPositions[key].baseX} baseY={pointPositions[key].baseY} />
          ))}
        </Background>
      </Wrapper>
    );
  }
}

export default App;
