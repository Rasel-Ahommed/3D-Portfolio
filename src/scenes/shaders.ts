/* GLSL used by the scene. Kept in one place for easy tuning. */

const noise = /* glsl */ `
  vec2 hash2(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453123); }
  float noise(vec2 p){
    const float K1 = 0.366025404; const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x+p.y)*K1); vec2 a = p - i + (i.x+i.y)*K2;
    float m = step(a.y,a.x); vec2 o = vec2(m,1.0-m);
    vec2 b = a - o + K2; vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h*vec3(dot(a,hash2(i)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    return dot(n, vec3(70.0));
  }
  float fbm(vec2 p){ float f = 0.0; float a = 0.5; for(int i=0;i<5;i++){ f += a*noise(p); p *= 2.02; a *= 0.5; } return f; }
`;

export const portalVertex = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
`;

export const portalFragment = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uIntensity;
  uniform vec3 uGold;
  uniform vec3 uGold2;
  varying vec2 vUv;
  ${noise}
  void main(){
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;
    float a = atan(p.y, p.x);

    // subtle environmental distortion
    vec2 warp = vec2(fbm(p*2.0 + uTime*0.06), fbm(p*2.0 - uTime*0.05)) * 0.08;
    float swirl = a + r * 3.2 - uTime * 0.22;
    vec2 q = vec2(cos(swirl), sin(swirl)) * r * 2.4 + warp;
    float n  = fbm(q * 1.7 + uTime * 0.07);
    float n2 = fbm(p * 3.2 + n * 1.4 - uTime * 0.04);
    float streaks = pow(abs(sin(swirl * 6.0 + n * 3.0)), 18.0) * smoothstep(0.35, 0.95, r);

    float rim  = smoothstep(0.45, 0.97, r) * smoothstep(1.0, 0.93, r);
    float body = clamp(n2 * 0.9 + 0.45, 0.0, 1.2) * smoothstep(0.08, 0.85, r);
    float filaments = pow(clamp(n * 0.5 + 0.5, 0.0, 1.0), 3.0) * 1.4 * smoothstep(0.1, 0.8, r);
    float energy = body * 0.22 + rim * 0.9 + streaks * 0.6 + filaments * 0.5;
    energy = pow(max(energy, 0.0), 1.7);

    // reveal grows outward from the centre
    float mask = 1.0 - smoothstep(uReveal - 0.18, uReveal, r);
    energy *= mask;

    vec3 deep = vec3(0.02, 0.02, 0.07);
    vec3 col = mix(deep, uGold2 * 0.6, smoothstep(0.08, 0.6, energy));
    col = mix(col, uGold, smoothstep(0.55, 1.05, energy));
    col = mix(col, vec3(1.0, 0.95, 0.82), smoothstep(1.3, 1.8, energy) * 0.35);

    // dark void at the centre keeps typography legible
    float voidMask = smoothstep(0.12, 0.78, r);
    float glow = clamp(energy, 0.0, 1.25) * mix(0.04, 1.0, voidMask) * uIntensity * 0.42;
    gl_FragColor = vec4(col * glow, 1.0);
    #include <colorspace_fragment>
  }
`;

export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSeed;
  varying float vSeed;
  varying float vFade;
  void main(){
    vec3 p = position;
    float t = uTime * 0.18 + aSeed * 6.2831;
    p.x += sin(t * 0.9) * 0.35;
    p.y += cos(t * 0.7) * 0.28 + sin(uTime * 0.05 + aSeed) * 0.2;
    p.z += sin(t * 0.5) * 0.3;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (5.0 / -mv.z);
    vSeed = aSeed;
    vFade = smoothstep(40.0, 6.0, -mv.z) * (0.6 + 0.4 * sin(uTime * 0.8 + aSeed * 30.0));
  }
`;

export const particleFragment = /* glsl */ `
  uniform float uOpacity;
  uniform vec3 uGold;
  varying float vSeed;
  varying float vFade;
  void main(){
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    a = pow(a, 2.5);
    vec3 col = mix(vec3(0.85, 0.87, 0.95), uGold, step(0.62, vSeed));
    gl_FragColor = vec4(col, a * uOpacity * vFade * 0.85);
    #include <colorspace_fragment>
  }
`;
