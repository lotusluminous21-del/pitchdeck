'use client';

import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── 3D Growth Field ────────────────────────────────────────────
// Fibonacci-sphere distribution for even 3D coverage.
// Strands grow outward from a volumetric shell.
// Slow rotation + mouse-driven tilt reveals true 3D depth.
// Screen-space center clearing keeps text readable.

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  uniform float uEntrance;
  uniform float uNodesPerStrand;
  uniform float uNumStrands;

  attribute float aStrandId;
  attribute float aNodeId;
  attribute vec3 aColor;

  varying float vAlpha;
  varying vec3 vColor;
  varying float vGlow;

  float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

  void main() {
    float progress = aNodeId / (uNodesPerStrand - 1.0);

    // Staggered growth — strands sprout at different times, tips last
    float strandDelay = hash(aStrandId * 31.7) * 0.4;
    float growReveal = smoothstep(0.0, 0.35,
      clamp(uEntrance - strandDelay - progress * 0.3, 0.0, 1.0));

    // ─── Fibonacci Sphere (even 3D coverage) ───
    float phi = acos(1.0 - 2.0 * (aStrandId + 0.5) / uNumStrands);
    float theta = aStrandId * 2.39996322;

    vec3 normal = normalize(vec3(
      sin(phi) * cos(theta),
      sin(phi) * sin(theta),
      cos(phi)
    ));

    // Thick volumetric shell — varied radius for depth
    float shellRadius = 3.0 + hash(aStrandId * 5.7) * 1.2;
    vec3 origin = normal * shellRadius;

    // ─── 3D Growth Direction ───
    vec3 up = vec3(0.0, 1.0, 0.001);
    vec3 tangent1 = normalize(cross(normal, up));
    vec3 tangent2 = cross(normal, tangent1);

    vec3 growDir = normalize(
      normal
      + tangent1 * (hash(aStrandId * 13.3) - 0.5) * 0.6
      + tangent2 * (hash(aStrandId * 19.7) - 0.5) * 0.6
    );

    // ─── Curved 3D Path ───
    float strandLen = 0.8 + hash(aStrandId * 9.1) * 1.8;
    float curveSeed = hash(aStrandId * 17.3);

    vec3 wave = vec3(
      sin(progress * 3.14 * (1.0 + curveSeed) + uTime * 0.2 + curveSeed * 6.28),
      cos(progress * 2.5 + uTime * 0.15 + curveSeed * 4.0),
      sin(progress * 2.0 + uTime * 0.18 + curveSeed * 5.0)
    ) * (0.15 + curveSeed * 0.2) * progress;

    vec3 pos = origin + growDir * (progress * strandLen * growReveal) + wave;

    // ─── True 3D Rotation (slow drift + mouse parallax tilt) ───
    float rotY = uTime * 0.06 + uMouse.x * 0.3;
    float rotX = sin(uTime * 0.025) * 0.12 + uMouse.y * 0.2;

    float cy = cos(rotY), sy = sin(rotY);
    pos = vec3(cy * pos.x + sy * pos.z, pos.y, -sy * pos.x + cy * pos.z);

    float cx = cos(rotX), sx = sin(rotX);
    pos = vec3(pos.x, cx * pos.y - sx * pos.z, sx * pos.y + cx * pos.z);

    // ─── Screen-space Center Clearing ───
    vec4 clipPos = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2 ndc = clipPos.xy / clipPos.w;
    float screenDist = length(ndc * vec2(1.0, 1.4));
    float centerClear = smoothstep(0.28, 0.6, screenDist);

    // ─── Depth-based Rendering ───
    float depthNorm = pos.z / 5.0;
    float depthAlpha = mix(0.25, 1.0, depthNorm * 0.5 + 0.5);

    // Strand fading
    float rootFade = smoothstep(0.0, 0.08, progress);
    float tipFade = smoothstep(1.0, 0.5, progress);

    // Digital network node pulses
    float nodeFreq = 2.5 + hash(aStrandId * 7.7) * 2.0;
    float nodePulse = pow(
      max(sin(progress * 6.28 * nodeFreq + uTime * 0.35 + curveSeed * 3.0), 0.0),
      5.0
    );
    vGlow = nodePulse;

    vAlpha = rootFade * tipFade * depthAlpha * centerClear * growReveal
             * (0.4 + nodePulse * 0.6) * smoothstep(0.0, 0.3, uEntrance);
    vColor = aColor;

    // Depth-aware point sizing
    float sizeBasis = mix(3.2, 1.0, progress);
    float nodeSize = 1.0 + nodePulse * 2.0;
    float depthSize = mix(0.5, 1.4, depthNorm * 0.5 + 0.5);

    gl_PointSize = sizeBasis * nodeSize * depthSize * uPixelRatio * growReveal;
    gl_Position = clipPos;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3 vColor;
  varying float vGlow;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    if (dist > 0.5) discard;

    float circle = smoothstep(0.5, 0.06, dist);
    float glow = smoothstep(0.5, 0.0, dist) * vGlow * 0.5;

    float alpha = vAlpha * circle;
    vec3 color = vColor + vec3(0.12, 0.09, 0.05) * glow;

    gl_FragColor = vec4(color, alpha);
  }
`;

const COLORS = [
  new THREE.Color('#B38B5D'),
  new THREE.Color('#C9A06E'),
  new THREE.Color('#D4A96A'),
  new THREE.Color('#8B6E4E'),
  new THREE.Color('#A08060'),
  new THREE.Color('#1A3B4C'),
  new THREE.Color('#2A5A6E'),
  new THREE.Color('#3A7A8C'),
  new THREE.Color('#4A8FA0'),
  new THREE.Color('#9B8567'),
];

function buildParticles(numStrands: number, nodesPerStrand: number) {
  const count = numStrands * nodesPerStrand;
  const positions = new Float32Array(count * 3);
  const strandIds = new Float32Array(count);
  const nodeIds = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  for (let s = 0; s < numStrands; s++) {
    const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)].clone();
    const hsl = { h: 0, s: 0, l: 0 };
    baseColor.getHSL(hsl);
    hsl.l = Math.max(0.2, Math.min(0.7, hsl.l + (Math.random() - 0.5) * 0.15));
    hsl.s = Math.max(0.2, Math.min(0.8, hsl.s + (Math.random() - 0.5) * 0.1));
    baseColor.setHSL(hsl.h, hsl.s, hsl.l);

    for (let i = 0; i < nodesPerStrand; i++) {
      const idx = s * nodesPerStrand + i;
      positions[idx * 3] = 0;
      positions[idx * 3 + 1] = 0;
      positions[idx * 3 + 2] = 0;
      strandIds[idx] = s;
      nodeIds[idx] = i;
      colors[idx * 3] = baseColor.r;
      colors[idx * 3 + 1] = baseColor.g;
      colors[idx * 3 + 2] = baseColor.b;
    }
  }
  return { positions, strandIds, nodeIds, colors };
}

function GrowthField({
  numStrands,
  nodesPerStrand,
  mousePos,
  onEntranceProgress,
}: {
  numStrands: number;
  nodesPerStrand: number;
  mousePos: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
  onEntranceProgress?: (progress: number) => void;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const entranceRef = useRef(0);
  const smoothMouseRef = useRef(new THREE.Vector2(0, 0));

  const geometry = useMemo(() => {
    const data = buildParticles(numStrands, nodesPerStrand);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(data.positions, 3));
    geo.setAttribute('aStrandId', new THREE.BufferAttribute(data.strandIds, 1));
    geo.setAttribute('aNodeId', new THREE.BufferAttribute(data.nodeIds, 1));
    geo.setAttribute('aColor', new THREE.BufferAttribute(data.colors, 3));
    return geo;
  }, [numStrands, nodesPerStrand]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uEntrance: { value: 0 },
    uNodesPerStrand: { value: nodesPerStrand },
    uNumStrands: { value: numStrands },
  }), [nodesPerStrand, numStrands]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    const mat = materialRef.current;
    mat.uniforms.uTime.value = state.clock.elapsedTime;

    entranceRef.current = Math.min(1, entranceRef.current + delta * 0.28);
    mat.uniforms.uEntrance.value = entranceRef.current;

    // Notify parent about entrance progress for content sequencing
    onEntranceProgress?.(entranceRef.current);

    const mp = mousePos.current;
    if (mp && mp.active) {
      smoothMouseRef.current.x += (mp.x * 0.8 - smoothMouseRef.current.x) * 0.04;
      smoothMouseRef.current.y += (mp.y * 0.8 - smoothMouseRef.current.y) * 0.04;
    } else {
      smoothMouseRef.current.x *= 0.97;
      smoothMouseRef.current.y *= 0.97;
    }

    mat.uniforms.uMouse.value.set(smoothMouseRef.current.x, smoothMouseRef.current.y);
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

interface HeroParticlesProps {
  mousePos?: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
  onEntranceProgress?: (progress: number) => void;
}

function HeroParticles({ mousePos, onEntranceProgress }: HeroParticlesProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const internalRef = useRef({ x: 0, y: 0, active: false });
  const effectiveMouseRef = mousePos || internalRef;

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    setIsReady(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isReady) return null;

  const numStrands = isMobile ? 150 : 300;
  const nodesPerStrand = isMobile ? 15 : 20;

  return (
    <div
      className="absolute inset-0 z-0 transition-opacity duration-[2000ms]"
      style={{ pointerEvents: 'none', opacity: isReady ? 1 : 0 }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ pointerEvents: 'none' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <GrowthField
          numStrands={numStrands}
          nodesPerStrand={nodesPerStrand}
          mousePos={effectiveMouseRef}
          onEntranceProgress={onEntranceProgress}
        />
      </Canvas>
    </div>
  );
}

export default memo(HeroParticles);
