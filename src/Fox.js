import { useAnimations, useGLTF } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';

export default function Fox(props) {
	const fox = useGLTF('./Fox/glTF/Fox.gltf');
	const animations = useAnimations(fox.animations, fox.scene);

	const { animationName } = useControls({
		animationName: { options: animations.names },
	}); 

    const [animationType, setAnimationType] = useState('Survey')

    let filteredAnimationList = animations.names.filter(el => el !== animationType)

    useEffect(() => {
        setAnimationType(animationName)
    }, [animationName])
    

	useEffect(() => {
		const action = animations.actions[animationType];
		action.reset().fadeIn(0.5).play();
        snowSpeedHandler()

		return () => {
			action.fadeOut(0.5);
		};
	}, [animationType]);

    const snowSpeedHandler = () => {
        switch (animationType) {
			case 'Survey':
				props.speadSetter(0);
				break;
			case 'Walk':
				props.speadSetter(1);
				break;
			case 'Run':
				props.speadSetter(2);
				break;

			default:
				props.speadSetter(0);
				break;
		}
    }

	const eventHandler = () => {
        const choose = Math.round(Math.random())
        setAnimationType(filteredAnimationList[choose])
        filteredAnimationList = animations.names.filter(el => el !== animationType)
		snowSpeedHandler()
	};
	return (
		<primitive
			onClick={eventHandler}
			object={fox.scene}
			scale={0.02}
			position={[-0.5, 0, 2.5]}
			rotation-y={0.3}
		/>
	);
}
