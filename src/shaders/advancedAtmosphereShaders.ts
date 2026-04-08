export const advancedAtmosphereVertexShader = `
varying vec3 vLocalPosition;
varying vec3 vNormal;

void main() {
    vLocalPosition = position;
    vNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const advancedAtmosphereFragmentShader = `
uniform vec3 relativeCameraPosition;
uniform float planetRadius;
uniform float atmosphereRadius;
uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 Kr; // Rayleigh absorption constant
uniform float time;

varying vec3 vLocalPosition;
varying vec3 vNormal;

#define PI 3.1415927

// credit: iq/rgba
float hash( float n ) {
    return fract(sin(n)*43758.5453);
}

float iSphere(in vec3 ro, in vec3 rd, in vec4 sph) {
    float r = sph.w;
    vec3 oc = ro - sph.xyz;
    float b = 2.0 * dot(oc, rd);
    float c = dot(oc, oc) - r * r;
    float h = b * b - 4.0 * c;
    if (h < 0.0) return -1.0;
    return (-b - sqrt(h)) / 2.0;
}

float iSphere2(in vec3 ro, in vec3 rd, in vec4 sph) {
    float r = sph.w;
    vec3 oc = ro - sph.xyz;
    float b = 2.0 * dot(oc, rd);
    float c = dot(oc, oc) - r * r;
    float h = b * b - 4.0 * c;
    if (h < 0.0) return -1.0;
    return (-b + sqrt(h)) / 2.0;
}

struct iMediaIntersection {
    float tnear;
    float tfar;
    uint mnear;
    uint mfar;
    vec3 nor;
};

// Simplified Sphere Intersection for local space (sph.xyz is 0,0,0)
iMediaIntersection mSphere(in vec3 ro, in vec3 rd, in float atmR, in float gndR) {
    iMediaIntersection res;
    res.tnear = -1.0;
    res.tfar = -1.0;
    res.mnear = 0u;
    res.mfar = 0u;
    res.nor = vec3(0.0);
    
    float b = 2.0 * dot(ro, rd);
    float c = dot(ro, ro) - atmR * atmR;
    float h = b * b - 4.0 * c;
    
    if (h >= 0.0) {
        float hsqrt = sqrt(h);
        res.tnear = (-b - hsqrt) / 2.0;
        res.mnear = 1u;
        
        res.tfar = (-b + hsqrt) / 2.0;
        res.mfar = 1u;
        
        c = dot(ro, ro) - gndR * gndR;
        h = b * b - 4.0 * c;
        
        if (h >= 0.0) {
            float t_ground = (-b - sqrt(h)) / 2.0;
            if (t_ground > 0.0) {
                res.tfar = t_ground;
                res.mfar = 2u;
                res.nor = normalize(ro + rd * res.tfar);
            }
        }
    }
    return res;
}

float phase(float alpha, float g) {
    float gg = g * g;
    float a = 3.0 * (1.0 - gg);
    float b = 2.0 * (2.0 + gg);
    float c = 1.0 + alpha * alpha;
    float d = pow(1.0 + gg - 2.0 * g * alpha, 1.5);
    return (a / b) * (c / d);
}

vec3 absorb(float dist, vec3 col, float f, vec3 Kr_val) {
    vec3 c = col;    
    c *= (vec3(1.0) - pow(Kr_val, vec3(f / max(dist, 0.0000000001))));
    // Simplified Mie-like absorption
    c *= (vec3(1.0) - pow(vec3(0.05, 0.7, 0.9), vec3(f / max(dist * 0.5, 0.0000000001))));
    return c;
}

float airDensity(float alt) {
    // alt is normalized (0 to 1) from ground to top of atmosphere
    return max(0.0, 5.0 * exp(-6.0 * alt) * (1.0 - alt));
}

void main() {
    vec3 ro = relativeCameraPosition;
    // vLocalPosition is already at atmosphereRadius because of geometry args
    vec3 rd = normalize(vLocalPosition - ro);

    
    vec3 light = normalize(lightDirection);
    vec3 lightcol = lightColor;
    
    float gndR = planetRadius;
    float atmR = atmosphereRadius;
    
    iMediaIntersection hit = mSphere(ro, rd, atmR, gndR);
    
    if (hit.tfar < 0.0) {
        discard;
    }
    
    hit.tnear = max(0.0, hit.tnear);
    
    if (hit.tfar <= hit.tnear) {
        discard;
    }
    
    float atmScale = 1.0 / (atmR - gndR); 
    
    float miePhaseVal = 0.97;
    float ralPhaseVal = -0.01;
    float absorbCoeff = 0.8;
    
    float density = 0.0;
    vec3 col = vec3(0.0);
    
    if (hit.mnear == 1u) {
        float mie = phase(dot(rd, light), miePhaseVal) * 0.005;
        float rayleigh = phase(dot(rd, light), ralPhaseVal) * 1.4;
        
        float litDensity = 0.0;
        int samples = 24;
        float dt = (hit.tfar - hit.tnear) / float(samples);
        
        vec3 mieAccum = vec3(0.0);
        vec3 rayleighAccum = vec3(0.0);
        
        for(int i = 0; i < samples; i++) {
            float t = hit.tnear + dt * (float(i) + 0.5);
            vec3 apos = ro + rd * t;
            float currentDist = length(apos);
            float alt = (currentDist - gndR) * atmScale;
            
            // Check if fragment is occluded from sun by the planet
            float b = 2.0 * dot(apos, light);
            float c = dot(apos, apos) - gndR * gndR;
            float h = b * b - 4.0 * c;
            bool isLit = h < 0.0 || b > 0.0; // IsLit if no intersection or intersection is behind the fragment
            
            float sliceDensity = (dt * atmScale) * airDensity(alt);
            float litSlice = sliceDensity * (isLit ? 1.0 : 0.0);
            
            vec3 influx = vec3(0.0);
            
            if (isLit) {
                // Secondary ray march to sun for atmospheric extinction
                // Over-atmosphere intersection point distance
                float b_atm = 2.0 * dot(apos, light);
                float c_atm = dot(apos, apos) - atmR * atmR;
                float tsun = (-b_atm + sqrt(b_atm * b_atm - 4.0 * c_atm)) / 2.0;
                
                float densityToSun = 0.0;
                int sunSamples = 4;
                float dtl = tsun / float(sunSamples);
                for (int j = 0; j < sunSamples; j++) {
                    float tl = dtl * (float(j) + 0.5);
                    vec3 spos = apos + light * tl;
                    densityToSun += (dtl * atmScale) * airDensity((length(spos) - gndR) * atmScale);
                }
                
                influx = absorb(densityToSun, lightcol, absorbCoeff, Kr);
            }

            
            density += sliceDensity;
            litDensity += litSlice;
            
            mieAccum += absorb(density, influx * mie * litSlice, absorbCoeff, Kr);
            rayleighAccum += absorb(density, influx * Kr * rayleigh * litSlice, absorbCoeff, Kr);
        }
        
        vec3 acol = mieAccum + rayleighAccum;
        col = acol;
    }
    
    // Tonemapping & Color correction
    col = (col * (vec3(1.0) + (col / 4.0))) / (vec3(1.0) + col);
    col = pow(max(col, 0.0), vec3(1.0 / 2.2));
    
    gl_FragColor = vec4(col, clamp(dot(col, vec3(1.0)), 0.0, 1.0));
}
`;

