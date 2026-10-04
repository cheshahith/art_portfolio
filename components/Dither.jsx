"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DitherWaveMesh({
  waveColor = [0.714, 0.765, 0.824],
  backgroundColor = [0.42, 0.102, 0.118],
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
  colorNum = 4,
  waveAmplitude = 0.3,
  waveFrequency = 3,
  waveSpeed = 0.05,
}) {
  const meshRef = useRef(null);
  const mousePos = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveColor: {
        value: new THREE.Color(waveColor[0], waveColor[1], waveColor[2]),
      },
      uBackgroundColor: {
        value: new THREE.Color(
          backgroundColor[0],
          backgroundColor[1],
          backgroundColor[2]
        ),
      },
      uWaveFrequency: { value: waveFrequency },
      uWaveAmplitude: { value: waveAmplitude },
      uColorNum: { value: colorNum },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseRadius: { value: mouseRadius },
      uEnableMouseInteraction: { value: enableMouseInteraction },
    }),
    []
  );

  useEffect(() => {
    if (meshRef.current?.material) {
      meshRef.current.material.uniforms.uWaveColor.value.setRGB(
        waveColor[0],
        waveColor[1],
        waveColor[2]
      );
      meshRef.current.material.uniforms.uBackgroundColor.value.setRGB(
        backgroundColor[0],
        backgroundColor[1],
        backgroundColor[2]
      );
      meshRef.current.material.uniforms.uWaveFrequency.value = waveFrequency;
      meshRef.current.material.uniforms.uWaveAmplitude.value = waveAmplitude;
      meshRef.current.material.uniforms.uColorNum.value = colorNum;
      meshRef.current.material.uniforms.uMouseRadius.value = mouseRadius;
      meshRef.current.material.uniforms.uEnableMouseInteraction.value =
        enableMouseInteraction;
    }
  }, [
    waveColor,
    backgroundColor,
    waveFrequency,
    waveAmplitude,
    colorNum,
    mouseRadius,
    enableMouseInteraction,
  ]);

  useFrame((state, delta) => {
    if (!meshRef.current?.material) return;
    if (!disableAnimation) {
      meshRef.current.material.uniforms.uTime.value += delta * waveSpeed * 10.0;
    }
    if (enableMouseInteraction) {
      meshRef.current.material.uniforms.uMouse.value.lerp(
        mousePos.current,
        0.08
      );
    }
  });

  const handlePointerMove = (e) => {
    if (enableMouseInteraction && e.uv) {
      mousePos.current.set(e.uv.x, e.uv.y);
    }
  };

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uWaveColor;
    uniform vec3 uBackgroundColor;
    uniform float uWaveFrequency;
    uniform float uWaveAmplitude;
    uniform int uColorNum;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    uniform bool uEnableMouseInteraction;
    varying vec2 vUv;

    float getBayer4x4(vec2 coord) {
      vec2 p = mod(coord, 4.0);
      int x = int(p.x);
      int y = int(p.y);
      if (y == 0) {
        if (x == 0) return 0.0 / 16.0;
        if (x == 1) return 8.0 / 16.0;
        if (x == 2) return 2.0 / 16.0;
        return 10.0 / 16.0;
      } else if (y == 1) {
        if (x == 0) return 12.0 / 16.0;
        if (x == 1) return 4.0 / 16.0;
        if (x == 2) return 14.0 / 16.0;
        return 6.0 / 16.0;
      } else if (y == 2) {
        if (x == 0) return 3.0 / 16.0;
        if (x == 1) return 11.0 / 16.0;
        if (x == 2) return 1.0 / 16.0;
        return 9.0 / 16.0;
      } else {
        if (x == 0) return 15.0 / 16.0;
        if (x == 1) return 7.0 / 16.0;
        if (x == 2) return 13.0 / 16.0;
        return 5.0 / 16.0;
      }
    }

    void main() {
      vec2 uv = vUv;
      
      float mouseEffect = 0.0;
      if (uEnableMouseInteraction) {
        float dist = distance(uv, uMouse);
        mouseEffect = smoothstep(uMouseRadius, 0.0, dist) * 0.4;
      }

      float wave1 = sin(uv.x * uWaveFrequency + uTime + mouseEffect * 4.0) * uWaveAmplitude;
      float wave2 = cos(uv.y * uWaveFrequency * 1.3 + uTime * 0.8 + mouseEffect * 3.0) * uWaveAmplitude;
      float wave3 = sin((uv.x + uv.y) * (uWaveFrequency * 0.8) - uTime * 1.2) * (uWaveAmplitude * 0.6);

      float wave = uv.y + wave1 + wave2 + wave3;
      float intensity = clamp(wave, 0.0, 1.0);

      float threshold = getBayer4x4(gl_FragCoord.xy) - 0.5;
      float steps = float(uColorNum);
      float dithered = floor(intensity * (steps - 1.0) + threshold + 0.5) / (steps - 1.0);
      dithered = clamp(dithered, 0.0, 1.0);

      vec3 color = mix(uBackgroundColor, uWaveColor, dithered);
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      position={[0, 0, 0]}
    >
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function Dither(props) {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        <DitherWaveMesh {...props} />
      </Canvas>
    </div>
  );
}
