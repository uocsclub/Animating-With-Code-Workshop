# The Basics

## Scenes

Scenes are iterators that define a series of instructions on how to animate and render a given frame. In simple terms, scenes are scripts where you can create and control your animations.

To create a scene, follow these steps:

1. Create a TypeScript file in the `src/scenes/` directory.

Scenes must follow the provided template:

```typescript
import { makeScene2D } from '@motion-canvas/2d/lib/scenes';

export default makeScene2D(function* (view) {
  // Animation instructions
});
```

**Note**:
The `makeScene2D()` function takes a generator function and turns it into a scene. The generator function describes the flow of the animation, while the `view` argument is used to add elements to the scene. For more information, refer to the [source](https://motioncanvas.io/docs/quickstart/).

2. Add the new scene to the project

The project file is the main TypeScript file that defines the scenes visible in the editor.

To add a scene, import the new file and add it to the `scenes` array:

```typescript
import { makeProject } from '@motion-canvas/core';

// Importing the new scene
import newScene from './scenes/new_scene?scene';

export default makeProject({
  // Adding the new scene to the array
  scenes: [newScene],
});
```

# Creating Elements

## Adding Elements

Scenes start out empty, so you need to add elements (such as Rect, Circle, Line, Img, etc.) to the scene.

You can add elements using the `add` method, which takes a list of elements as its argument.

There are two ways to use the `add` method:

1. Using the constructor:

First, create an element using the constructor, and then call the `add` method on the `view` object.

```typescript
let circle = new Circle({ width: 2, fill: "red" }); // Create a reference to the initialized element for later modifications
view.add([circle]);

view.add([new Circle({ width: 1, fill: "green" })]);
```

2. Using JSX:

JSX is a syntax extension for JavaScript that allows you to write HTML-like markup inside a JavaScript file. In the workshop, we will use the JSX notation, as it is more concise and readable compared to the constructor approach.

Here are examples of using JSX to add elements:

```typescript
view.add(
  <>
    <Circle width={2} fill={"red"}></Circle>
    <Circle width={1} fill={"green"}></Circle>
  </>
);
```

```typescript
view.add(<Circle width={2} fill={"red"}></Circle>);
view.add(<Circle width={1} fill={"green"}></Circle>);
```

**Note**: The workshop will use JSX notation.

## Removing Elements

Once an element is added, you can remove it using the `remove` method, which is called on the element itself.

```typescript
let circle = new Circle({ width: 2, fill: "red" });
view.add([circle]);

circle.remove();
```

## Parenting Elements

Scenes are defined as a graph, specifically a tree structure. The `view` object is the root of the scene hierarchy.

Here's an example of the scene hierarchy as it is modified through code:

```typescript
view.add(
  <>
    <Circle></Circle>
    <Layout>
      <Rect></Rect>
      <Txt>Hi</Txt>
    </Layout>
  </>
);
```

```
view
├── Circle
└── Layout
    ├── Rect
    └── Txt
```

```

typescript
Rect.add(<Line></Line>);
```

```
view
├── Circle
└── Layout
    ├── Rect
    │   └── Line
    └── Txt
```

```typescript
Circle.remove();
```

```
view
└── Layout
    ├── Rect
    │   └── Line
    └── Txt
```

## Other Functions

There are several methods available to modify the scene hierarchy. It is recommended to explore all of them, as they can be quite useful.

The available functions are:
- `add`
- `insert`
- `remove`
- `reparent`
- `moveUp`
- `moveDown`
- `moveToTop`
- `moveToBottom`
- `moveTo`
- `moveAbove`
- `moveBelow`
- `removeChildren`

For more information, refer to the [hierarchy documentation](https://motioncanvas.io/docs/hierarchy).

# Transformations

Transformations define the scale, rotation, and position of an element in a scene.

## Position

Position defines the location of an element in the scene relative to its parent's origin.

You can retrieve the current position of an element using the following methods:
- `const pos: Vector2 = node.position()`
- `const pos: number = node.position.x()`
- `const pos: number = node.position.y()`

To modify the position of an element, you can use the following methods:
- `node.position([1,2])`
- `node.position(new Vector2(1,2))`
- `node.position.x(1)`
- `node.position.y(2)`

## Rotation

Rotation defines the angle in degrees of an element in the scene relative to its parent's rotation.

You can retrieve the current rotation of an element using the following method:
- `const rot: number = node.rotation()`

To modify the rotation of an element, use the following method:
- `node.rotation(45)`

## Scale

Scale defines the scale of an element in the scene relative to its parent's scale.

You can retrieve the current scale of an element using the following methods:
- `const scale: Vector2 = node.scale()`
- `const scale: number = node.scale.x()`
- `const scale: number = node.scale.y()`

To modify the scale of an element, you can use the following methods:
- `node.scale([1,2])`
- `node.scale(new Vector2(1,2))`
- `node.scale.x(1)`
- `node.scale.y(2)`

## Relative vs. Absolute

Elements can be transformed in terms of local space (relative to their parent) or absolute space (relative to the scene).

To retrieve the absolute position, scale, and rotation of an element, use the same methods as before, but with an "absolute" prefix:
- `node.absolutePosition()`
- `node.absoluteRotation()`
- `node.absoluteScale()`

For more information, refer to the [positioning documentation](https://motioncanvas.io/docs/positioning).

# References

Elements often need to be stored in variables for later use in animations. However, storing elements directly in variables can become cumbersome and less scalable.

Here's an example from the documentation:

```typescript
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
```typescript
view.add(
  <Layout>
    <Circle>
      <Rect />
    </Circle>
    <Rect />
  </Layout>,
);
```

An alternative approach is

 to use references:

```typescript
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

Using references provides a more readable structure while still allowing variables to reference elements for later use in animations.

For more information, refer to the [references documentation](https://motioncanvas.io/docs/references).

# Animations

## From().To()

The simplest animation uses the `from-to` syntax, in which transformations can be interpolated from one point to another within a given time frame.

```typescript
node.transform_property(start_val, duration).to(end_val, duration);
```

## Animation Flow

- `all(...tasks: ThreadGenerator[]): ThreadGenerator`

The `all` method ensures that all animations are completed before starting the next animation.

- `any(...tasks: ThreadGenerator[]): ThreadGenerator`

The `any` method ensures that at least one animation is completed before starting the next animation.

- `chain(...tasks: ThreadGeneratorCallback[]): ThreadGenerator`

The `chain` method ensures that all animations are completed in sequence, one after the other, without any delay between animations.

- `delay(time: number, task: ThreadGeneratorCallback): ThreadGenerator`

The `delay` method starts the animation after a specified delay.

- `sequence(delay: number, ...tasks: ThreadGenerator[]): ThreadGenerator`

The `sequence` method is a combination of the `chain` and `delay` methods.

- `loop(iterations: number, factory: LoopCallback): ThreadGenerator`

The `loop` method repeats an animation a specified number of times.

## Tween

A tween is a function that generates an animation using a duration and a callback.

Example from the documentation:

```typescript
tween(2, value => {
  circle().position.x(map(-300, 300, value));
});
```

## Timing Functions

Timing functions are useful for creating natural and interesting animations.

Timing functions have the following function signature: `func(value: number, from?: number, to?: number)`

Some prominent timing functions include:
- `easeIn`
- `easeInOut`
- `easeOut`

Here's an example of using a timing function:

```typescript
tween(2, value => {
  circle().position.x(easeInOut(-300, 300, value));
});
```

For a full list of available timing functions, refer to the [motioncanvas documentation](https://motioncanvas.io/api/core/tweening/#easeInBack).