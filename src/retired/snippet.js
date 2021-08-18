const scrollRef2 = useRef();
const scroll2 = useRef(0);
const doScroll2 = (e) => {
  const offsetTop = scrollRef2.current.offsetTop;
  const refScrollY = window.scrollY - offsetTop;
  const refHeight = scrollRef2.current.scrollHeight;
  const viewHeight = window.innerHeight;

  scroll2.current = refScrollY / (refHeight - viewHeight);
  // console.log(scroll2.current);
  // const viewScrollDecimal = e.target.scrollTop / (refHeight - viewHeight);
};

rotationMatrix.lookAt(state.camera.position, [0, 0, 0], [0, 0, 1]);
targetQuaternion.setFromRotationMatrix(rotationMatrix);
state.camera.quaternion.rotateTowards(targetQuaternion, 0.01);
state.camera.quaternion.slerp(targetQuaternion, 0.01);
