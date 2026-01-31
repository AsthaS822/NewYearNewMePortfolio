"use client";
import React, { useRef } from "react";
import { useTexture, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const projectImages = [
    "/assets/gitgradeorange.jpeg",
    "/assets/airesumepink.jpeg",
    "/assets/gitgrade yellow.jpeg",
    "/assets/airesumegreen.jpeg"
];

const Cyl = ({ isPaused }: { isPaused: boolean }) => {
    const textures = useTexture(projectImages);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        // Only rotates when the description is NOT showing
        if (groupRef.current && !isPaused) {
            groupRef.current.rotation.y += delta * 1.5; // Fast spin for transition
        }
    });

    return (
        <group ref={groupRef} rotation={[0, 1.4, 0.5]}>
            {/* Add this inside the group to provide reflections */}
            <Environment preset="city" />

            {Array.isArray(textures) && textures.filter(Boolean).map((tex, i) => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 4, 0]}>
                    <cylinderGeometry args={[1, 1, 1.4, 60, 60, true, -Math.PI / 4, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        map={tex}
                        transparent
                        side={THREE.DoubleSide}
                        /* The "Drink Ad" Settings */
                        roughness={0.02}      // Super glossy
                        metalness={0.8}       // High reflection
                        clearcoat={1}         // Adds an extra layer of "glass" shine
                        clearcoatRoughness={0}
                        emissive={"#ffffff"}
                        emissiveIntensity={0.1} // Prevents the "blackish" look
                    />
                </mesh>
            ))}
        </group>
    );
};

export default Cyl;
