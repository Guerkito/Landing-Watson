import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PARTICLE_COUNT = 160;
const CUBE_SIZE = 2.2;
const HALF = CUBE_SIZE / 2;
const ESCAPE_LIMIT = HALF * 2.6;

function ContainedParticles({ color, escape = false, scrollProgress }) {
  const meshRef = useRef(null);
  const stateRef = useRef(null);
  const _matrix = new THREE.Object3D();

  useEffect(() => {
    const items = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      items.push({
        x: (Math.random() - 0.5) * (CUBE_SIZE - 0.3),
        y: (Math.random() - 0.5) * (CUBE_SIZE - 0.3),
        z: (Math.random() - 0.5) * (CUBE_SIZE - 0.3),
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.012,
        vz: (Math.random() - 0.5) * 0.012,
        seed: Math.random() * Math.PI * 2,
        baseScale: 0.045 + Math.random() * 0.02,
      });
    }
    stateRef.current = items;
  }, []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const items = stateRef.current;
    if (!mesh || !items) return;

    const dt = Math.min(delta, 1 / 30);
    const t = performance.now() * 0.001;
    const escapePower = escape ? Math.min(1, scrollProgress.current * 1.5) : 0;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = items[i];

      p.x += p.vx * 60 * dt;
      p.y += p.vy * 60 * dt;
      p.z += p.vz * 60 * dt;

      p.x += Math.sin(t * 0.6 + p.seed) * 0.0009;
      p.z += Math.cos(t * 0.5 + p.seed) * 0.0009;

      if (escape) {
        p.vy += escapePower * 0.0011;
        p.y += escapePower * 0.025;

        if (p.x > HALF) p.vx = -Math.abs(p.vx) * 0.5;
        if (p.x < -HALF) p.vx = Math.abs(p.vx) * 0.5;
        if (p.z > HALF) p.vz = -Math.abs(p.vz) * 0.5;
        if (p.z < -HALF) p.vz = Math.abs(p.vz) * 0.5;
        if (p.y < -HALF) p.vy = Math.abs(p.vy);
      } else {
        if (p.x > HALF) { p.x = HALF; p.vx = -Math.abs(p.vx); }
        if (p.x < -HALF) { p.x = -HALF; p.vx = Math.abs(p.vx); }
        if (p.y > HALF) { p.y = HALF; p.vy = -Math.abs(p.vy); }
        if (p.y < -HALF) { p.y = -HALF; p.vy = Math.abs(p.vy); }
        if (p.z > HALF) { p.z = HALF; p.vz = -Math.abs(p.vz); }
        if (p.z < -HALF) { p.z = -HALF; p.vz = Math.abs(p.vz); }
      }

      let scale = p.baseScale;
      const breath = 0.75 + Math.sin(p.seed + t * 1.6) * 0.25;
      scale *= breath;

      if (escape && p.y > HALF) {
        const fade = 1 - Math.min(1, (p.y - HALF) / (ESCAPE_LIMIT - HALF));
        scale *= fade;
        if (p.y > ESCAPE_LIMIT) {
          p.x = (Math.random() - 0.5) * (CUBE_SIZE - 0.3);
          p.y = -HALF + 0.05 + Math.random() * 0.2;
          p.z = (Math.random() - 0.5) * (CUBE_SIZE - 0.3);
          p.vx = (Math.random() - 0.5) * 0.012;
          p.vy = (Math.random() - 0.5) * 0.012;
          p.vz = (Math.random() - 0.5) * 0.012;
        }
      }

      _matrix.position.set(p.x, p.y, p.z);
      _matrix.scale.setScalar(Math.max(0, scale));
      _matrix.updateMatrix();
      mesh.setMatrixAt(i, _matrix.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        roughness={0.35}
        metalness={0.15}
      />
    </instancedMesh>
  );
}

function CubeFrame({ color, opacity = 1 }) {
  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    return new THREE.EdgesGeometry(geo);
  }, []);
  return (
    <lineSegments geometry={edges}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

function SealedCube({ color, opacity }) {
  return (
    <mesh>
      <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function OpenCubeFaces({ color, opacity }) {
  const planes = [
    { pos: [0, -HALF, 0], rot: [-Math.PI / 2, 0, 0] },
    { pos: [-HALF, 0, 0], rot: [0, Math.PI / 2, 0] },
    { pos: [HALF, 0, 0], rot: [0, -Math.PI / 2, 0] },
    { pos: [0, 0, -HALF], rot: [0, 0, 0] },
    { pos: [0, 0, HALF], rot: [0, Math.PI, 0] },
  ];
  return (
    <group>
      {planes.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={p.rot}>
          <planeGeometry args={[CUBE_SIZE, CUBE_SIZE]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function ClinicCube({ scrollProgress }) {
  const groupRef = useRef(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x = Math.sin(performance.now() * 0.0004) * 0.08;
      groupRef.current.position.y = Math.sin(performance.now() * 0.0006) * 0.08;
    }
  });
  return (
    <group ref={groupRef} position={[-2.2, 0, 0]}>
      <SealedCube color="#10B981" opacity={0.05} />
      <CubeFrame color="#10B981" opacity={0.95} />
      <ContainedParticles color="#10B981" scrollProgress={scrollProgress} />
    </group>
  );
}

function CloudCube({ scrollProgress }) {
  const groupRef = useRef(null);
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.003;
      groupRef.current.rotation.x = Math.cos(performance.now() * 0.0004) * 0.08;
      groupRef.current.position.y = Math.cos(performance.now() * 0.0006) * 0.08;
    }
  });
  return (
    <group ref={groupRef} position={[2.2, 0, 0]}>
      <OpenCubeFaces color="#EF4444" opacity={0.05} />
      <CubeFrame color="#EF4444" opacity={0.85} />
      <ContainedParticles color="#EF4444" escape scrollProgress={scrollProgress} />
    </group>
  );
}

export default function OnyxVsCloudScene() {
  const wrapRef = useRef(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        if (wrapRef.current) {
          wrapRef.current.style.setProperty("--svc-progress", self.progress.toFixed(3));
        }
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div ref={wrapRef} className="onyx-vs-scene">
      <Canvas
        camera={{ position: [0, 0.6, 7], fov: 38 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={1.0} />
        <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#3B82F6" />
        <ClinicCube scrollProgress={scrollProgress} />
        <CloudCube scrollProgress={scrollProgress} />
      </Canvas>

      <div className="onyx-overlays">
        <div className="onyx-side onyx-side--ok">
          <div className="legal-stamp legal-stamp--ok">
            <span className="legal-stamp__title">Cumple</span>
            <span className="legal-stamp__law">Ley 1581 · Resolución 1995</span>
          </div>
          <div className="onyx-label onyx-label--ok">
            <span className="dot" />
            <span className="text">
              <strong>Datos contenidos</strong>
              <em>ONYX local · clínica</em>
            </span>
          </div>
        </div>

        <div className="onyx-side onyx-side--bad">
          <div className="legal-stamp legal-stamp--bad">
            <span className="legal-stamp__title">Viola</span>
            <span className="legal-stamp__law">Ley 1581 · Resolución 1995</span>
          </div>
          <div className="onyx-label onyx-label--bad">
            <span className="dot" />
            <span className="text">
              <strong>Datos escapando</strong>
              <em>IA en nube · proveedor externo</em>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
