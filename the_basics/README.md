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

You can read more about them (here)[https://motioncanvas.io/docs/hierarchy].

# Transform

Transformations define the scale, rotation and position of an element in a scene.

## Position

Position defines the location of an element in the scene relative to the origin of parent.

The current position of an element can be retrieved using the following methods
 - `const pos: Vector2 = node.position()`
 - `const pos: number = node.position.x()`
 - `const pos: number = node.position.y()`

The position of an element can be modified using the following methods
 - `node.position([1,2])`
 - `node.position(new Vector2(1,2))`
 - `node.position.x(1)`
 - `node.position.y(2)`

## Rotation

Rotation defines the angle in degrees of an element in the scene relative to the rotation of parent.

The current rotation of an element can be retrieved using the following methods
 - `const rot: number = node.rotation()`

The rotation of an element can be modified using the following methods
 - `node.rotation(45)`
 - 
## Scale

Scale defines the scale of an element in the scene relative to the scale of parent.

The current position of an element can be retrieved using the following methods
 - `const pos: Vector2 = node.scale()`
 - `const pos: number = node.scale.x()`
 - `const pos: number = node.scale.y()`

The position of an element can be modified using the following methods
 - `node.scale([1,2])`
 - `node.scale(new Vector2(1,2))`
 - `node.scale.x(1)`
 - `node.scale.y(2)`

## Relative vs. Absolute

Elements can either be transformed in terms of local space or absolute(relative to the scene).

The absolute position, scale & rotation can be retrieved using the same methods as stated before except with an "absolute" prefix as the follow
 - `node.absolutePosition()`
 - `node.absoluteRotation()`
 - `node.absoluteScale()`

You can read more about them (here)[https://motioncanvas.io/docs/positioning].

# References

Elements often need to be stored in-order to be animated. However, storing in the varaible is not a scale-able solution.

The following is an example from the documentation.
Code: 
```TypeScript
const rectA = <Rect />;
const rectB = <Rect />;
const circle = <Circle>{rectA}</Circle>;
view.add(
  <Layout>
    {circle}
    {rectB}
  </Layout>,
);
```
Structure:
```TypeScript
view.add(
  <Layout>
    <Circle>
      <Rect />
    </Circle>
    <Rect />
  </Layout>,
);
```

An alternative is to use references.

```TypeScript
const rectA = createRef<Rect>();
const rectB = createRef<Rect>();

view.add(
  <Layout>
    <Circle>
      <Rect ref={rectA} />
    </Circle>
    <Rect ref={rectB} />
  </Layout>,
);
```

It can be observed that the alternative has a more readable structure, while still having variables that reference elements that can be used for animations later.

You can read more about them (here)[https://motioncanvas.io/docs/references].

# Animations

## From().To()

The simplest animation uses the from-to syntax - in which transformations can be lerped from one point to another under a given time frame.

`node.transform_property(start_val, duration).to(end_val, duration)`

## Animation Flow

 - `all(...tasks: ThreadGenerator[]): ThreadGenerator`

The `all` method ensures that all animations are completed until the end before starting the next animation.

 - `any(...tasks: ThreadGenerator[]): ThreadGenerator`

The `any` method ensures that at least one animations are completed until the end before starting the next animation.

 - `chain(...tasks: ThreadGeneratorCallback[]): ThreadGenerator`

The `chain` method ensures that all animations are completed in sequence one after the other without delay between animations.

 - `delay(time: numbertask: ThreadGeneratorCallback): ThreadGenerator`

The `delay` method starts the animation after a delay.

 - `sequence(delay: number...tasks: ThreadGenerator[]): ThreadGenerator`

The `sequence` method is merger of `chain` & `delay` method.

 - `loop(iterations: number, factory: LoopCallback): ThreadGenerator`

The `loop` method repeats a animation n times.

## Tween

Tween is a function that generates an animation using duration and a callback.

example from the docs
```TypeScript
tween(2, value => {
  circle().position.x(map(-300, 300, value));
});
```

## Timing Functions

Time functions are a useful tool in creating natural and interesting animations.

Timing functions has the following function signature - `func(value: number, from?: number, to?: number)`

```TypeScript
tween(2, value => {
  circle().position.x(easeInOut(-300, 300, value));
});
```

A full list can be seen (here)[https://motioncanvas.io/api/core/tweening/#easeInBack]


## Spring
