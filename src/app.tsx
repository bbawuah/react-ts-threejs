import React, { Fragment, useRef, useState } from 'react'
import { render } from 'react-dom'
import { Canvas, MeshProps, useFrame } from 'react-three-fiber'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import type { Mesh } from 'three'
import { MeshWobbleMaterial, softShadows, OrbitControls } from 'drei'
import { useSpring, animated } from 'react-spring'

// softShadows()

type Position = [x: number, y: number, z: number]
type Width = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
]
interface Props {
  position: Position
  args: Width
  color: string
}

const SpinningMesh: React.FC<Props> = ({ position, args, color }) => {
  // This reference gives direct access to the mesh
  const mesh = useRef<Mesh>()
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh castShadow position={position} ref={mesh}>
      <boxBufferGeometry args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

const App: React.FC<MeshProps> = () => {
  const meshes = Array(5).fill('mesh')
  return (
    <Fragment>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.4}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, -20]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
        </group>
        {meshes.map(() => {
          return (
            <SpinningMesh
              position={getPosition()}
              args={getArgs()}
              color={getColor()}
            />
          )
        })}
        <OrbitControls />
      </Canvas>
    </Fragment>
  )

  function getPosition(): Position {
    const x = Math.floor(Math.random() * 15 - 5)
    const y = Math.floor(Math.random() * 4 + 1)
    const z = Math.floor(Math.random() * 10 - 5)

    return [x, y, z]
  }

  function getArgs(): Width {
    const width = Math.floor(Math.random() * 4 + 1)
    const height = Math.floor(Math.random() * 4 + 1)
    const depth = Math.floor(Math.random() * 4 + 1)

    return [width, height, depth]
  }

  function getColor() {
    const r = Math.floor(Math.random() * 100)
    const g = Math.floor(Math.random() * 175)
    const b = Math.floor(Math.random() * 200)

    return `rgb(${r},${g},${b})`
  }
}

render(<App />, document.getElementById('app'))
