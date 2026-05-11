import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const COLOR_BLUE = new THREE.Color("#2563EB");
const COLOR_GREEN = new THREE.Color("#10B981");
const COLOR_FG = "#0F0F11";
const COLOR_MUTED = "#71717A";
const COLOR_NEUTRAL = "#E2E2E6";
const COLOR_CARD = "#FFFFFF";

const FIELDS = [
  { label: "MOTIVO DE CONSULTA", value: "Cefalea pulsátil de 3 días" },
  { label: "TENSIÓN ARTERIAL",   value: "140 / 90 mmHg" },
  { label: "FRECUENCIA CARDÍACA", value: "88 lpm" },
  { label: "DIAGNÓSTICO · CIE-10", value: "G43.1 Migraña con aura" },
  { label: "PLAN DE MANEJO",      value: "Sumatriptán 6 mg SC" },
];

const FIELD_COUNT = FIELDS.length;
const FIELD_WIDTH = 2.85;
const FIELD_HEIGHT = 0.52;
const FIELD_GAP = 0.12;
const FIELDS_X = 1.95;

const WAVE_X = -2.6;
const WAVE_POINTS = 80;
const WAVE_HEIGHT = 0.75;

const PARTICLE_COUNT = 80;

function AudioWave() {
  const positions = useMemo(() => new Float32Array(WAVE_POINTS * 3), []);
  const geomRef = useRef(null);

  useFrame(() => {
    if (!geomRef.current) return;
    const t = performance.now() * 0.001;
    for (let i = 0; i < WAVE_POINTS; i++) {
      const u = i / (WAVE_POINTS - 1);
      const y = (u - 0.5) * 3.4;
      const wave =
        Math.sin(y * 2.4 + t * 3.2) * 0.7 +
        Math.sin(y * 4.7 + t * 1.8) * 0.35 +
        Math.sin(y * 7.1 + t * 2.6) * 0.18;
      const env = Math.pow(Math.sin(u * Math.PI), 0.5);
      const x = wave * WAVE_HEIGHT * env;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
    }
    geomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[WAVE_X, 0, 0]}>
      <line>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute
            attach="attributes-position"
            count={WAVE_POINTS}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={COLOR_BLUE} linewidth={2} transparent opacity={0.95} />
      </line>
      <Text
        position={[0, -2.05, 0]}
        fontSize={0.13}
        color={COLOR_MUTED}
        anchorX="center"
        anchorY="top"
        letterSpacing={0.08}
      >
        VOZ · CAPTURA LOCAL
      </Text>
    </group>
  );
}

function FormCard({ index, label, value, charsRef }) {
  const checkRef = useRef(null);
  const cardRef = useRef(null);
  const valueRef = useRef(null);
  const cursorRef = useRef(null);

  const y = ((FIELD_COUNT - 1) / 2 - index) * (FIELD_HEIGHT + FIELD_GAP);

  useFrame(() => {
    const chars = charsRef.current[index] ?? 0;
    const typed = Math.min(value.length, Math.floor(chars));
    const done = typed >= value.length;

    if (valueRef.current && valueRef.current.text !== value.slice(0, typed)) {
      valueRef.current.text = value.slice(0, typed);
      valueRef.current.sync?.();
    }
    if (cursorRef.current) {
      const blink = Math.floor(performance.now() / 400) % 2 === 0 ? 1 : 0;
      const visible = done ? 0 : blink;
      const target = visible ? 1 : 0;
      cursorRef.current.scale.y += (target - cursorRef.current.scale.y) * 0.3;

      const cursorX = -FIELD_WIDTH / 2 + 0.14 + typed * 0.072;
      cursorRef.current.position.x = Math.min(FIELD_WIDTH / 2 - 0.32, cursorX);
    }
    if (checkRef.current) {
      const target = done ? 1 : 0;
      const s = checkRef.current.scale.x + (target - checkRef.current.scale.x) * 0.18;
      checkRef.current.scale.set(s, s, s);
    }
    if (cardRef.current && cardRef.current.material) {
      const target = done ? 0.8 : (chars > 0 ? 1 : 0.6);
      cardRef.current.material.opacity += (target - cardRef.current.material.opacity) * 0.1;
    }
  });

  return (
    <group position={[0, y, 0]}>
      {/* Card body */}
      <RoundedBox
        ref={cardRef}
        args={[FIELD_WIDTH, FIELD_HEIGHT, 0.04]}
        radius={0.06}
        smoothness={4}
      >
        <meshBasicMaterial color={COLOR_CARD} transparent opacity={0.65} />
      </RoundedBox>

      {/* Subtle border line */}
      <mesh position={[0, FIELD_HEIGHT / 2 - 0.005, 0.025]}>
        <planeGeometry args={[FIELD_WIDTH - 0.02, 0.01]} />
        <meshBasicMaterial color={COLOR_BLUE} transparent opacity={0.2} />
      </mesh>

      {/* Label */}
      <Text
        position={[-FIELD_WIDTH / 2 + 0.14, FIELD_HEIGHT / 2 - 0.12, 0.05]}
        fontSize={0.075}
        color={COLOR_MUTED}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {label}
      </Text>

      {/* Value (typed text) */}
      <Text
        ref={valueRef}
        position={[-FIELD_WIDTH / 2 + 0.14, -0.06, 0.05]}
        fontSize={0.115}
        color={COLOR_FG}
        anchorX="left"
        anchorY="middle"
        maxWidth={FIELD_WIDTH - 0.5}
      >
        {""}
      </Text>

      {/* Blinking cursor */}
      <mesh
        ref={cursorRef}
        position={[-FIELD_WIDTH / 2 + 0.14, -0.06, 0.05]}
        scale={[1, 0, 1]}
      >
        <planeGeometry args={[0.014, 0.16]} />
        <meshBasicMaterial color={COLOR_BLUE} transparent opacity={0.85} />
      </mesh>

      {/* Done check */}
      <group
        ref={checkRef}
        position={[FIELD_WIDTH / 2 - 0.16, 0, 0.06]}
        scale={[0.0001, 0.0001, 0.0001]}
      >
        <mesh>
          <circleGeometry args={[0.115, 28]} />
          <meshBasicMaterial color={COLOR_GREEN} transparent opacity={0.95} />
        </mesh>
        <Text
          position={[0, 0.004, 0.01]}
          fontSize={0.13}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          ✓
        </Text>
      </group>
    </group>
  );
}

function FormFields({ charsRef }) {
  return (
    <group position={[FIELDS_X, 0, 0]}>
      {FIELDS.map((f, i) => (
        <FormCard key={i} index={i} label={f.label} value={f.value} charsRef={charsRef} />
      ))}
      <Text
        position={[0, ((FIELD_COUNT - 1) / 2) * (FIELD_HEIGHT + FIELD_GAP) + 0.45, 0]}
        fontSize={0.11}
        color={COLOR_MUTED}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        DINÁMICA GERENCIAL · CONSULTA EXTERNA
      </Text>
    </group>
  );
}

function ParticleStream({ charsRef, cycleRef }) {
  const meshRef = useRef(null);
  const stateRef = useRef(null);
  const _matrix = new THREE.Object3D();

  useEffect(() => {
    const items = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      items.push({
        active: false,
        x: WAVE_X,
        y: 0,
        z: 0,
        targetField: 0,
        progress: 0,
        speed: 0,
        spawnDelay: Math.random() * 5,
        baseScale: 0.024 + Math.random() * 0.018,
        wobble: Math.random() * Math.PI * 2,
        startX: WAVE_X,
        startY: 0,
        targetY: 0,
      });
    }
    stateRef.current = items;
  }, []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    const items = stateRef.current;
    const chars = charsRef.current;
    if (!mesh || !items || !chars) return;

    const dt = Math.min(delta, 1 / 30);
    const t = performance.now() * 0.001;

    let allDone = true;
    for (let f = 0; f < FIELD_COUNT; f++) {
      if (chars[f] < FIELDS[f].value.length) { allDone = false; break; }
    }
    if (allDone && cycleRef.current.state === "filling") {
      cycleRef.current.state = "celebrating";
      cycleRef.current.timer = 1.8;
    }
    if (cycleRef.current.state === "celebrating") {
      cycleRef.current.timer -= dt;
      if (cycleRef.current.timer <= 0) {
        for (let f = 0; f < FIELD_COUNT; f++) chars[f] = 0;
        cycleRef.current.state = "filling";
        cycleRef.current.activeField = 0;
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = items[i];

      if (!p.active) {
        p.spawnDelay -= dt;
        if (p.spawnDelay <= 0 && cycleRef.current.state === "filling") {
          p.active = true;
          p.spawnDelay = 0.05 + Math.random() * 0.45;

          const u = Math.random();
          p.x = WAVE_X + (Math.random() - 0.5) * 0.2;
          p.y = (u - 0.5) * 3.6;
          p.z = (Math.random() - 0.5) * 0.2;

          p.targetField = cycleRef.current.activeField;
          p.targetY = ((FIELD_COUNT - 1) / 2 - p.targetField) * (FIELD_HEIGHT + FIELD_GAP);
          p.startX = p.x;
          p.startY = p.y;
          p.progress = 0;
          p.speed = 0.7 + Math.random() * 0.3;
          p.wobble = Math.random() * Math.PI * 2;
        }
        if (!p.active) {
          _matrix.scale.setScalar(0.0001);
          _matrix.position.set(0, -20, 0);
          _matrix.updateMatrix();
          mesh.setMatrixAt(i, _matrix.matrix);
          continue;
        }
      }

      p.progress += p.speed * dt;
      const u = Math.min(1, p.progress);
      const eased = 1 - Math.pow(1 - u, 2);

      const targetX = FIELDS_X - FIELD_WIDTH / 2 + 0.1;
      const targetY = p.targetY;
      const cx = (p.startX + targetX) / 2 + Math.sin(p.wobble + t) * 0.4;
      const cy = (p.startY + targetY) / 2 + Math.cos(p.wobble + t * 0.8) * 0.3;

      const x =
        (1 - eased) * (1 - eased) * p.startX +
        2 * (1 - eased) * eased * cx +
        eased * eased * targetX;
      const y =
        (1 - eased) * (1 - eased) * p.startY +
        2 * (1 - eased) * eased * cy +
        eased * eased * targetY;

      _matrix.position.set(x, y, p.z * (1 - eased));
      const fadeOut = u > 0.85 ? Math.max(0, 1 - (u - 0.85) / 0.15) : 1;
      const scale = p.baseScale * fadeOut;
      _matrix.scale.setScalar(Math.max(0.0001, scale));
      _matrix.updateMatrix();
      mesh.setMatrixAt(i, _matrix.matrix);

      if (u >= 1) {
        const tf = p.targetField;
        if (cycleRef.current.state === "filling") {
          const target = FIELDS[tf].value.length;
          chars[tf] = Math.min(target, (chars[tf] ?? 0) + 1.6);
          if (chars[tf] >= target && cycleRef.current.activeField === tf) {
            cycleRef.current.activeField = Math.min(
              FIELD_COUNT - 1,
              cycleRef.current.activeField + 1
            );
          }
        }
        p.active = false;
        p.spawnDelay = 0.04 + Math.random() * 0.4;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color={COLOR_BLUE}
        emissive={COLOR_BLUE}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.1}
      />
    </instancedMesh>
  );
}

function Scene({ scrollProgress }) {
  const charsRef = useRef(Array(FIELD_COUNT).fill(0));
  const cycleRef = useRef({ state: "filling", activeField: 0, timer: 0 });
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = -1.0 + scrollProgress.current * -1.4;
      groupRef.current.scale.setScalar(1.0 - scrollProgress.current * 0.08);
      groupRef.current.rotation.y = Math.sin(performance.now() * 0.0002) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <AudioWave />
      <ParticleStream charsRef={charsRef} cycleRef={cycleRef} />
      <FormFields charsRef={charsRef} />
    </group>
  );
}

export default function HeroScene() {
  const wrapRef = useRef(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: wrapRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hero-3d"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 8.6], fov: 40, near: 0.1, far: 100 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[6, 10, 8]} intensity={0.9} />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#3B82F6" />
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, var(--bg) 0%, rgba(250,250,249,0.92) 22%, rgba(250,250,249,0.4) 50%, rgba(250,250,249,0.15) 75%, var(--bg) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
