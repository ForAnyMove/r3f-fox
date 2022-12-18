import {
	useMatcapTexture,
	Center,
	Text3D,
	OrbitControls,
} from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Fox from './Fox.js';

const boxGeometry = new THREE.BoxGeometry();
const material = new THREE.MeshMatcapMaterial();

export default function Module() {
	const donuts = useRef([]);

    const [cubeSpeed, setCubeSpeed] = useState(0)

	const [matcapTexture] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

	useFrame((state, delta) => {
		for (const donut of donuts.current) {
			donut.rotation.y += delta * 0.2;
            if (donut.position.x < -10){
                donut.position.x += 12;
                donut.position.z += 12;
            }
            donut.position.x -= cubeSpeed * 0.2;
            donut.position.z -= cubeSpeed * 0.2;
		}
	});

	useEffect(() => {
		matcapTexture.encoding = THREE.sRGBEncoding;
		matcapTexture.needsUpdate = true;

		material.matcap = matcapTexture;
		material.needsUpdate = true;
	}, []);

	return (
		<>
			<OrbitControls makeDefault />

			<directionalLight
				castShadow
				position={[1, 2, 3]}
				intensity={1.5}
				shadow-normalBias={0.04}
			/>
			<ambientLight intensity={0.5} />

			<Text3D
				material={material}
				font='./fonts/helvetiker_regular.typeface.json'
				size={0.75}
				height={0.2}
				curveSegments={12}
				bevelEnabled
				bevelThickness={0.02}
				bevelSize={0.02}
				bevelOffset={0}
				bevelSegments={5}
				position={[-4, 1.5, 0]}
			>
				Click on the fox!
			</Text3D>

			{[...Array(200)].map((value, index) => (
				<mesh
					ref={(element) => (donuts.current[index] = element)}
					key={index}
					geometry={boxGeometry}
					material={material}
					position={[
						(Math.random() - 0.5) * 15,
						(Math.random() - 0.5) * 10,
						(Math.random() - 0.5) * 15,
					]}
					scale={0.05 + Math.random() * 0.05}
					rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
				>
				</mesh>
			))}

			<Fox speadSetter = {setCubeSpeed} />
		</>
	);
}
