import { Circle, Layout, Rect, View2D } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';

function* scene_hierarchy_1(view: View2D) {
    //creating elements using variables
    let circle = new Circle({width: 1, fill:"red"});

    view.add([circle]);

    view.add([new Circle({width: 1, fill:"green"})]);
}
function* scene_hierarchy_2(view: View2D) {
    //creating elements using jsx
    view.add(
        <>
            <Circle width={2} fill={"red"}>
            </Circle>
            <Circle width={1} fill={"green"}>
            </Circle>
        </>
    );
}
function* scene_hierarchy_3(view: View2D) {
    //creating elements using variables
    let circle = new Circle({width: 1, fill:"red"});

    view.add([circle]);

    view.add([new Circle({width: 1, fill:"green"})]);

    // removing first circle
    circle.remove();
}

function* positioning(view: View2D) {

}

function* rotation(view: View2D) {

}

function* references(view: View2D) {

}


function* simple_animation(view: View2D) {

}

export default makeScene2D(scene_hierarchy_1);