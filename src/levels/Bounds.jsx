import {wallMaterial} from "../materials/Materials.js";
import {boxGeometry} from "../geometries/Geometries.js";
import {CuboidCollider, RigidBody} from "@react-three/rapier";

export default function Bounds({length = 1}) {
    return (
        <RigidBody type={'fixed'} restitution={0.2} friction={0}>
            <mesh
                scale={[0.3, 1.5, length * 4]}
                position={[2.15, 0.75, -(length * 2) + 2]}
                material={wallMaterial}
                geometry={boxGeometry}
                castShadow
            />
            <mesh
                scale={[0.3, 1.5, length * 4]}
                position={[-2.15, 0.75, -(length * 2) + 2]}
                material={wallMaterial}
                geometry={boxGeometry}
                receiveShadow
            />
            <mesh
                scale={[4, 1.5, 0.3]}
                position={[0, 0.75, -(length * 4) + 2]}
                material={wallMaterial}
                geometry={boxGeometry}
                receiveShadow
            />
            <CuboidCollider
                args={[2, 0.1, 2 * length]}
                position={[0, 0, -(length * 2) + 2]}
                restitution={0.2}
                friction={1}
            />

        </RigidBody>
    )
}