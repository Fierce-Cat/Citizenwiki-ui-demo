/**
 * Advanced Physically-Based Atmospheric Ray-Marching Shader
 * 
 * Implements true dual-scattering volumetric integration using 
 * Rayleigh and Mie phase functions, optical depth tracking, and 
 * wavelength-dependent extinction to simulate realistic sunsets 
 * and planetary halos.
 */

export const atmosphereVertexShader = /* glsl */ `
varying vec3 vWorldPosition;
varying vec3 vPlanetCenter;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  vPlanetCenter = vec3(modelMatrix[3][0], modelMatrix[3][1], modelMatrix[3][2]);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const atmosphereFragmentShader = /* glsl */ `
uniform float planetRadius;
uniform float atmosphereRadius;
uniform vec3 scatterColor;      // Wavelength scattering coefficients (Kr)
uniform float atmosphereHeight; // Scale height for density falloff
uniform vec3 sunDirection;      // Direction TO the light source
uniform float ambientLight;     // Minimum dark side glow

varying vec3 vWorldPosition;
varying vec3 vPlanetCenter;

// Optimal step counts for performance vs quality
const int STEPS_PRIMARY = 12;
const int STEPS_LIGHT = 6;

// Rayleigh and Mie Phase functions
float phase(float alpha, float g) {
    float gg = g * g;
    float a = 3.0 * (1.0 - gg);
    float b = 2.0 * (2.0 + gg);
    float c = 1.0 + alpha * alpha;
    float d = pow(1.0 + gg - 2.0 * g * alpha, 1.5);
    return (a / b) * (c / d);
}

// Ray-sphere intersection returning <tMin, tMax>
vec2 raySphereIntersect(vec3 ro, vec3 rd, float radius) {
  float a = dot(rd, rd);
  float b = 2.0 * dot(ro, rd);
  float c = dot(ro, ro) - radius * radius;
  float discriminant = b * b - 4.0 * a * c;
  if (discriminant < 0.0) return vec2(-1.0, -1.0);
  float d = sqrt(discriminant);
  return vec2(-b - d, -b + d) / (2.0 * a);
}

// Exponential air density calculation relative to altitude
// Exponential air density calculation relative to altitude
float airDensity(float alt) {
    // Reduced base density to avoid over-saturating the integral along long rim paths
    return 0.5 * exp(-max(alt, 0.0) / atmosphereHeight);
}

void main() {
    vec3 rayOrigin = cameraPosition - vPlanetCenter;
    vec3 rayDir = normalize(vWorldPosition - cameraPosition);

    // Initial outer atmosphere boundary intersection
    vec2 atmoHit = raySphereIntersect(rayOrigin, rayDir, atmosphereRadius);
    if (atmoHit.y < 0.0) discard; // Missed the atmosphere entirely

    // Planet surface intersection
    vec2 surfHit = raySphereIntersect(rayOrigin, rayDir, planetRadius);

    // Determine ray integration bounds
    float tMin = max(0.0, atmoHit.x);
    float tMax = atmoHit.y;
    if (surfHit.x > 0.0 && surfHit.x < tMax) {
        tMax = surfHit.x; // Blocked by ground
    }

    if (tMin >= tMax) discard;

    float stepSize = (tMax - tMin) / float(STEPS_PRIMARY);
    float t = tMin + stepSize * 0.5;

    // View-Light angle for phase functions
    float cosAngle = dot(rayDir, sunDirection);
    float rayleighPhase = phase(cosAngle, -0.01); // Rayleigh spreads widely
    float miePhase = phase(cosAngle, 0.97);       // Mie shoots directly forward

    vec3 rayleighAccum = vec3(0.0);
    vec3 mieAccum = vec3(0.0);
    float opticalDepthPrimary = 0.0;

    // Primary ray loop (Camera -> Surface/Space)
    for (int i = 0; i < STEPS_PRIMARY; i++) {
        vec3 p = rayOrigin + rayDir * t;
        float h = length(p) - planetRadius;
        
        float density = airDensity(h) * stepSize;
        opticalDepthPrimary += density;

        // Shadow computation to Sun
        vec2 sunHitAtmo = raySphereIntersect(p, sunDirection, atmosphereRadius);
        vec2 sunHitSurf = raySphereIntersect(p, sunDirection, planetRadius);
        
        float opticalDepthLight = 0.0;
        bool inShadow = (sunHitSurf.x > 0.0); // Surface blocks the light

        if (!inShadow && sunHitAtmo.y > 0.0) {
            // Secondary ray loop (Point -> Sun) to determine light absorption reaching this point
            float stepSizeL = sunHitAtmo.y / float(STEPS_LIGHT);
            float tL = stepSizeL * 0.5;
            for (int j = 0; j < STEPS_LIGHT; j++) {
                vec3 pL = p + sunDirection * tL;
                float hL = length(pL) - planetRadius;
                opticalDepthLight += airDensity(hL) * stepSizeL;
                tL += stepSizeL;
            }

            // Transmittance uses Beer-Lambert law
            float opticalDepthTotal = opticalDepthPrimary + opticalDepthLight;
            vec3 transmittance = exp(-scatterColor * opticalDepthTotal);

            // Accumulate scattered light energy
            rayleighAccum += density * transmittance;
            mieAccum += density * transmittance; 
        }

        t += stepSize;
    }

    // Combine scattering components using a balanced light intensity
    vec3 lightCol = vec3(2.0); 
    
    vec3 finalColor = vec3(0.0);
    
    // Extrapolate Rayleigh based on the scattering wavelength color
    finalColor += rayleighAccum * scatterColor * rayleighPhase * lightCol;
    
    // Extrapolate Mie as a generic bright hazy tint
    finalColor += mieAccum * vec3(0.05) * miePhase * lightCol;

    // Airglow / Ambient for terminator boundaries
    finalColor += ambientLight * scatterColor * opticalDepthPrimary * 0.2;

    // Overall intensity scale. We avoid Reinhard tone mapping here because this is additively 
    // blended over the planet. Normalizing to [0,1] locally causes blowouts.
    // Greatly reduced to avoid white-out at rims
    finalColor *= 0.15;

    // Ensure additive blending treats it purely as light overlay
    gl_FragColor = vec4(finalColor, 1.0);
}
`;
