# Scenes

Scenes are a iterator that define a series of instructions on how to animate and render a given frame. TLDR - this is a script where you do all your animations.

Scenes can be created using the following instructions:
1. Create a TypeScript file in `src\scenes\`

Scenes must be created with the following template.

new_scene.ts
```TypeScript
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';

export default makeScene2D(function* (view) {
  // animation
});
```

**Note**:
makeScene2D() takes a function generator and turns it into a scene which we then import in our project file. The function generator describes the flow of the animation, while the provided view argument is used to add elements to the scene. [source](https://motioncanvas.io/docs/quickstart/)


1. Add the new scene to the project

A project is the main typescript file that defines the scenes that are visible in the editor.

Scenes can be added by first importing the new file & adding to the scenes array.

```TypeScript
import {makeProject} from '@motion-canvas/core';

// importing scene
import new_scene from './scenes/new_scene?scene';

export default makeProject({
    //adding new scene to array
    scenes: [new_scene],
});
```

# Creating Elements


# Positioning
# Rotation

# References

# Simple Animations

# Understanding the Editor