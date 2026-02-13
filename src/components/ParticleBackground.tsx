/* eslint-disable react-hooks/purity */
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 300 }) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate once — never changes
    const { positions, speeds } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
            spd[i] = 0.001 + Math.random() * 0.002;
        }

        return { positions: pos, speeds: spd };
    }, [count]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;

        const geo = pointsRef.current.geometry;
        const posAttr = geo.attributes.position as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;

        const time = clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
            arr[i * 3 + 1] += speeds[i];

            // Reset when too high
            if (arr[i * 3 + 1] > 15) {
                arr[i * 3 + 1] = -15;
            }
        }

        posAttr.needsUpdate = true;

        // subtle cinematic rotation
        pointsRef.current.rotation.y = time * 0.02;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    args={[positions, 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.06}
                color="#E50914"
                transparent
                opacity={0.7}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function CameraDrift() {
    useFrame(({ camera, clock }) => {
        const t = clock.getElapsedTime();

        camera.position.x = Math.sin(t * 0.1) * 0.5;
        camera.position.y = Math.cos(t * 0.1) * 0.5;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 75 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true }}
            >
                {/* Fog for cinematic depth */}
                <fog attach="fog" args={["#0B0B0F", 10, 30]} />

                <CameraDrift />
                <Particles count={300} />
            </Canvas>
        </div>
    );
}
