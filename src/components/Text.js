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
    <div style={{ height: `600vh`, color: 'white' }}>Welcome</div>
    <div style={{ height: `80vh`, color: 'white' }}>Project 1</div>
    <div style={{ height: `80vh`, color: 'white' }}>Project 2</div>
    <div style={{ height: `80vh`, color: 'white' }}>Project 3</div>
    <div style={{ height: `80vh`, color: 'white' }}>Project 4</div>
    <div style={{ height: `80vh`, color: 'white' }}>Project 5</div>
    <div style={{ height: `80vh`, color: 'white' }}>Project 6</div>
    <div style={{ height: `160vh`, color: 'white' }}>Project 7</div>
    <div style={{ height: `400vh`, color: 'white' }}>About me</div>
  </div>
));

export default Text;
