import Lights from './Lights.jsx'
import Level from "./Level.jsx";
import {Debug, Physics} from "@react-three/rapier";
import useGame from "./stores/useGame.jsx";
import Effects from "./effects/Effects.jsx";

export default function Experience() {
    let blocksCount = useGame(state => state.blocksCount);
    let blocksSeed = useGame(state => state.blocksSeed);

    return <>
        <color args={['#666666']} attach={'background'}/>
        <Physics>
            {/*<Debug/>*/}
            <Lights/>
            <Level count={blocksCount} seed={blocksSeed}/>
        </Physics>
        {/*<Effects/>*/}
    </>
}