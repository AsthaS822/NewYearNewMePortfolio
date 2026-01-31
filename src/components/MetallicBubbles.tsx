"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const Bubble = ({ initialPos, size, speed }: { initialPos: [number, number, number], size: number, speed: number }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const pos = useRef(initialPos);
    const wobbleSpeed = useMemo(() => Math.random() * 3 + 2, []); // Faster distortion

    // Tech side (left) falls, Space side (right) rises
    const direction = initialPos[0] < 0 ? -1 : 1;

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Increased movement velocity
            pos.current[1] += speed * direction;

            // Fast reset loop for continuous motion
            if (direction === 1 && pos.current[1] > 12) {
                pos.current[1] = -12;
            } else if (direction === -1 && pos.current[1] < -12) {
                pos.current[1] = 12;
            }

            meshRef.current.position.set(pos.current[0], pos.current[1], pos.current[2]);

            // High-speed liquid distortion
            const t = state.clock.getElapsedTime() * wobbleSpeed;
            meshRef.current.scale.x = size + Math.sin(t) * 0.15;
            meshRef.current.scale.y = size + Math.cos(t * 1.5) * 0.15;
            meshRef.current.scale.z = size + Math.sin(t * 0.8) * 0.15;

            // Rapid rotation for dynamic metallic highlights
            meshRef.current.rotation.x += delta * 0.8;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhysicalMaterial
                color="#ffffff"
                metalness={1}
                roughness={0.01} // Smoother surface for sharper reflections
                transmission={0.1}
                thickness={1}
                envMapIntensity={3} // Maximum shine
            />
        </mesh>
    );
};

export default function MetallicBubbles() {
    const bubbles = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
        initialPos: [
            (Math.random() - 0.5) * 24,
            (Math.random() - 0.5) * 24,
            (Math.random() - 0.5) * 4
        ] as [number, number, number],
        size: Math.random() * 0.5 + 0.3,
        // Boosted speed range for "fast" motion
        speed: Math.random() * 0.08 + 0.04
    })), []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
                <ambientLight intensity={0.4} />
                {/* Intense point lights to catch the fast-moving metal */}
                <pointLight position={[-10, 5, 5]} intensity={4} color="#ff66b2" />
                <pointLight position={[10, -5, 5]} intensity={4} color="#a366ff" />

                <Environment preset="studio" />
                {bubbles.map((b, i) => <Bubble key={i} {...b} />)}
            </Canvas>
        </div>
    );
}
