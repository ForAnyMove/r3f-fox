import { Canvas } from '@react-three/fiber';
import ReactDOM from 'react-dom/client';
import './index.css';
import Module from './Module.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Canvas
  camera={ {
      fov: 45,
      near: 0.1,
      far: 200,
      position: [ -3, 3, 14 ]
  } }
>
    <Module/>
  </Canvas>
)
