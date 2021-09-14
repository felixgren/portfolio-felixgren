import React from 'react';
import styled from 'styled-components';
import { useTransition, useSpring } from '@react-spring/core';
import { useLocation, Link } from 'wouter';
import { animated } from '@react-spring/web';
import 'styled-components/macro';

const Container = styled(animated.div)`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const DevNav = styled(animated.div)`
  position: absolute;
  left: 5px;
  top: 5px;
  pointer-events: auto;
`;

const HeadlineWrapper = styled(animated.div)`
  position: absolute;
  margin: 10px;
  will-change: opacity;
`;

const Headline = styled(animated.div)`
  position: relative;
  width: 100%;
  will-change: transform;
  overflow: hidden;
`;

const TextStyle = styled.div`
  font-size: 3em;
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1em;
  margin: 24px 14px;
`;

const headlineContent = {
  '/': ['Felix Gren'],
  '/nintendo-event': ['Nintendo Event', 'its a me, mario!'],
  '/hacker-news': ['Hacker News', 'I bloody love it', 'hackin the news!'],
  '/three-arena': ['Three Arena', 'i looove', 'three arena'],
  '/electric': ['Electric', 'i looove', 'electric'],
  '/useless-web': ['Useless Web', 'i looove', 'useless things'],
  '/nook-inc': ['Nook Inc', 'i looove', 'nooks'],
  '/task-repo': ['Task Repo', 'i looove', 'tasks'],
};

function renderSwitch(param) {
  switch (param) {
    case '/':
      return [{ background: 'transparent' }, { text: '#272730' }];
    case '/nintendo-event':
      return [{ background: '#FF0000' }, { text: '#fdbf00' }];
    case '/hacker-news':
      return [{ background: '#FF6600' }, { text: 'black' }];
    case '/three-arena':
      return [{ background: 'grey' }, { text: 'white' }];
    case '/electric':
      return [{ background: 'tomato' }, { text: 'black' }];
    case '/useless-web':
      return [{ background: 'tomato' }, { text: 'black' }];
    case '/nook-inc':
      return [{ background: 'tomato' }, { text: 'black' }];
    case '/task-repo':
      return [{ background: 'tomato' }, { text: 'black' }];
    default:
      return [{ background: 'orange' }, { text: 'pink' }];
  }
}

function TempNav(props) {
  return (
    <>
      <DevNav {...props}>
        <Link to="/">None</Link>
        <Link id="nintendo-event-link" to="/nintendo-event">
          Nintendo Event
        </Link>
        <Link id="hacker-news-link" to="/hacker-news">
          Hacker News
        </Link>
        <Link id="three-arena-link" to="/three-arena">
          Three Arena
        </Link>
        <Link id="electric-link" to="/electric">
          Electric
        </Link>
        <Link id="useless-web-link" to="/useless-web">
          Useless Web
        </Link>
        <Link id="nook-inc-link" to="/nook-inc">
          Nook Inc
        </Link>
        <Link id="task-repo-link" to="/task-repo">
          Task Repo
        </Link>
      </DevNav>
    </>
  );
}

function Text({ children, opacity }) {
  return (
    <HeadlineWrapper style={{ opacity }}>
      {React.Children.toArray(children).map((text, index) => (
        <Headline
          key={index}
          style={{
            transform: opacity.to(
              (transform) =>
                `translate3d(${
                  index + (1 - transform) * ((1 + index * 2) * 50)
                }px,0,0)`
            ),
          }}
        >
          <div>{text}</div>
        </Headline>
      ))}
    </HeadlineWrapper>
  );
}

export default function DetailedText() {
  const [location] = useLocation();
  const props = useSpring({
    background: renderSwitch(location)[0].background,
    color: renderSwitch(location)[1].text,
  });
  const transition = useTransition(location, {
    from: {
      position: [0, 0, -20],
      rotation: [0, Math.PI, 0],
      scale: [0, 0, 0],
      opacity: 0,
    },
    enter: {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      opacity: 1,
    },
    leave: {
      position: [0, 0, -10],
      rotation: [0, -Math.PI, 0],
      scale: [0, 0, 0],
      opacity: 0,
    },
    config: () => (n) => n === 'opacity' && { friction: 20, tension: 200 },
  });

  return (
    <>
      <Container style={{ ...props }}>
        <TextStyle>
          {transition((style, location) => (
            <Text
              open={true}
              transform={style.transform}
              opacity={style.opacity}
              background={props.background}
              children={headlineContent[location]}
            />
          ))}
        </TextStyle>
        <TempNav style={{ color: props.color }} />
      </Container>
    </>
  );
}
