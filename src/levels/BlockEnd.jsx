import {Float, Text, useGLTF} from "@react-three/drei";
import {floor1Material} from "../materials/Materials.js";
import {boxGeometry} from "../geometries/Geometries.js";
import {RigidBody} from "@react-three/rapier";

export default function BlockEnd({position = [0, 0, 0]}) {
    const finishPlatform = useGLTF('./models/cut-board-round.gltf');

    finishPlatform.scene.children.forEach((mesh) => {
        mesh.children.forEach((meshChildren) => meshChildren.castShadow = true)
    })

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={floor1Material}
                // position={[0, -0.1, 0]}
                receiveShadow
                scale={[4, 0.2, 4]}
            >
            </mesh>
            <mesh>
                {/*<Box castShadow/>*/}
            </mesh>
            <RigidBody type={"fixed"} restitution={0.2} friction={0}>
                <primitive object={finishPlatform.scene} scale={4} position={[0, 0.1, 0]}/>
            </RigidBody>
            <Float>
                <Text
                    font={'./bebas-neue-v9-latin-regular.woff'}
                    scale={0.5}
                    lineHeight={0.75}
                    textAlign="center"
                    position={[0, 1, 2]}
                >
                    FINISH
                    <meshBasicMaterial toneMapped={false}/>
                </Text>
            </Float>
        </group>
    )
}
