import { Canvas, MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh, TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

interface GlobeMesProps extends MeshProps {}

const GlobeMesh: React.FC<GlobeMesProps> = props => {
  const ref = useRef<Mesh>(null);
  const colorMap = useLoader(TextureLoader, "globe/globe.jpg");
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh {...props} ref={ref} scale={2}>
      <sphereGeometry />
      <meshStandardMaterial map={colorMap} roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

export const Globe = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />
        <GlobeMesh />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Suspense>
    </Canvas>
  );
};
