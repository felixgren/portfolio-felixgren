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
  overflow: hidden;
`;

const DevNav = styled(animated.div)`
  position: absolute;
  left: 5px;
  top: 12px;
  font-size: 18px;
  pointer-events: auto;
  margin-left: 36px;
  transition: 0.2s;

  & > a:hover {
    color: white;
  }

  @media only screen and (max-width: 600px) {
    bottom: 0;
    top: unset;
    left: 0;
    margin-left: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;
    width: 100%;
    z-index: 20;
    height: 64px;
    background: linear-gradient(transparent, #00000070);
    -webkit-mask-image: linear-gradient(to right, black 70%, transparent);
    mask-image: linear-gradient(to right, black 70%, transparent);

    &::-webkit-scrollbar {
      display: none;
    }

    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    & > a {
      margin-left: 12px;
      margin-right: 12px;
      min-width: fit-content;
    }

    & > a:last-of-type {
      margin-right: 40px;
    }
  }
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
`;

const TextStyle = styled.div`
  font-size: 2.8em;
  font-weight: 800;
  letter-spacing: -2px;
  line-height: 1em;
  margin: 40px 50px;
  position: relative;
  z-index: 1;

  @media only screen and (max-width: 600px) {
    margin: 40px 0;
    font-size: 1.7em;
    letter-spacing: -1px;
    line-height: 1.1em;
    margin-top: 10px;
  }
`;

const headlineContent = {
  '/': ['Felix Gren'],
  '/nintendo-event': ['React'],
  '/hacker-news': ['Laravel, Vue', 'Fractal, AWS, Tailwind'],
  '/three-arena': ['Three.js, Socket.io', 'Express, Octrees, Shaders'],
  '/electric': ['Javascript', 'HTML & CSS'],
  '/useless-web': ['Three.js'],
  '/nook-inc': ['JavaScript', 'HTML & CSS'],
  '/fake-news': ['PHP', 'SQL'],
};

function renderSwitch(param) {
  switch (param) {
    case '/':
      return [{ background: 'transparent' }, { text: '#272730' }];
    case '/nintendo-event':
      return [{ background: '#ff0000' }, { text: '#fdc600' }];
    case '/hacker-news':
      return [{ background: '#ff6600' }, { text: 'antiquewhite' }];
    case '/three-arena':
      return [{ background: '#c8cdde' }, { text: 'darkred' }];
    case '/electric':
      return [{ background: 'royalblue' }, { text: 'aquamarine' }];
    case '/useless-web':
      return [{ background: 'blueviolet' }, { text: 'lime' }];
    case '/nook-inc':
      return [{ background: '#80ffff' }, { text: '#ff2655' }];
    case '/fake-news':
      return [{ background: '#2200ab' }, { text: '#9019ff' }];
    default:
      return [{ background: 'transparent' }, { text: 'pink' }];
  }
}

function TempNav(props) {
  return (
    <>
      <DevNav id="dev-nav" {...props}>
        {/* <Link to="/">None</Link> */}
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
        <Link id="fake-news-link" to="/fake-news">
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

export default function TextFocused() {
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
