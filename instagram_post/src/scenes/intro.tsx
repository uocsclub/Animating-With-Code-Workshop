import { Img, Layout, Rect, View2D } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { Reference, createRef } from '@motion-canvas/core/lib/utils';
import { SimpleSignal, createSignal } from '@motion-canvas/core/lib/signals';

import star from '../imgs/Union.png';
import streak from '../imgs/Group 1.png';
import { SmoothSpring, easeInBack, easeOutCubic, spring, tween } from '@motion-canvas/core/lib/tweening';

export default makeScene2D(function* (view) {
    const start = new Vector2(-1080, -1080);
    const end = new Vector2(1080, 1080).scale(2);

    view.fill("#242424");
    view.size(new Vector2(1080, 1080));

    let logo = new Logo(view, 1080, 45, 1, 1);
    logo.ref().position(new Vector2(-1080, -1080));

    yield* waitFor(0.25);

    yield* all(
        spring(
            SmoothSpring,
            start.x,
            Vector2.zero.x,
            0.75,
            value => {logo.ref().position.x(value)}
        ),
        spring(
            SmoothSpring,
            start.y,
            Vector2.zero.y,
            0.75,
            value => {logo.ref().position.y(value)}
        ),
        spring(
            SmoothSpring,
            2,
            1,
            value => {logo.streak.scale_x(value)}
        ),
        spring(
            SmoothSpring,
            0.75,
            1,
            value => {logo.streak.scale_y(value)}
        ),
    )

    yield* waitFor(1);

    yield* all(
        spring(
            SmoothSpring,
            Vector2.zero.x,
            end.x,
            0.75,
            value => {logo.ref().position.x(value)}
        ),
        spring(
            SmoothSpring,
            Vector2.zero.y,
            end.y,
            0.75,
            value => {logo.ref().position.y(value)}
        ),
        spring(
            SmoothSpring,
            1,
            2,
            value => {logo.streak.scale_x(value)}
        ),
        spring(
            SmoothSpring,
            1,
            0.75,
            value => {logo.streak.scale_y(value)}
        ),
    )

    
    yield* waitFor(0.25);
});


class Logo{
    public ref: Reference<Rect>;

    public size: SimpleSignal<number>;
    public rotation: SimpleSignal<number>;

    public streak: {
        ref: Reference<Img>,
        scale_x: SimpleSignal<number>,
        scale_y: SimpleSignal<number>
    }

    public constructor(view: View2D, size: number, rotation: number, x_scale: number, y_scale: number){
        this.ref = createRef<Rect>()

        this.size = createSignal<number>(size);
        this.rotation = createSignal<number>(rotation)

        this.streak = {
            ref: createRef<Img>(),
            scale_x: createSignal<number>(x_scale),
            scale_y: createSignal<number>(y_scale)
        }

        const default_size = 1070;
        const offset = default_size / 4;
        view.add(
            <Rect
                size={new Vector2(default_size, default_size)}
                rotation={this.rotation}
                scale={() => default_size / this.size()}

                ref={this.ref}
            >
                <Img
                    src={star}
                    
                    size={new Vector2(493.44, 513.94)}
                    position={new Vector2(447.18 - offset, 286.2 - offset)}

                    ref={this.streak.ref}
                />
                <Img
                    src={streak}
                    
                    scaleX={this.streak.scale_x}
                    scaleY={this.streak.scale_y}
                    
                    size={new Vector2(469.63, 403.23)}
                    position={() => new Vector2(90.15 - offset * this.streak.scale_x() - 10, 339.55 - offset - 65)}
                />
            </Rect>
        );
    }
}