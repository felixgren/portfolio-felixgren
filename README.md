<img src="https://c.tenor.com/XX0tRuK1Mv8AAAAC/mr-robot-looking-around.gif" width="100%">

# Portfolio FelixGren

This is my portfolio. It was created using three-fiber with the help of Gestaltor and Blender.

Have a look: https://www.felixgren.com

## Installation

```
git clone https://github.com/felixgren/portfolio-felixgren.git
cd portfolio-felixgren
npm install
npm start
```

## todo

### General

- [ ] Compress audio, ensure preload is not an issue.
- [ ] Add state manager, sort out messy camera logic.

<details>
<summary> Completed </summary>

- [x] Verify mobile support
- [x] Move camera logic into its own component </details>

### Projects section

- [ ] Resolve stutter/jank on camera entering phase 2.
- [ ] Resolve camera breaking from scrollwheel jumping.

<details>
<summary> Completed </summary>

- [x] Design layout
- [x] Add texts
- [x] Figure out transition
- [x] Hook up transition to model click
- [x] Add colors </details>

### Models

- [ ] Apply Draco & KTX2 compression to all large models.

<details>
<summary> Completed </summary>

- [x] Find all models
- [x] Optimize models in Gestaltor
- [x] Break all models into individual files
- [x] Add textures to neccecary models in Blender
- [x] Import models into Three
- [x] Add Draco support
- [x] Add KTX2 support
- [x] Figure out workflow for KTX2/Draco compression across models </details>

### Hero section

- [ ] Make Phase 2 start sooner (less scrolling)

<details>
<summary> Completed </summary>

- [x] Figure out text design
- [x] Make 3D HTML responsive </details>

### About Me section

- [ ] Fix skills section bugged fade out
- [ ] Record video with Kinect with colors for depth map
- [ ] Implement Kinect video using shaders to represent depth w/ particles
- [ ] Add about me text ?

<details>
<summary> Completed </summary>

- [x] Create knowledge and skills section </details>
