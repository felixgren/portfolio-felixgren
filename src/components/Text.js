import React, { forwardRef } from 'react';

const Text = forwardRef(({ scroll }, scrollRef) => (
  <div
    ref={scrollRef}
    className="scroll"
    onScroll={(e) => {
      scroll.current =
        e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
    }}
  >
    <div style={{ height: `600vh` }} className="text">
      {/* <h2>welcome</h2> */}
    </div>

    <div style={{ height: `80vh` }} className="text">
      <h2 id="nintendo-event">Nintendo Event</h2>
      <p>
        A project about creating an asthetically pleasing and enticing event
        page, I chose the new Super Mario 3D World + Bowsers Fury game. Built
        and designed from scratch in Figma by me.
      </p>
      <p className="hide-mobile">
        Now this is a game I can get behind, it’s fresh, varied, and to the
        point. Fury is truly respectable sucessor to Odyssey, and 3D World is
        just way more fun than I thought it would be. I really enjoyed creating
        this website.
      </p>

      <div>
        <a
          href="https://marioevent.live"
          rel="noreferrer"
          target="_blank"
          className="project-buttons"
        >
          Go to Nintendo Event
        </a>
        <a
          href="https://github.com/felixgren/nintendo-event"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `80vh` }} className="text">
      <h2 id="hacker-news">Hacker News</h2>
      <p>
        A hacker news clone project, with the main focus being on the backend.
        It has features such as login, likes, creation, deletion & editing of
        posts and comments, with the former being all completely live, built in
        Vue. The website also features user profiles with expression through the
        BIO, the total accumulated likes, post history and of course avatars.
      </p>

      <div>
        <a
          href="https://github.com/felixgren/hacker-news"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `80vh` }} className="text">
      <h2 id="three-arena">Three Arena</h2>
      <p>
        A game project utilizing three.js as the 3D game engine. It is a first
        person shooter which features a sweet arena in which to kill your
        friends in. Multiplayer mode stresstested for the first time by my
        entire class at once. A collaboration between me and{' '}
        <a href="https://pnpjss.com/" target="_blank" rel="noreferrer">
          Lucas
        </a>
        .
      </p>

      <div>
        <a
          href="https://shootyourfriends.com"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Go to Three Arena
        </a>
        <a
          href="https://github.com/felixgren/three-arena"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `80vh` }} className="text">
      <h2 id="electric">Electric</h2>
      <p>
        A landing page for a futuristic vehicle, a collaboration project between
        web developers and computer graphics designers at YRGO. Designed in
        Figma, by us the developers.
      </p>

      <div>
        <a
          href="https://flightoftomorrow.com"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Go to Electric
        </a>
        <a
          href="https://github.com/felixgren/electric"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `80vh` }} className="text">
      <h2 id="useless-web">Useless Web</h2>
      <p>
        A very fun project where the prime directive was for it to be as useless
        as possible, it features cubes dancing around. It was a nice
        introduction to three.js.
      </p>

      <div>
        <a
          href="https://uselesscube.com"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Go to Useless Web
        </a>
        <a
          href="https://github.com/felixgren/useless-web"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `80vh` }} className="text">
      <h2 id="nook-inc">Nook Inc</h2>
      <p>
        My first web project which I created before starting my studies.
        Honestly though, this game gets boring way too quick. I really wanted to
        enjoy it but lets be honest; why would you enjoy watching the same
        animation play over and over, cutting some stupid tree, catching some
        dumb moth. Basically a bad version of minecraft.
      </p>

      <div>
        <a
          href="https://felixgren.github.io/nook-inc"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Go to Nook Inc
        </a>
        <a
          href="https://github.com/felixgren/nook-inc"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `160vh` }} className="text">
      <h2 id="task-repo">Task Repo</h2>
      <p>
        This is another Laravel project, this one was a collaborative effort
      </p>

      <div>
        <a
          href="https://github.com/felixgren/assignment-repo"
          target="_blank"
          rel="noreferrer"
          className="project-buttons"
        >
          Source Code
        </a>
      </div>
    </div>

    <div style={{ height: `200vh` }} className="contact-wrapper">
      <div className="knowledge-text">
        <div>
          <p>React</p>
          <p>Vue</p>
          <p>ThreeJS</p>
          <p>Three Fiber</p>
          <p>TypeScript</p>
        </div>

        <div>
          <p>Laravel</p>
          <p>PHP</p>
          <p>Docker</p>
          <p>Node</p>
          <p>C#</p>
        </div>

        <div>
          <p>HTML & CSS</p>
          <p>JavaScript</p>
          <p>Wordpress</p>
          <p>Figma</p>
          <p>SQL</p>
        </div>
      </div>
    </div>

    <div style={{ height: `200vh` }} className="contact-wrapper">
      <div className="contact-text">
        <h2>Reach out, say hi.</h2>
        <a href="mailto:hello@felixgren.com">hello@felixgren.com</a>
      </div>
    </div>

    <span className="github">
      <a href="https://github.com/felixgren" target="_blank" rel="noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="github-logo"
          viewBox="0 0 24 24"
          fill="#fff"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
        </svg>
      </a>
    </span>
  </div>
));

export default Text;
