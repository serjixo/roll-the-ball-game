import {RigidBody, useRapier} from "@react-three/rapier";
import {useGLTF, useKeyboardControls} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import * as THREE from 'three'
import useGame from "../stores/useGame.jsx";

export default function Player() {

    let player = useGLTF('./models/zombie-car.gltf');
    const [subscribedKeys, getKeys] = useKeyboardControls();
    let playerBody = useRef();
    let {rapier, world} = useRapier();
    const rapierWorld = world.raw()
    const [smoothedCameraPosition, setSmoothedCameraPosition] = useState(() => new THREE.Vector3(10, 10, 10));
    const [smoothedCameraTarget, setSmoothedCameraTarget] = useState(() => new THREE.Vector3());

    const start = useGame(state => state.start)
    const end = useGame(state => state.end)
    const restart = useGame(state => state.restart)
    const blocksCount = useGame(state => state.blocksCount)


    function jump() {
        const origin = playerBody.current.translation()

        origin.y -= 0.31
        const direction = {x: 0, y: -1, z: 0}

        const ray = new rapier.Ray(origin, direction)
        const hit = rapierWorld.castRay(ray, 10, true)

        if (hit.toi < 0.15) {
            playerBody.current.applyImpulse({x: 0, y: 0.5, z: 0})
        }
    }

    const reset = () => {
        playerBody.current.setTranslation({x: 0, y: 1, z: 0})
        playerBody.current.setLinvel({x: 0, y: 0, z: 0})
        playerBody.current.setAngvel({x: 0, y: 0, z: 0})
    }

    useEffect(() => {

        const unsuscribeReset = useGame.subscribe(
            state => state.phase,
            value => {
                if (value == 'ready')
                    reset()
            }
        )
        const unsuscribeJump = subscribedKeys(
            state => state.jump,
            (value) => {
                if (value) {
                    jump()
                }
            }
        )

        const unsuscribeAny = subscribedKeys(() => {
            start()
        })

        return () => {
            unsuscribeReset()
            unsuscribeJump()
            unsuscribeAny()
        }
    }, []);


    player.scene.children.forEach((mesh) => {
        mesh.children.forEach((meshChildren) => meshChildren.castShadow = true)
    })

    useFrame((state, delta) => {
        const {forward, leftward, backward, rightward} = getKeys()

        const impulse = {x: 0, y: 0, z: 0}
        const torque = {x: 0, y: 0, z: 0}


        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        if (forward) {
            impulse.z -= impulseStrength
            torque.x -= torqueStrength
        }
        if (backward) {
            impulse.z += impulseStrength
            torque.x += torqueStrength
        }
        if (rightward) {
            impulse.x += impulseStrength
            torque.z -= torqueStrength
        }
        if (leftward) {
            impulse.x -= impulseStrength
            torque.z += torqueStrength
        }

        const bodyPosition = playerBody.current.translation()

        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()
        cameraTarget.copy(bodyPosition)
        cameraTarget.y += 0.25

        smoothedCameraPosition.lerp(cameraPosition, 5 * delta)
        smoothedCameraTarget.lerp(cameraTarget, 5 * delta)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)


        playerBody.current.applyImpulse(impulse)
        playerBody.current.applyTorqueImpulse(torque)

        if (bodyPosition.z < -(blocksCount * 4 + 2)) {
            end()
        }
        if (bodyPosition.y < -4) {
            restart()
        }

    })

    return (
        // <RigidBody ref={playerBody} colliders={'hull'} restitution={0.2} position={[0, 0, 0]}>
        //     <primitive object={player.scene} rotation={[0, Math.PI, 0]} scale={0.5}/>
        // </RigidBody>

        <RigidBody
            ref={playerBody}
            colliders={'ball'}
            position={[0, 1, 0]}
            restitution={0.2}
            friction={1}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]}/>
                <meshStandardMaterial flatShading color={'#333333'} metalness={0} roughness={0}/>
            </mesh>
        </RigidBody>
    )
}
