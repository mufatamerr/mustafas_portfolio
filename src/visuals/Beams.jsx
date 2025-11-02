/* eslint-disable react/no-unknown-property */
import { forwardRef, useImperativeHandle, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';
import './Beams.css';

function extendMaterial(BaseMaterial, cfg) {
  const physical = THREE.ShaderLib.physical;
  const { vertexShader: baseVert, fragmentShader: baseFrag, uniforms: baseUniforms } = physical;
  const baseDefines = physical.defines ?? {};
  const uniforms = THREE.UniformsUtils.clone(baseUniforms);
  const defaults = new BaseMaterial(cfg.material || {});
  if (defaults.color) uniforms.diffuse.value = defaults.color;
  if ('roughness' in defaults) uniforms.roughness.value = defaults.roughness;
  if ('metalness' in defaults) uniforms.metalness.value = defaults.metalness;
  if ('envMap' in defaults) uniforms.envMap.value = defaults.envMap;
  if ('envMapIntensity' in defaults) uniforms.envMapIntensity.value = defaults.envMapIntensity;

  Object.entries(cfg.uniforms ?? {}).forEach(([key, u]) => {
    uniforms[key] = u !== null && typeof u === 'object' && 'value' in u ? u : { value: u };
  });

  let vert = `${cfg.header}\n${cfg.vertexHeader ?? ''}\n${baseVert}`;
  let frag = `${cfg.header}\n${cfg.fragmentHeader ?? ''}\n${baseFrag}`;

  for (const [inc, code] of Object.entries(cfg.vertex ?? {})) vert = vert.replace(inc, `${inc}\n${code}`);
  for (const [inc, code] of Object.entries(cfg.fragment ?? {})) frag = frag.replace(inc, `${inc}\n${code}`);

  const mat = new THREE.ShaderMaterial({
    defines: { ...baseDefines },
    uniforms,
    vertexShader: vert,
    fragmentShader: frag,
    lights: true,
    fog: !!cfg.material?.fog
  });
  return mat;
}

const CanvasWrapper = ({ children }) => (
  <Canvas dpr={[1, 2]} frameloop="always" className="beams-container">
    {children}
  </Canvas>
);

const hexToNormalizedRGB = hex => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r / 255, g / 255, b / 255];
};

const noise = `
float random (in vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123); }
float noise (in vec2 st) {
  vec2 i = floor(st); vec2 f = fract(st);
  float a = random(i); float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0)); float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
`;

const MergedPlanes = forwardRef(({ material, width, count, height }, ref) => {
  const mesh = useRef(null);
  useImperativeHandle(ref, () => mesh.current);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const segs = 100;
    const n = count, w = width, h = height, spacing = 0;
    const numVertices = n * (segs + 1) * 2;
    const numFaces = n * segs * 2;
    const positions = new Float32Array(numVertices * 3);
    const indices = new Uint32Array(numFaces * 3);
    const uvs = new Float32Array(numVertices * 2);
    let vOff = 0, iOff = 0, uvOff = 0;
    const totalWidth = n * w + (n - 1) * spacing;
    const xBase = -totalWidth / 2;
    for (let i = 0; i < n; i++) {
      const x = xBase + i * (w + spacing);
      const uxo = Math.random() * 300, uyo = Math.random() * 300;
      for (let j = 0; j <= segs; j++) {
        const y = h * (j / segs - 0.5);
        positions.set([x, y, 0, x + w, y, 0], vOff * 3);
        const uvY = j / segs;
        uvs.set([uxo, uvY + uyo, uxo + 1, uvY + uyo], uvOff);
        if (j < segs) {
          const a = vOff, b = vOff + 1, c = vOff + 2, d = vOff + 3;
          indices.set([a, b, c, c, b, d], iOff);
          iOff += 6;
        }
        vOff += 2; uvOff += 4;
      }
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    g.setIndex(new THREE.BufferAttribute(indices, 1));
    g.computeVertexNormals();
    return g;
  }, [count, width, height]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.material.uniforms.time.value += 0.1 * delta;
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
});
MergedPlanes.displayName = 'MergedPlanes';

const DirLight = ({ position, color }) => {
  const dir = useRef(null);
  useEffect(() => {
    if (!dir.current) return;
    const cam = dir.current.shadow?.camera;
    if (!cam) return;
    cam.top = 24; cam.bottom = -24; cam.left = -24; cam.right = 24; cam.far = 64;
    dir.current.shadow.bias = -0.004;
  }, []);
  return <directionalLight ref={dir} color={color} intensity={1} position={position} />;
};

const Beams = ({
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  lightColor = '#ffffff',
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 0
}) => {
  const beamMaterial = useMemo(
    () =>
      extendMaterial(THREE.MeshStandardMaterial, {
        header: `
varying vec3 vEye;
varying float vNoise;
varying vec2 vUv;
varying vec3 vPosition;
uniform float time;
uniform float uSpeed;
uniform float uNoiseIntensity;
uniform float uScale;
${noise}`,
        vertexHeader: `
float cnoise(vec3 P); /* declared in noise header above */ 
float getPos(vec3 pos) {
  vec3 noisePos = vec3(pos.x * 0., pos.y - uv.y, pos.z + time * uSpeed * 3.) * uScale;
  return cnoise(noisePos);
}
vec3 getCurrentPos(vec3 pos) {
  vec3 newpos = pos; newpos.z += getPos(pos); return newpos;
}
vec3 getNormal(vec3 pos) {
  vec3 curpos = getCurrentPos(pos);
  vec3 nx = getCurrentPos(pos + vec3(0.01, 0.0, 0.0));
  vec3 nz = getCurrentPos(pos + vec3(0.0, -0.01, 0.0));
  vec3 tx = normalize(nx - curpos);
  vec3 tz = normalize(nz - curpos);
  return normalize(cross(tz, tx));
}`,
        fragmentHeader: '',
        vertex: {
          '#include <begin_vertex>': `transformed.z += getPos(transformed.xyz);`,
          '#include <beginnormal_vertex>': `objectNormal = getNormal(position.xyz);`
        },
        fragment: {
          '#include <dithering_fragment>': `
float randN = noise(gl_FragCoord.xy);
gl_FragColor.rgb -= randN / 15. * uNoiseIntensity;`
        },
        material: { fog: true },
        uniforms: {
          diffuse: new THREE.Color(...hexToNormalizedRGB('#000000')),
          time: { shared: true, mixed: true, linked: true, value: 0 },
          roughness: 0.3,
          metalness: 0.3,
          uSpeed: { shared: true, mixed: true, linked: true, value: speed },
          envMapIntensity: 10,
          uNoiseIntensity: noiseIntensity,
          uScale: scale
        }
      }),
    [speed, noiseIntensity, scale]
  );

  return (
    <CanvasWrapper>
      <group rotation={[0, 0, degToRad(rotation)]}>
        <MergedPlanes material={beamMaterial} count={beamNumber} width={beamWidth} height={beamHeight} />
        <DirLight color={lightColor} position={[0, 3, 10]} />
      </group>
      <ambientLight intensity={1} />
      <color attach="background" args={['#000000']} />
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />
    </CanvasWrapper>
  );
};

export default Beams;
