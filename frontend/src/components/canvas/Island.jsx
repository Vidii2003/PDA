import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Island = () => {
  const island = useGLTF("./free_-_skybox_fairy_forest_day/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-3, 20, 1]}
        angle={0.1}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight intensity={1} />
      <primitive
        object={island.scene}
        scale={0.2}
        position={[0, -3, -1]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const IslandCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [1, 0, 0], fov: 110 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <Island isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
   
  );
};

export default IslandCanvas;
