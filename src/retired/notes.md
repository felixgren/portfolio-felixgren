scrolled distance / (total scroll from bottom) - (window size)
scrolled distance / total scroll

    if (scroll.current > 0.2) {
      mixer.setTime(
        (t.current = THREE.MathUtils.lerp(
          t.current,
          actions['CameraAction.005']._clip.duration * (scroll.current),
          0.05
        ))
      );
    } else {
      mixer.setTime((t.current = THREE.MathUtils.lerp(t.current, 0, 0.05)));
    }
