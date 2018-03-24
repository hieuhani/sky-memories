import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import MouseTracker from '../components/MouseTracker'
import universe from '../assets/universe.jpg'
import Point from '../components/Point'

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

const pointPositions = {};
_.times(60).forEach((time) => {
  pointPositions[time] = {
    baseX: _.random(0, 3840),
    baseY: _.random(0, 2160),
    clockwise: Boolean(_.random(0, 1)),
    size: _.random(12, 18),
  };
});

export default class Home extends Component {
  render() {
    return (
      <MouseTracker render={(mouse) => (
        <Fragment>
          <Wrapper mouseX={mouse.x} mouseY={mouse.y} onMouseMove={this.handleMouseMove}>
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
        </Fragment>
      )} />
    )
  }
}
