import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { waitFor} from '@motion-canvas/core/lib/flow';
import { Vector2 } from '@motion-canvas/core/lib/types';
import {CodeBlock, edit, insert, remove} from '@motion-canvas/2d/lib/components/CodeBlock';
import { createRef } from '@motion-canvas/core/lib/utils/createRef';

//who: uO CS club
//what: Code && Coffee: Animating with Code
//where: TBA
//When: {year: 2023, month: "May", day: 00, hour: 1, min: 0}
export default makeScene2D(function* (view) {
    view.fill("#242424");
    view.size(new Vector2(1080, 1080));

    const code_block = createRef<CodeBlock>();

    view.add(
        <CodeBlock ref={code_block} language="typescript" code={``} width={`80%`} height={`80%`} fontSize={40}/>,
    );

    yield* waitFor(0.25);

    const DECELERATION = "const"

    const WHO =
`//     _____ _____ _____        _     _   
// _ _|     |     |   __|   ___| |_ _| |_ 
//| | |  |  |   --|__   |  |  _| | | | . |
//|___|_____|_____|_____|  |___|_|___|___|`

    const WHAT_ENG =
`${DECELERATION} what = {
    event: "Code && Coffee",
    workshop: "Animating with Code"
}`
    const WHAT_FR =
`${DECELERATION} quoi = {
    événement: "Code && Café",
    atelier: "Animation avec du Code"
}`
    const WHERE_ENG = `${DECELERATION} where = uOttawa.Lamoureux.243`
    const WHERE_FR = `${DECELERATION} où = uOttawa.Lamoureux.243`

    const WHEN_ENG =
`${DECELERATION} when = new DateTime(
    year = 2023,
    month = "June",
    day = 1,
    hour = 17,
    min = 0
)`

    const WHEN_FR =
`${DECELERATION} quand = DateTime(
    année = 2023,
    mois = "Juin",
    jour = 1,
    heure = 17,
    minute = 0
)`

    yield* code_block().edit(1, false)`
    ${insert(`${WHO}`
    )}`

    yield* code_block().edit(1, false)`${WHO}

${insert(WHAT_ENG)}`
    yield* code_block().edit(1, false)`${WHO}

${WHAT_ENG}

${insert(WHERE_ENG)}`

    yield* code_block().edit(1, false)`
${WHO}

${WHAT_ENG}

${WHERE_ENG}

${insert(`${WHEN_ENG}`)}
    `

    yield* waitFor(3);

    
    yield* code_block().edit(1, false)`${edit(`${WHO}

${WHAT_ENG}

${WHERE_ENG}

${WHEN_ENG}`,
`${WHO}

${WHAT_FR}

${WHERE_FR}

${WHEN_FR}`
    )}
`

    yield* code_block().edit(1, false)`${remove(`${WHO}

${WHAT_FR}

${WHERE_FR}

${WHEN_FR}`
    )}
`

    yield* waitFor(0.25);
});