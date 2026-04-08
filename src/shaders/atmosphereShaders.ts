/**
 * Advanced Physically-Based Atmospheric Ray-Marching Shader
 * 
 * Implements true dual-scattering volumetric integration using 
 * Rayleigh and Mie phase functions, optical depth tracking, and 
 * wavelength-dependent extinction to simulate realistic sunsets 
 * and planetary halos.
 */

export const atmosphereVertexShader = /* glsl */ `
varying vec3 vLocalPosition;

void main() {
  vLocalPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;


export const atmosphereFragmentShader = /* glsl */ `
uniform float planetRadius;
uniform float atmosphereRadius;
uniform vec3 scatterColor;      
uniform float atmosphereHeight; 
uniform vec3 sunDirection;      
uniform vec3 relativeCameraPosition;
uniform float ambientLight;     

varying vec3 vLocalPosition;

const int STEPS_PRIMARY = 12;
const int STEPS_LIGHT = 6;

float phase(float alpha, float g) {
    float gg = g * g;
    float a = 3.0 * (1.0 - gg);
    float b = 2.0 * (2.0 + gg);
    float c = 1.0 + alpha * alpha;
    float d = pow(1.0 + gg - 2.0 * g * alpha, 1.5);
    return (a / b) * (c / d);
}

// Local space intersection (sph.xyz is 0,0,0)
vec2 raySphereIntersect(vec3 ro, vec3 rd, float radius) {
  float b = 2.0 * dot(ro, rd);
  float c = dot(ro, ro) - radius * radius;
  float discriminant = b * b - 4.0 * c;
  if (discriminant < 0.0) return vec2(-1.0, -1.0);
  float d = sqrt(discriminant);
  return vec2(-b - d, -b + d) / 2.0;
}

float airDensity(float alt) {
    // alt is physical altitude. Height is scale height. 
    return exp(-max(alt, 0.0) / atmosphereHeight);
}

void main() {
    vec3 ro = relativeCameraPosition;
    vec3 rd = normalize(vLocalPosition - ro);

    vec2 atmoHit = raySphereIntersect(ro, rd, atmosphereRadius);
    if (atmoHit.y < 0.0) discard;

    vec2 surfHit = raySphereIntersect(ro, rd, planetRadius);

    float tMin = max(0.0, atmoHit.x);
    float tMax = atmoHit.y;
    if (surfHit.x > 0.0 && surfHit.x < tMax) {
        tMax = surfHit.x;
    }

    if (tMin >= tMax) discard;

    float stepSize = (tMax - tMin) / float(STEPS_PRIMARY);
    // Normalize step size contribution by scale height to keep color consistent
    float normalizedStepSize = stepSize / atmosphereHeight;
    float t = tMin + stepSize * 0.5;

    float cosAngle = dot(rd, sunDirection);
    float rayleighPhase = phase(cosAngle, -0.01); 
    float miePhase = phase(cosAngle, 0.97);       

    vec3 rayleighAccum = vec3(0.0);
    vec3 mieAccum = vec3(0.0);
    float opticalDepthPrimary = 0.0;

    for (int i = 0; i < STEPS_PRIMARY; i++) {
        vec3 p = ro + rd * t;
        float h = length(p) - planetRadius;
        
        float density = airDensity(h) * normalizedStepSize;
        opticalDepthPrimary += density;

        vec2 sunHitAtmo = raySphereIntersect(p, sunDirection, atmosphereRadius);
        
        // Planet shadow check
        float b_sun = 2.0 * dot(p, sunDirection);
        float c_sun = dot(p, p) - planetRadius * planetRadius;
        float h_sun = b_sun * b_sun - 4.0 * c_sun;
        bool inShadow = h_sun >= 0.0 && b_sun < 0.0;

        if (!inShadow && sunHitAtmo.y > 0.0) {
            float stepSizeL = sunHitAtmo.y / float(STEPS_LIGHT);
            float normalizedStepSizeL = stepSizeL / atmosphereHeight;
            float tL = stepSizeL * 0.5;
            float opticalDepthLight = 0.0;
            
            for (int j = 0; j < STEPS_LIGHT; j++) {
                vec3 pL = p + sunDirection * tL;
                float hl = length(pL) - planetRadius;
                opticalDepthLight += airDensity(hl) * normalizedStepSizeL;
                tL += stepSizeL;
            }

            vec3 transmittance = exp(-scatterColor * (opticalDepthPrimary + opticalDepthLight));
            rayleighAccum += density * transmittance;
            mieAccum += density * transmittance; 
        }

        t += stepSize;
    }

    vec3 lightCol = vec3(3.0); 
    vec3 finalColor = vec3(0.0);
    
    finalColor += rayleighAccum * scatterColor * rayleighPhase * lightCol;
    finalColor += mieAccum * vec3(0.05) * miePhase * lightCol;
    finalColor += ambientLight * scatterColor * opticalDepthPrimary * 0.1;

    // Soft intensity scale balanced for 1:1 vs Stylized
    finalColor *= 0.2;

    gl_FragColor = vec4(finalColor, 1.0);
}
`;
