import * as THREE from 'three'
import BlockStart from "./levels/BlockStart.jsx";
import BlockSpinner from "./levels/BlockSpinner.jsx";
import React, {useMemo} from "react";
import BlockLimbo from "./levels/BlockLimbo.jsx";
import BlockAxe from "./levels/BlockAxe.jsx";
import BlockEnd from "./levels/BlockEnd.jsx";
import Bounds from "./levels/Bounds.jsx";
import Player from "./player/player.jsx";

export default function Level({count = 10, blockTypes = [BlockAxe, BlockLimbo, BlockSpinner]}, seed = 0) {

    const blocks = []
    useMemo(() => {
        for (let i = 0; i < count; i++) {
            const block = blockTypes[Math.floor(Math.random() * blockTypes.length)]
            blocks.push(block)
        }

    }, [count, blockTypes, seed]);
    THREE.ColorManagement.legacyMode = false;

    return (
        <>
            <Player/>
            <BlockStart position={[0, 0, 0]}/>
            {
                blocks.map((Block, index) =>
                    <Block key={index} position={[0, 0, -(index * 4) - 4]}/>
                )
            }
            <BlockEnd position={[0, 0, -(count * 4) - 4]}/>
            <Bounds length={count + 2}/>
        </>
    )
}