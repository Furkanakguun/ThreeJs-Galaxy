import { OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import { Particles } from './Particles'
import * as THREE from 'three'
import { useNavigate } from "react-router-dom";

 function Products() {
    let navigate = useNavigate();
  function Word({ children, ...props }) {
    const color = new THREE.Color()
    const fontProps = {
      font: 'montserrat',
      fontSize: 2.5,
      letterSpacing: -0.05,
      lineHeight: 1,
      'material-toneMapped': false
    }
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const over = (e) => (e.stopPropagation(), setHovered(true))
    const out = () => setHovered(false)
    // Change the mouse cursor on hover
    useEffect(() => {
      if (hovered) document.body.style.cursor = 'pointer'
      return () => (document.body.style.cursor = 'auto')
    }, [hovered])
    // Tie component to the render-loop
    useFrame(({ camera }) => {
      // Make text face the camera
      ref.current.quaternion.copy(camera.quaternion)
      // Animate font color
      ref.current.material.color.lerp(color.set(hovered ? '#fa2720' : 'white'), 0.1)
    })

    function handleNavigate() {
      console.log(children)
      if (children == "Home") navigate("../");
      // if (children == "News&Info") navigate("../news");
      // if (children == "Partners") navigate("../partners");
      // if (children == "Team") navigate("../team");
      // if (children == "Contact") navigate("../contact");
      // if (children == "Showroom") navigate("../showroom");
    }

    return (
      // <Float floatIntensity={3} speed={2}>
      //    </Float>
      <Text ref={ref} onPointerOver={over} onPointerOut={out} {...props} {...fontProps} children={children} onClick={handleNavigate}>
        {/* {" "}
      <Html>
        <a className="aMenu" href="/news">
          Experience
        </a>
      </Html> */}
      </Text>
    )
  }

  function Cloud({ count = 4, radius = 20 }) {
    useFrame(() => {})

    // Create a count x count random words with spherical distribution
    const words = useMemo(() => {
      const temp = []
      const spherical = new THREE.Spherical()
      const phiSpan = Math.PI / (count + 1)
      const thetaSpan = (Math.PI * 2) / count
      temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * 1, thetaSpan * 0)), 'Trucks'])
      temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * 1, thetaSpan * 1)), 'Automotive \nAftermarket', 'news'])
      temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * 1, thetaSpan * 2)), 'Construction \nEquipment'])
      temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * 2, thetaSpan * 3)), 'Home'])
    //   temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * 2, thetaSpan * 4)), 'Products'])
    //   temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * 2, thetaSpan * 5)), 'Contact'])
      // for (let i = 1; i < count + 1; i++)
      //   // Taken from https://discourse.threejs.org/t/can-i-place-obects-on-a-sphere-surface-evenly/4773/6
      //   for (let j = 0; j < count; j++)
      //     temp.push([
      //       new THREE.Vector3().setFromSpherical(
      //         spherical.set(radius, phiSpan * i, thetaSpan * j)
      //       ),
      //       "heterometa",
      //     ]);
      return temp
    }, [count, radius])
    return words.map(([pos, word], index) => <Word key={index} position={pos} children={word} />)
  }
  return (
    <Canvas camera={{ fov: 70, position: [-30, 30, 20] }}>
      <color attach="background" args={['black']} />
      <OrbitControls makeDefault />
      <ambientLight />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
      <Cloud count={3} radius={20} anchorX="center" anchorY="middle" />
    </Canvas>
  )
 }


 export { Products }