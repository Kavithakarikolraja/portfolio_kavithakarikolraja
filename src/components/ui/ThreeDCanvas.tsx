"use client";
import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    
    // Add mouse tracking wiggle
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <mesh ref={meshRef} scale={1.3}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <MeshDistortMaterial
        color="#a855f7"
        attach="material"
        distort={0.35}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
        wireframe={true}
      />
    </mesh>
  );
}

export default function ThreeDCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[320px] w-[320px] items-center justify-center rounded-full border border-purple-500/10 bg-purple-500/5 glow-purple md:h-[400px] md:w-[400px]">
        <div className="h-40 w-40 animate-pulse rounded-full border border-blue-500/20 bg-blue-500/5" />
      </div>
    );
  }

  return (
    <div className="h-[320px] w-[320px] md:h-[400px] md:w-[400px] relative select-none">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[80px] pointer-events-none opacity-50" />
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#3b82f6" />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#a855f7" />
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
          <FloatingShape />
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
}
