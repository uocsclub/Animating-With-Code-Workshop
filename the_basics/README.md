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

## Add

Scenes start out empty. Therefore elements (Rect, Circle, Line, Img, etc.) need to be added to a scene.

This is done using the `add` method. Where, `parent.add(children[])` adds a list of elements to the scene.

This method can be used in the following ways:
1. Using constructor

First create the element using the constructor. Followed by calling the `add` method on view.

```TypeScript
let circle = new Circle({width: 2, fill:"red"}); // this creates a reference of the initialized element - so that it can be modified later
view.add([circle]);

view.add([new Circle({width: 1, fill:"green"})]);
```

2. Using JSX

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it. (source)[https://react.dev/learn/writing-markup-with-jsx]

The following two code blocks shows a similar implementation to what can be seen in `Using constructor`.

```TypeScript
view.add(
  <>
    <Circle width={2} fill={"red"}>
    </Circle>
    <Circle width={1} fill={"green"}>
    </Circle>
  </>
);
```

```TypeScript
view.add(
  <Circle width={2} fill={"red"}>
  </Circle>
);
view.add(
  <Circle width={1} fill={"green"}>
  </Circle>
);
```

**Note**: The workshop will use the JSX notation as it is more concise and readable compared to the former.

## Remove

Once an element is added - it can be removed using the `remove` method; in the form `element.remove()`.

```TypeScript
// I lied - turns out I didn't use JSX
let circle = new Circle({width: 2, fill:"red"});
view.add([circle]);

circle.remove()
```

## Parenting

Scenes are defined as a graph - specifically a tree. The `view` is root of the scene hierarchy.

The following is an example of the scene hierarchy as it is modified through code.
```TypeScript
view.add(
  <>
    <Circle />
    <Layout>
      <Rect />
      <Txt>Hi</Txt>
    </Layout>
  </>,
);
```
```
view
├── Circle
└── Layout
    ├── Rect
    └── Txt
```

```TypeScript
Rect.add(<Line/>)
```
```
view
├── Circle
└── Layout
    ├── Rect
    │   └── Line
    └── Txt
```

```TypeScript
Circle.remove()
```
```
view
└── Layout
    ├── Rect
    │   └── Line
    └── Txt
```
## Other Functions

There exists multiple methods that modifies the scene hierarchy - it is recommended to take a look at all of them as they can be quite useful.

These are all the functions:
 - add
 - insert
 - remove
 - reparent
 - moveUp
 - moveDown
 - moveToTop
 - moveToBottom
 - moveTo
 - moveAbove
 - moveBelow
 - removeChildren

You can read more about them (here).[https://motioncanvas.io/docs/hierarchy]

# Positioning
# Rotation

# References

# Simple Animations

# Understanding the Editor