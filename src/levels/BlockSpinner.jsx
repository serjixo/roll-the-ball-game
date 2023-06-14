import {useFrame} from "@react-three/fiber";
import {useRef, useState} from "react";
import {RigidBody} from "@react-three/rapier";
import {floor2Material, obstacleMaterial} from "../materials/Materials.js";
import {boxGeometry} from "../geometries/Geometries.js";
import * as THREE from "three";
import {Quaternion} from "three";

export default function BlockSpinner({position = [0, 0, 0]}) {
    const obstacle = useRef();
    const [obstacleRotationSpeedRandom, setObstacleRotationSpeedRandom] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1));

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // const angle = time * 0.5
        const euler = new THREE.Euler(0, time * obstacleRotationSpeedRandom, 0)
        const quaternion = new Quaternion()
        quaternion.setFromEuler(euler)
        obstacle.current.setNextKinematicRotation(quaternion)
    })

    return (
        <group position={position}>
            <RigidBody ref={obstacle} type={'kinematicPosition'} position={[0, 0.3, 0]} restitution={0.2} friction={0}>
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