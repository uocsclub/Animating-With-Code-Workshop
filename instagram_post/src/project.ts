import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import svg_version from './scenes/svg_version?scene';
import intro from './scenes/intro?scene';
import the_details from './scenes/the_details?scene';

export default makeProject({
  scenes: [intro, the_details],
});
