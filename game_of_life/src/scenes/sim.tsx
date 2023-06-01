import {Rect, makeScene2D} from '@motion-canvas/2d';
import {Reference, Vector2, all, createRef, useDuration, waitFor} from '@motion-canvas/core';

const game_board_size : [number, number] = [20, 20];

export default makeScene2D(function* (view) {
  //setting background as black
  view.fill("black");
  
  //backend stuff for the game
  //defining current
  let game_state: Generator<boolean[]> = game_of_life(
    (() => {
      const start_state: boolean[] = [];
  
      // Original code for initializing all cells to false
      // for(let i1 = 0; i1 < game_board_size[0] * game_board_size[1]; i1++) {
      //   start_state.push(false);
      // }
  
      // Randomize the start cell state
      for(let i1 = 0; i1 < game_board_size[0] * game_board_size[1]; i1++) {
        const randomState: boolean = Math.random() < 0.5; // Adjust the probability as desired
        start_state.push(randomState);
      }
  
      return start_state;
    })()
  );

  //front end stuff for game
  //defining grid cell sizes
  const grid_cell_size : Vector2 = (() => {
    let grid_size: Vector2 = view.size();

    grid_size.x = grid_size.x / game_board_size[0];
    grid_size.y = grid_size.y / game_board_size[1];

    return grid_size;
  })();
  //generating cell element
  const cells_ref: Reference<Rect>[] = [];
  for(let i1 = 0; i1 < game_board_size[0] * game_board_size[1]; i1++) {
    cells_ref.push(createRef<Rect>());
  }
  // //creating all elements
  {
    let game_board_ref: Reference<Rect> = createRef<Rect>();
    view.add(
      <Rect
        layout
        
        ref={game_board_ref}
        
        direction={'column'}
        
        width={"100%"} height={grid_cell_size.y}
        
        position={[0, -1 * view.size.y() / 2 + grid_cell_size.y/2]}
      ></Rect>
    );
    for (let row = 0; row < game_board_size[1]; row++) {
      let row_ref : Reference<Rect> = createRef<Rect>();
      game_board_ref().add(<Rect layout ref={row_ref}></Rect>);

      for (let col = 0; col < game_board_size[0]; col++) {
        row_ref().add(
          <Rect
            width={grid_cell_size.x} height={grid_cell_size.y}
            
            fill={"white"}
            
            scale={0}

            ref={cells_ref[cell_index(col, row)]}
          />
        )
      }
    }
  }

  //animating n iterations
  const iterations = 10;
  const step_dur = 0.5;
  for(let i1 = 0; i1 < iterations; i1++) {
    const state: boolean[] = game_state.next().value;

    let anim = [];
    for(let i2 = 0; i2 < state.length; i2++) {
      const life_state = state[i2];
      const cell_ref = cells_ref[i2];

      if (life_state) {
        anim.push(cell_ref().scale(cell_ref().scale(), 0).to(1, step_dur))
      } else {
        anim.push(cell_ref().scale(cell_ref().scale(), 0).to(0, step_dur))
      }
    }

    yield* all(...anim);

    yield* waitFor(1);
  }

  //useDuration('event');

  yield* waitFor(5);
});

function cell_index(x: number, y: number) : number {
  return x + y * game_board_size[0];
}

function* game_of_life( current_state: boolean[]): Generator<boolean[]> {
  let next_state: boolean[] = [];
  for(let i1 = 0; i1 < game_board_size[0] * game_board_size[1]; i1++) {
    next_state[i1] = false;
  }

  yield current_state;

  while(true){
    for(let x = 0; x < game_board_size[0]; x++) {
      for(let y = 0; y < game_board_size[1]; y++) {
        let neighbor_cell_count = 0;
        
        for(let delta_x = -1; delta_x <= 1; delta_x++) {
          for(let delta_y = -1; delta_y <= 1; delta_y++) {
            if(delta_x !== 0 && delta_y !== 0) {

              let check_x = x + delta_x;
              let check_y = y + delta_y;

              if (check_x < 0 || game_board_size[0] <= check_x) {
                continue;
              }

              if (check_y < 0 || game_board_size[1] <= check_y) {
                continue;
              }

              if (current_state[cell_index(check_x, check_y)]) {
                neighbor_cell_count++;
              }
            }
          }
        }

        next_state[cell_index(x, y)] = current_state[cell_index(x, y)];

        //if alive
        if (current_state[cell_index(x, y)]) {
          //less than 2 or greater than 3 then die
          if (neighbor_cell_count < 2|| 3 < neighbor_cell_count) {
            next_state[cell_index(x, y)] = false;
          }
        //if dead
        } else {
          //new cell if cell count is exactly 3
          if (neighbor_cell_count === 3) {
            next_state[cell_index(x, y)] = true;
          }
        }
      }
    }

    yield next_state;

    current_state = next_state;
  }
}