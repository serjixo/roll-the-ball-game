import {useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";
import {RigidBody} from "@react-three/rapier";
import {floor2Material, obstacleMaterial} from "../materials/Materials.js";
import {boxGeometry} from "../geometries/Geometries.js";

export default function BlockLimbo({position = [0, 0, 0]}) {
    const obstacle = useRef();
    const [startingPointOffset] = useState(() => (Math.random() * Math.PI * 2));

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        const y = Math.sin(time + startingPointOffset) + 1.30
        obstacle.current.setNextKinematicTranslation({x: position[0], y: position[1] + y, z: position[2]})
    })

    return (
        <group position={position}>
            <RigidBody ref={obstacle}
                       type={'kinematicPosition'}
                // position={position}
                       restitution={0.2}
                       friction={0}
            >
                <mesh
                    material={obstacleMaterial}
                    geometry={boxGeometry}
                    scale={[3.5, 0.3, 0.3]}
                    // position={[position[0], position[1] + 0.2, position[2]]}
                    receiveShadow
                    castShadow
                />
            </RigidBody>
            <mesh
                geometry={boxGeometry}
                material={floor2Material}
                // position={[0, -0.1, 0]}
                receiveShadow
                scale={[4, 0.2, 4]}
            >
            </mesh>
        </group>
    )
}