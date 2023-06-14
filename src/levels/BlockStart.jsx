import {floor1Material} from "../materials/Materials.js";
import {boxGeometry} from "../geometries/Geometries.js";
import {Float, Text} from "@react-three/drei";

export default function BlockStart({position = [0, 0, 0]}) {

    return (
        <group position={position}>
            <Float>
                <Text
                    font={'./bebas-neue-v9-latin-regular.woff'}
                    scale={ 0.5 }
                    maxWidth={ 0.25 }
                    lineHeight={ 0.75 }
                    textAlign="right"
                    position={ [ 0.70, 0.8, -0.5 ] }
                    rotation-y={ - 0.25 }
                >
                    Roll the ball
                    <meshBasicMaterial toneMapped={false}/>
                </Text>
            </Float>
            <mesh
                geometry={boxGeometry}
                material={floor1Material}
                // position={[0, -0.1, 0]}
                receiveShadow
                scale={[4, 0.2, 4]}
            >
            </mesh>
        </group>
    )
}
