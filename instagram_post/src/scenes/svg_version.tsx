import { Img, Knot, Layout, Rect, Spline, View2D } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, waitFor} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import star from '../imgs/Union.png';
import streak from '../imgs/Group 1.png';
import { Reference, createRef } from '@motion-canvas/core/lib/utils';
import { Signal, SimpleSignal, createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
    view.fill("black");
    view.size(new Vector2(1080, 1080));

    const offset = 1070/4;

    let tmp = new Logo(view, 1070, 0, 1, 1);

    yield* waitFor(1);
    yield* all(
        tmp.rotation(0, 0).to(45, 1),
        tmp.streak.scale_x(1, 0).to(1.5, 1),
        tmp.streak.scale_y(1, 0).to(0.9, 1)
    );
    yield* waitFor(1);
});

class Logo{
    public logo: Reference<Rect>;

    public size: SimpleSignal<number>;
    public rotation: SimpleSignal<number>;

    public streak: {
        ref: Reference<Img>,
        scale_x: SimpleSignal<number>,
        scale_y: SimpleSignal<number>
    }

    public constructor(view: View2D, size: number, rotation: number, x_scale: number, y_scale: number){
        this.logo = createRef<Rect>()

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

                ref={this.logo}
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