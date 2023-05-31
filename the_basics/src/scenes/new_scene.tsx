import { Circle, Layout, Rect, View2D } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { all, any, waitFor } from '@motion-canvas/core/lib/flow';
import { easeInOutBounce, map, tween } from '@motion-canvas/core/lib/tweening';
import { Color, Vector2 } from '@motion-canvas/core/lib/types';
import { createRef } from '@motion-canvas/core/lib/utils';

const size_unit = 100;

function* scene_hierarchy_1(view: View2D) {
    //creating elements using variables
    let circle = new Circle({size: size_unit * 2, fill:"red"});

    view.add([circle]);

    view.add([new Circle({size: size_unit * 1, fill:"green"})]);

    yield* waitFor(2)
}
function* scene_hierarchy_2(view: View2D) {
    //creating elements using jsx
    view.add(
        <>
            <Circle size={size_unit * 2} fill={"red"}>
            </Circle>
            <Circle size={size_unit * 1} fill={"green"}>
            </Circle>
        </>
    );
    yield* waitFor(2)
}
function* scene_hierarchy_3(view: View2D) {
    //creating elements using variables
    let circle = new Circle({size: size_unit * 2, fill:"red"});

    view.add([circle]);

    view.add([new Circle({size: size_unit * 1, fill:"green"})]);

    // removing first circle
    yield* waitFor(1);

    circle.remove();

    yield* waitFor(1);
}

function* positioning(view: View2D) {
    const circle_1 = createRef<Circle>();
    const circle_2 = createRef<Circle>();

    view.add(
        <>
            <Circle size={size_unit * 0.1} fill={"white"}/>
            <Circle ref={circle_1} size={size_unit * 2} fill={"red"}>
                <Circle ref={circle_2} size={size_unit * 1} fill={"green"}>
                </Circle>
            </Circle>
        </>
    );

    console.info(`initial pos:${circle_1().position.x()}`);

    circle_1().position(new Vector2(size_unit * 2, size_unit * 2));

    console.info(`final pos:${circle_1().position.x()}`);

    yield* waitFor(1);
}

function* rotation(view: View2D) {
    const rect_1 = createRef<Rect>();
    const rect_2 = createRef<Rect>();

    view.add(
        <>
            <Circle size={size_unit * 0.1} fill={"white"}/>
            <Rect ref={rect_1} width={size_unit * 3} height={size_unit * 1} fill={"red"}>
                <Rect ref={rect_2} scale={0.5} width={size_unit * 3} height={size_unit * 1} fill={"green"}>
                </Rect>
            </Rect>
        </>
    );

    rect_1().rotation(30);
    rect_2().rotation(10);

    yield* waitFor(1);
}

function* references(view: View2D) {
    const rectA = createRef<Rect>();
    const rectB = createRef<Rect>();

    view.add(
        <Rect layout>
            <Circle size={size_unit * 2} fill={"red"}>
                <Rect ref={rectA} width={size_unit * 1} height={size_unit * 1} fill={"white"}/>
            </Circle>
            <Rect ref={rectB} width={size_unit * 1} height={size_unit * 1} fill={"green"}/>
        </Rect>
    );

    yield* waitFor(1);
}


function* animation(view: View2D) {
    const rectA = createRef<Rect>();
    const rectB = createRef<Rect>();

    view.add(
        <Rect layout>
            <Circle size={size_unit * 2} fill={"red"}>
                <Rect ref={rectA} width={size_unit * 1} height={size_unit * 1} fill={"white"}/>
            </Circle>
            <Rect ref={rectB} width={size_unit * 1} height={size_unit * 1} fill={"green"}/>
        </Rect>
    );

    yield* waitFor(1);

    yield* rectB().scale(1,0).to(2,1);
    yield* rectB().scale(rectB().scale(), 0).to(1,1);

    yield* waitFor(1);
    
    yield* all(
        rectB().scale(rectB().scale(), 0).to(3,2),
        rectA().rotation(rectA().rotation(), 0).to(45,1),
    )

    yield* waitFor(1);
    
    yield* any(
        rectB().scale(rectB().scale(), 0).to(0.5,1),
        rectA().rotation(rectA().rotation(), 0).to(0,3),
    )

    let margin_x = rectB().margin.left();

    yield* rectB().margin.left(margin_x, 0).to(margin_x + 2 * size_unit, 0.3);

    yield* waitFor(1);

    margin_x = rectB().margin.left();

    yield* tween(1, value => rectB().margin.left(map(margin_x, 0, value)));

    yield* waitFor(1);

    margin_x = rectB().margin.left();

    yield* tween(1, value => rectB().margin.left(easeInOutBounce(0, margin_x + 2 * size_unit, value)));

    yield* waitFor(1);

    yield* tween(1, value => rectB().fill(Color.lerp("green", "blue", value)));

    yield* waitFor(1);
}

export default makeScene2D(animation);