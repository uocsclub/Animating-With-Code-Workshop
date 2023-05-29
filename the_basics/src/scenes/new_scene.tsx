import { Circle, Layout, Rect, View2D } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { waitFor } from '@motion-canvas/core/lib/flow';

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

}

function* rotation(view: View2D) {

}

function* references(view: View2D) {

}


function* simple_animation(view: View2D) {

}

export default makeScene2D(scene_hierarchy_3);